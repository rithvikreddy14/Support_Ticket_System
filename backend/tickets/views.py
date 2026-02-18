from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q, Avg, F
from django.db.models.functions import TruncDate
from .models import Ticket
from .serializers import TicketSerializer
from .services.llm_service import classify_ticket

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer

    # Filter logic [cite: 12]
    def get_queryset(self):
        queryset = super().get_queryset()
        status_param = self.request.query_params.get('status')
        priority_param = self.request.query_params.get('priority')
        search_param = self.request.query_params.get('search')
        
        if status_param and status_param != '':
            queryset = queryset.filter(status=status_param)
        if priority_param and priority_param != '':
            queryset = queryset.filter(priority=priority_param)
        if search_param:
            queryset = queryset.filter(
                Q(title__icontains=search_param) | 
                Q(description__icontains=search_param)
            )
        return queryset

    # [cite: 36] LLM Classification Endpoint
    @action(detail=False, methods=['post'])
    def classify(self, request):
        description = request.data.get('description', '')
        if not description:
            return Response({"error": "Description required"}, status=status.HTTP_400_BAD_REQUEST)
            
        suggestions = classify_ticket(description)
        return Response(suggestions)

    #  DB-Level Aggregation Endpoint
    @action(detail=False, methods=['get'])
    def stats(self, request):
        # 1. Basic Counts
        total_tickets = Ticket.objects.count()
        open_tickets = Ticket.objects.filter(status='open').count()
        
        # 2. Priority Breakdown (Aggregation)
        priority_breakdown = Ticket.objects.values('priority').annotate(count=Count('id'))
        priority_data = {item['priority']: item['count'] for item in priority_breakdown}

        # 3. Category Breakdown (Aggregation)
        category_breakdown = Ticket.objects.values('category').annotate(count=Count('id'))
        category_data = {item['category']: item['count'] for item in category_breakdown}

        # 4. Avg per day (Aggregation)
        # Calculates tickets per day first, then averages those counts
        daily_counts = Ticket.objects.annotate(date=TruncDate('created_at')).values('date').annotate(count=Count('id')).aggregate(avg=Avg('count'))
        avg_per_day = daily_counts['avg'] or 0

        data = {
            "total_tickets": total_tickets,
            "open_tickets": open_tickets,
            "avg_tickets_per_day": round(avg_per_day, 1),
            "priority_breakdown": priority_data,
            "category_breakdown": category_data
        }
        return Response(data)