import os
import json
from mistralai import Mistral  # <--- NEW IMPORT for v1.0+

def classify_ticket(description):
    """
    Analyzes the ticket description using Mistral AI (v1.0+ syntax).
    """
    
    # 1. Securely fetch API Key
    api_key = os.environ.get('MISTRAL_API_KEY')
    if not api_key:
        print("ERROR: MISTRAL_API_KEY is missing. Returning default values.")
        return {"suggested_category": "general", "suggested_priority": "medium"}

    try:
        # 2. Configure Mistral Client (New Syntax)
        client = Mistral(api_key=api_key)
        model = "mistral-small-latest" 

        # 3. Prompt Engineering
        # strict JSON instruction
        prompt = f"""
        You are an expert IT Support Manager. Analyze the ticket description below.
        
        Ticket: "{description}"

        Assign a 'suggested_category' from: [billing, technical, account, general].
        Assign a 'suggested_priority' from: [critical, high, medium, low].

        Return ONLY a raw JSON object. Do not use Markdown (no ```json).
        Example: {{"suggested_category": "technical", "suggested_priority": "high"}}
        """

        # 4. Generate Response
        # In v1.0+, we use client.chat.complete and simple dicts for messages
        chat_response = client.chat.complete(
            model=model,
            messages=[
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}  # Enforce JSON mode
        )

        # 5. Extract Content
        content = chat_response.choices[0].message.content.strip()
        
        # 6. Parse JSON
        result = json.loads(content)
        
        # 7. Validation & Fallback
        valid_categories = ['billing', 'technical', 'account', 'general']
        valid_priorities = ['low', 'medium', 'high', 'critical']
        
        category = result.get('suggested_category', 'general').lower()
        priority = result.get('suggested_priority', 'medium').lower()
        
        final_category = category if category in valid_categories else 'general'
        final_priority = priority if priority in valid_priorities else 'medium'
        
        print(f"Mistral Analysis: '{description[:30]}...' -> {final_category.upper()} / {final_priority.upper()}")

        return {
            "suggested_category": final_category,
            "suggested_priority": final_priority
        }

    except Exception as e:
        print(f"Mistral API Error: {e}")
        return {"suggested_category": "general", "suggested_priority": "medium"}