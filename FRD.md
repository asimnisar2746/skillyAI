# Functional Requirements Document (FRD)

**Project:** Skilly — AI Powered Career Guidance System
**Prepared by:** Asim Nisar
**Version:** 3.0 — revised after UI/UX mockups surfaced gaps in the original data model

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for Skilly, a web-based application that provides AI-driven career guidance to students and job seekers based on their profile data.

### 1.2 Intended Audience
Developer (self-reference during implementation), thesis supervisor/examiners, and any future contributor to the project.

### 1.3 Definitions
| Term | Meaning |
|---|---|
| User | A registered individual using Skilly |
| Profile | A user's academic identity |
| Career Interests | A user's stated preferred roles, industries, and goals |
| Recommendation | A saved snapshot of AI-generated career analysis |
| FR | Functional Requirement |
| NFR | Non-Functional Requirement |

## 2. System Overview

Skilly is a full-stack Next.js web application. A user registers, builds out a profile across several data areas, and requests AI analysis. The system returns ranked career path suggestions, a skill-gap analysis, and in-demand skills — and, as of this revision, **persists each analysis run** so the dashboard can show recommendation history, bookmarked career paths, and a checkable list of skill-development goals with suggested courses.

## 3. Scope

**In scope:**
- Register/Login (credentials + OAuth)
- Fill Profile (academic info, work experience, skills, languages, certifications, career interests)
- Get Career Suggestions (AI analysis)
- Check Skill Gaps
- View Job Recommendations
- **Save a career path for later reference**
- **Track skill-development goals with suggested courses, and mark them complete**
- **View recommendation history (recent activity)**

**Out of scope:**
- Job application handling or submission to employers
- Deep psychometric or personality assessments
- Real-time job market/salary data integration (future work)

## 4. Functional Requirements

| ID | Requirement | Description | Priority |
|---|---|---|---|
| FR-1 | User Registration | Register with name, email, password, or OAuth. | High |
| FR-2 | User Login | Log in with credentials or linked OAuth account. | High |
| FR-3 | Email Verification | Verification token issued to confirm email. | Medium |
| FR-4 | Session Protection | Authenticated session required beyond login/register. | High |
| FR-5 | Role-Based Access | USER/ADMIN roles restrict access accordingly. | Medium |
| FR-6 | Onboarding Flag | Tracks profile-setup completion (`isOnboarded`). | Medium |
| FR-7 | Academic Profile | Edit job title, degree, field of study, achievements. | High |
| FR-8 | Work Experience | Add multiple entries with company, title, dates, responsibilities. | High |
| FR-9 | Skills | Add categorized skills with proficiency. | High |
| FR-10 | Languages | Add languages with proficiency. | Medium |
| FR-11 | Certifications | Add certifications with issue date, expiration, and credential link. | Medium |
| FR-12 | Skill Assessments | Record assessment scores. | Low |
| FR-13 | Career Interests | Set multiple preferred job roles, industries, goals, links. | High |
| FR-14 | Get Career Suggestions | AI analyzes full profile, returns ranked career paths with reasoning. | High |
| FR-15 | Check Skill Gaps | Identify missing skills relative to recommended paths. | High |
| FR-16 | View Job Recommendations | Present recommended roles in a dashboard view. | High |
| FR-17 | Logout | End session. | High |
| FR-18 | **Save Recommendation History** | Every AI analysis run is saved with a timestamp, viewable as "Recent Activity." | High |
| FR-19 | **Save Career Path** | User can bookmark a specific recommended career path for later reference. | Medium |
| FR-20 | **Track Skill Goals** | AI-suggested skills-to-develop are saved as a checkable list, each optionally paired with a suggested course (title + link); user can mark complete. | High |
| FR-21 | Password Reset | User can request a password reset link via email. | Medium |

## 5. Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| NFR-1 | Usability | Profile data entry broken into clear sections, not one long form. |
| NFR-2 | Performance | AI calls show a loading state; results are not stale-cached. |
| NFR-3 | Reliability | Graceful handling of AI API failures. |
| NFR-4 | Scalability | Normalized schema (Skill/Language master tables, join tables) supports growth. |
| NFR-5 | Maintainability | Feature-organized code per Next.js App Router conventions. |
| NFR-6 | Data Integrity | Skills/Languages normalized, not free text. |
| NFR-7 | Security | Hashed passwords, protected OAuth tokens, server-side route protection. |
| NFR-8 | **Data Persistence** | AI-generated recommendations, saved career paths, and skill goals persist across sessions — a user's history must survive logout/login. |

## 6. Assumptions and Constraints

- Users self-report their profile data; the system does not independently verify it.
- The AI recommendation engine depends on a third-party API; availability and quality are external dependencies.
- Single Next.js project (frontend + backend combined).
- Real-time job market data is explicitly excluded from this version.
- ~~Recommendations are computed on demand and not stored~~ — **superseded**: as of v3, recommendations, saved career paths, and skill goals are persisted (see FR-18–20 and ERD.md's "Changes from Figure 4.1").

## 7. Traceability to Thesis

This FRD formalizes Chapter 3 of the Skilly thesis. It is aligned to the use case diagram and to Figure 4.1 (ERD), **with a documented revision**: three entities (`Recommendation`, `SavedCareerPath`, `SkillGoal`) and four field-level additions were introduced after building UI/UX mockups revealed the original design couldn't support recommendation history, saved career paths, or a persistent skill-goal checklist. See `ERD.md` for the full list of changes and rationale.
