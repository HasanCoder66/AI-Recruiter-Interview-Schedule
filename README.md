# 🤖 AI Recruiter - Interview Scheduling & Question Generator

AI Recruiter is an AI-powered platform that helps recruiters schedule interviews and generate personalized interview questions based on the job role and description. It uses **Gemini AI** (Google Generative AI) to craft high-quality, role-specific questions and stores the data in MongoDB.

---

## 📦 Tech Stack

**Frontend**  
- React.js  
- MUI (Material UI) + Tailwind CSS  
- Axios

**Backend**  
- Node.js + Express  
- MongoDB with Mongoose  
- Gemini AI API (Google Generative AI)

---

## 🚀 Features

- 🌟 Generate custom interview questions based on:
  - Job Title
  - Job Description
  - Interview Type (Technical, Behavioral, etc.)
  - Duration

- 👤 Schedule and list interview candidates
- 🧠 AI-generated questions powered by **Gemini**
- 💾 Store & retrieve interviews and candidates
- ✅ View previously created interviews
- 📥 Export reports (Planned)

---

## 🔧 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/ai-recruiter.git
cd ai-recruiter



2. Setup Backend
bash
Copy
Edit

cd ai-recruiter-BE
npm install


Create .env file in ai-recruiter-BE:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key

3. Setup Frontend
cd ../ai-recruiter-FE
npm install


✅ Run the App
cd ai-recruiter-BE
npm run dev


Start Frontend
cd ai-recruiter-FE
npm start

📂 Folder Structure
ai-recruiter/
├── ai-recruiter-FE/        # React frontend
│   └── components/
│   └── pages/
│   └── constants/
├── ai-recruiter-BE/        # Express backend
│   └── Controllers/
│   └── Models/
│   └── Routes/
│   └── Services/
│   └── utils/


⚠️ Notes
This project currently supports 3 free interviews per user (limit logic to be added).

Gemini API works only with gemini-pro on free tier.

You must enable Generative Language API in Google Cloud.


✨ Upcoming Features
✅ Email notifications for scheduled interviews

📊 Report analytics per candidate

🧑‍💼 Admin dashboard

⏰ Interview rescheduling logic


👨‍💻 Author
Made with ❤️ by Hasan (@yourhandle)


Let me know if you want to include:
- Deployment instructions (Vercel / Render / Railway)
- Screenshots / demo GIFs  
- API Documentation section (Swagger, Postman etc.)

I can also generate a markdown version with badges, images, or a clickable table of contents.
