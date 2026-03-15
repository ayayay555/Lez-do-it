<div align="center">

# 🚀 LezDoIt

**The AI-Powered Lead Frontend Architect**

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](#)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-4285F4?logo=google&logoColor=white)](#)

LezDoIt is a modern web application that leverages **Google's Gemini AI** to automatically generate high-converting business funnels, landing pages, and standalone HTML sites based on client strategy questionnaires and selected design themes.

</div>

---

## ✨ Features

- **🧠 Automated Architecture:** Acts as your personal "Lead Frontend Architect," taking your input, styling preferences, and assets to output production-ready web pages.
- **🎨 Curated Design Themes:** Choose from highly-opinionated, aesthetic design DNAs:
  - `Tech-Chic / Studio`
  - `Cyberpunk / Industrial`
  - `Brutalist / Editorial`
  - `Friendly SaaS / Playful`
- **⚡ Standalone Outputs:** Generates pure, zero-dependency `index.html` files with embedded Tailwind CSS via CDN—ready to be hosted anywhere.
- **📱 Responsive UI:** Built with **shadcn/ui** and **Tailwind CSS** for a clean, modern dashboard experience.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.x or higher (v20+ recommended)
- **npm**, **yarn**, **pnpm**, or **bun**
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Lez-do-it.git
cd Lez-do-it
```
*(Remember to update the URL once published to your GitHub!)*

### 2. Install Dependencies

```bash
npm install
# or yarn, or pnpm
```

### 3. Set up Environment Variables

To power the AI generation, you'll need a **Google Gemini API Key**. You can get one for free at [Google AI Studio](https://aistudio.google.com/).

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and add your API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Start the funnel generation process by navigating through the consultation flow!

---

## 📂 Project Structure

| Path | Description |
| ---- | ----------- |
| `src/app/page.tsx` | The main landing page and dashboard. |
| `src/app/consultation/page.tsx` | The client strategy questionnaire and input form. |
| `src/app/api/generate/route.ts` | The AI engine: backend API route communicating with Google Gemini. |
| `src/components/ui/` | Reusable, accessible UI components built with shadcn/ui. |
| `public/` | Static project assets (logos, icons). |

---

## 🤝 Contributing

**We welcome contributions!** Feel free to **clone**, **fork**, or **contribute** to this project. 

Whether you want to add new wild AI design themes, improve the system prompts, or enhance the dashboard UI:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ and AI. Let's do it.</sub>
</div>