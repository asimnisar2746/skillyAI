# Skilly

**AI-Powered Career Guidance System**

Skilly helps students and job seekers figure out which career path fits them. Users register, build a rich profile (academic background, work experience, skills, languages, certifications, career interests), and Skilly's AI engine analyzes it to recommend career paths, highlight skill gaps, and suggest courses to close them — all saved as history the user can revisit.

Built as a BS-CS final year thesis project — *Skilly, AI Powered Career Guidance System*, University of Malakand (2021–2025).

---

## Features

- 🔐 Register/Login — credentials + OAuth
- 📝 Fill Profile — academic background, work experience, skills, languages, certifications, career interests
- 🤖 Get Career Suggestions — AI-generated, ranked career paths with reasoning
- 📊 Check Skill Gaps — gap analysis against recommended paths
- 📈 View Job Recommendations — dashboard of matching roles
- 🔖 Save career paths for later reference
- ✅ Track skill-development goals with suggested courses
- 🕘 Recommendation history ("Recent Activity")

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router, TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [Shadcn UI](https://ui.shadcn.com/) |
| Database | [PostgreSQL](https://www.postgresql.org/) (via Neon) |
| ORM | [Prisma](https://www.prisma.io/) |
| Auth | [NextAuth.js](https://next-auth.js.org/) |
| AI | OpenAI API / Claude API |

See [ERD.md](./ERD.md) for the database design (including the post-mockup revision) and [FRD.md](./FRD.md) for the full functional requirements.

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Neon recommended)
- An OpenAI or Anthropic API key

### Installation

```bash
git clone <your-repo-url>
cd skilly
npm install
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="sk-..."
```

### Database Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Run the App

```bash
npm run dev
```

## Project Structure

```
skilly/
├── app/
│   ├── (auth)/            # Login, register, forgot/reset password
│   ├── dashboard/         # Career suggestions, skill gaps, recent activity
│   ├── skills/            # Skills overview page
│   ├── insights/          # Detailed skill-gap analysis
│   ├── profile/           # Profile forms + read-only overview
│   └── api/                # Server routes (auth, recommendation engine)
├── components/
├── lib/
├── prisma/
│   └── schema.prisma
└── public/
```

## Scope

See [FRD.md](./FRD.md) for the full functional boundary. As of v3, recommendations, saved career paths, and skill goals persist across sessions — this reverses the original "generated live, not stored" design after UI mockups showed the dashboard needed real history.

## Roadmap

- Real-time job market integration
- Advanced AI customization
- Gamification and learning paths
- Multi-platform support
- Privacy/security improvements (encryption, GDPR)

## License

Academic project — University of Malakand, Department of Computer Science & IT.

## Author

**Asim Nisar**
BS Computer Science, University of Malakand
