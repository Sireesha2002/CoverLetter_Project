# Cover Letter Generator - Frontend

A modern React application for generating professional cover letters.

## Features

- Clean, responsive UI built with React and Tailwind CSS
- Form to collect personal information, skills, projects, and job descriptions
- Integration with backend API for data storage
- Real-time form validation
- Success page showing submission details

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:8787`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CoverLetterForm.jsx    # Main form component
│   │   └── ResultDisplay.jsx      # Submission results display
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind imports
├── public/                        # Static assets
└── package.json
```

## API Integration

The frontend connects to the backend API at `http://localhost:8787`:

- `POST /api/cover-letter` - Submit cover letter data
- `GET /api/cover-letter/:id` - Retrieve submission (future use)

## Future Enhancements

- AI-powered cover letter generation
- Edit and regenerate cover letters
- Export to PDF
- Save drafts locally
- Template selection
