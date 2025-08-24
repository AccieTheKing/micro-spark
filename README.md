# Project Overview

## 🚀 Technologies Used
- **Frontend**: [Next.js (React)](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Backend API**: [Node.js](https://nodejs.org/)
- **AI Integration**: [Ollama](https://ollama.ai/)
- **Containerization**: [Docker](https://www.docker.com/)

---

## 🏗️ Architecture & Hosting
The project is hosted on a **Virtual Private Server (VPS)** and runs fully in **Docker containers**.  

- **Frontend** → Runs in its own container (Next.js + TailwindCSS).  
- **Backend API** → Runs in a separate Node.js container.  
- **Ollama Instance** → Runs as a container within the same network.  

All containers communicate with each other through an isolated **Docker network**, simulating a **microservices architecture**.

---

## 🎯 Purpose of the Project
The project was built with two main goals:  

1. **Practical Deployment** – Hosting an AI-enabled web application using containerized services on a VPS.  
2. **Learning Experience** – Gaining hands-on knowledge with Docker, especially in managing communication between multiple containers acting as microservices.  

---

## 🔧 Key Takeaways
- Learned to set up and manage a **multi-container Docker environment**.  
- Gained experience in **frontend-backend communication via Docker networks**.  
- Tested **Ollama integration** within a microservices setup.  
