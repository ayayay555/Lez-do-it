# LezDoIt

LezDoIt is a modern web application built with Next.js that leverages Google's Gemini AI to automatically generate high-converting business funnels, landing pages, and standalone HTML sites based on client strategy questionnaires and selected design themes (e.g., Tech-Chic, Cyberpunk, Brutalist, Friendly SaaS). 

It acts as an automated "Lead Frontend Architect," taking your input, styling preferences, and assets, and outputting production-ready, highly-opinionated web pages.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.x or higher (v20+ recommended)
- **npm** (or `yarn`, `pnpm`, `bun`)
- **Git**

## Getting Started

### 1. Clone the repository

To clone the project to your local machine, run the following command in your terminal:

```bash
git clone https://github.com/your-username/Lez-do-it.git
cd Lez-do-it
```

*(Note: Replace `your-username/lezdoit` with the actual repository URL once published).*

### 2. Install Dependencies

Install the required packages using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Environment Variables

To run the AI generation features, you need a Google Gemini API Key. 

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` in your code editor and add your API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   ```
   *You can get a Gemini API key from Google AI Studio.*

### 4. Run the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start the funnel generation process by navigating through the application.

## Project Structure

- `src/app/page.tsx`: The main landing page.
- `src/app/consultation/page.tsx`: The client strategy and input form.
- `src/app/api/generate/route.ts`: The backend API route that communicates with Google Gemini to generate the HTML output.
- `src/components/ui/`: Reusable UI components built with shadcn/ui.
- `public/`: Static assets.

## Contributing

Feel free to **clone**, **fork**, or **contribute** to this project! If you have ideas for new themes, better prompts, or UI improvements, please open an issue or submit a pull request.

## License

MIT
