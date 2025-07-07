# 🧮 Unit Converter App

> This project idea is inspired by: [roadmap.sh Unit Converter](https://roadmap.sh/projects/unit-converter)

A complete web application for converting measurement units (length, weight, temperature) using:

- ⚙️ FastAPI (backend)
- ⚛️ React + Vite + Tailwind CSS (frontend)
- 🐳 Docker + Docker Compose

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/unit_converter_app.git
```

### 2. Build and run the project

```bash
docker-compose up --build
```
### 3. Open in your browser

	•	Frontend: http://localhost:5173
	•	Backend API (Swagger UI): http://localhost:8000/docs

## 📦 Project Structure


```
unit_converter_app/
├── backend/        # FastAPI backend
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/       # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```
