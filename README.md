# 🎫 AI-Powered Smart Support Ticket System

> A modern, full-stack IT support dashboard powered by **Mistral AI** that automatically categorizes tickets and assigns intelligent priority levels based on user descriptions.

<p align="center">
  <img src="https://github.com/rithvikreddy14/Support_Ticket_System/blob/main/Screenshot%202026-02-19%20002026.png" alt="Project Banner" />
</p>

---

## 🚀 Overview

The **AI-Powered Smart Support Ticket System** enhances traditional IT support workflows by integrating a Large Language Model (LLM) into the ticket creation process.

Instead of relying on users to manually choose priority and category, the system uses **semantic analysis** to intelligently classify tickets in real-time.

This reduces human error, improves efficiency, and accelerates issue resolution.

---

## 📖 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Architecture](#-solution-architecture)
- [Key Features](#-key-features)
- [System Workflow](#-system-workflow)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Future Enhancements](#-future-enhancements)
- [Conclusion](#-conclusion)

---

## 🚩 Problem Statement

Traditional ticketing systems suffer from:

### 1️⃣ User Misclassification
Users often incorrectly set:
- A minor typo as **Critical**
- A server outage as **Low Priority**

### 2️⃣ Operational Inefficiency
Support teams waste time:
- Re-triaging tickets
- Reassigning priorities
- Manually categorizing issues

This slows down resolution time and affects service quality.

---

## 💡 Solution Architecture

We introduce an **AI Intelligence Layer** between the frontend and backend.

### 🧠 AI-Powered Classification Flow

1. User enters ticket description
2. Frontend sends description to `/api/tickets/classify/`
3. Backend calls **Mistral AI**
4. AI returns:
   - 🎯 Priority → Critical / High / Medium / Low
   - 📂 Category → Technical / Billing / Account / General
5. Form auto-fills suggestions
6. User confirms and submits

---

## ✨ Key Features

### 🤖 AI Capabilities
- Real-time LLM classification
- Urgency detection
- Domain identification
- Context-aware semantic analysis

### 📊 Dashboard & Analytics
- Total tickets
- Pending tickets
- Critical issues
- Average tickets per day
- Real-time statistics

### 🔍 Smart Filtering
- Filter by status (Open / Closed)
- Filter by priority
- Search by keyword

### 🛠 Ticket Management
- Create ticket
- View ticket
- Update status
- Delete ticket
- Resolve tickets

### ⚙️ Engineering Features
- RESTful API
- Modular service layer
- Environment-based configuration
- Dockerized setup
- Production-ready architecture

---

## 🔄 System Workflow

```
User → React Frontend → Django API → Mistral AI → Response → Database → Dashboard
```

---

## 🛠 Tech Stack

### 🎨 Frontend
- React.js
- Tailwind CSS
- Lucide React Icons
- Axios

### ⚙️ Backend
- Django
- Django REST Framework (DRF)
- Mistral AI SDK

### 🗄 Database & DevOps
- PostgreSQL
- Docker
- Docker Compose

---

## 📂 Project Structure

```bash
support-ticket-system/
├── docker-compose.yml
├── README.md
│
├── backend/
│   ├── Dockerfile
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── config/
│   └── tickets/
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       ├── urls.py
│       └── services/
│           └── llm_service.py
│
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── tailwind.config.js
    ├── public/
    └── src/
        ├── App.js
        ├── index.css
        ├── api/
        │   └── api.js
        └── components/
            ├── TicketForm.js
            ├── TicketList.js
            └── Stats.js
```

---

# 🚀 Installation Guide

## 🔹 Prerequisites

- Docker Desktop (Installed & Running)
- Mistral AI API Key (https://console.mistral.ai)
- Node.js (for manual setup)
- Python 3.9+

---

## 🐳 Method 1: Docker (Recommended)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/rithvikreddy14/Support_Ticket_System.git
cd support-ticket-system
```

### 2️⃣ Configure Environment

Create `backend/.env` and add your API key.

### 3️⃣ Build & Run

```bash
docker-compose up --build
```

### 4️⃣ Access Application

Frontend → http://localhost:3000  
Backend → http://localhost:8000/api/tickets/

---

## 💻 Method 2: Manual Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs at:

```
http://localhost:8000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at:

```
http://localhost:3000
```

---

## 🔑 Environment Variables

Create `backend/.env`:

```env
DEBUG=1
SECRET_KEY=your-secret-key
MISTRAL_API_KEY=your_mistral_api_key
POSTGRES_DB=tickets_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=db
```

---

# 📡 API Documentation

### Base URL
```
http://localhost:8000/api/tickets/
```

| Method | Endpoint | Description | Payload Example |
|--------|----------|-------------|-----------------|
| GET | `/api/tickets/` | Fetch all tickets | – |
| POST | `/api/tickets/` | Create new ticket | `{"title":"Login issue","description":"Cannot login"}` |
| POST | `/api/tickets/classify/` | AI Classification | `{"description":"Server is down"}` |
| PATCH | `/api/tickets/:id/` | Update ticket | `{"status":"closed"}` |
| DELETE | `/api/tickets/:id/` | Delete ticket | – |

---

## 🔮 Future Enhancements

- 🔐 JWT Authentication & Role-Based Access
- 📩 Email Notifications for critical tickets
- 📈 Advanced analytics with charts
- 🤝 Auto-assignment to support agents
- 🧾 Audit logs
- 📊 SLA tracking
- 🌐 Multi-tenant support
- 📱 Mobile-responsive dashboard
- 🧪 Unit & Integration testing suite

---

## 🏁 Conclusion

This project demonstrates how **Large Language Models** can enhance traditional enterprise systems by:

- Reducing human error
- Improving prioritization accuracy
- Automating repetitive tasks
- Accelerating resolution time

With a modular Django backend, scalable React frontend, PostgreSQL database, and Dockerized infrastructure, this system is designed to be **production-ready and extensible**.

---

⭐ If you found this project useful, consider giving it a star!
