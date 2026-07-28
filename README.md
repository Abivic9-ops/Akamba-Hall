# Akamba Hall Library Management System

A full-stack library management platform built with Next.js, designed to centralize every aspect of library operations from catalogue browsing and book circulation to space reservations, inventory tracking, and AI-powered research assistance. The system serves students, library staff, executives, and administrators through role-specific dashboards and workflows.

---

## Author

**Victor Mwendwa**

GitHub: https://github.com/Abivic9-ops

Website: https://victormwendwa.vercel.app/

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Core Features](#core-features)
4. [Data Model](#data-model)
5. [Application Architecture](#application-architecture)
6. [Roles and Access Control](#roles-and-access-control)
7. [AI Capabilities](#ai-capabilities)
8. [Progressive Web App Support](#progressive-web-app-support)
9. [Local Development Setup](#local-development-setup)
10. [Environment Variables](#environment-variables)
11. [Prisma Workflow and Database Migrations](#prisma-workflow-and-database-migrations)
12. [Project Structure](#project-structure)
13. [Code Conventions and Patterns](#code-conventions-and-patterns)
14. [API Routes](#api-routes)
15. [Authentication and Authorization](#authentication-and-authorization)
16. [Integrations and Third Party Services](#integrations-and-third-party-services)
17. [Styling and Design Tokens](#styling-and-design-tokens)
18. [Testing and Quality Assurance](#testing-and-quality-assurance)
19. [Build and Deployment](#build-and-deployment)
20. [Performance Optimization](#performance-optimization)
21. [Security](#security)
22. [Database Maintenance and Backups](#database-maintenance-and-backups)
23. [Operational Runbook](#operational-runbook)
24. [Contribution Guidelines](#contribution-guidelines)
25. [Troubleshooting](#troubleshooting)

---

## System Overview

Akamba Hall Library Management System is a centralized platform that unifies all library operations into a single, cohesive application. The system addresses the challenge of fragmented library management by providing a unified interface for member management, book circulation, holds, space bookings, inventory tracking, announcements, events, digital resources, and administrative reporting.

The platform is built for institutions that operate a physical library and require a digital layer to manage daily operations. It supports multiple user roles, each with a dedicated dashboard and set of permissions. Students can browse the catalogue, borrow books, reserve study spaces, and access digital resources. Staff members manage circulation, process returns, and handle day-to-day desk operations. Library heads oversee operations, review feedback, and manage staff. Executives monitor library performance through analytics and approval workflows. Super administrators control the entire system including user management, feature flags, backups, integrations, and audit trails.

The system is designed for a workload profile that involves frequent read operations for catalogue browsing and dashboard rendering, with occasional write operations for checkouts, holds, bookings, and administrative updates. Server-side rendering ensures that data-driven pages load quickly and present fresh information on every request.

---

## Technology Stack

### Frontend

1. **Next.js 16.2.10** with the App Router for server-side rendering, nested layouts, and route-based code splitting
2. **React 19.2.4** with React DOM 19.2.4 for the component layer
3. **TypeScript 5** for type safety across the entire codebase
4. **Tailwind CSS 4** with the `@tailwindcss/postcss` plugin for utility-first styling
5. **shadcn/ui** (base-nova style) for pre-built, accessible UI components including buttons, cards, dialogs, inputs, selects, badges, textareas, and labels
6. **Framer Motion 12** for animations and page transitions
7. **Recharts 3** for data visualization in dashboards and reports
8. **Lucide React** and **React Icons** for iconography
9. **Poppins** and **Inter** Google Fonts for typography

### Backend and Data

1. **Prisma 7** as the ORM with PostgreSQL as the primary database
2. **@prisma/adapter-pg** with the `pg` Pool for connection management
3. **Supabase** (`@supabase/ssr` and `@supabase/supabase-js`) for authentication, session management, and realtime features
4. **Cloudinary** for media storage, image uploads, and on-the-fly transformations

### AI and Intelligence

1. **Google Gemini API** for primary AI features
2. **Groq** as a high-speed fallback for AI operations
3. **OpenRouter** as an additional fallback with access to free models

### Development and Build

1. **ESLint 9** with `eslint-config-next` (core web vitals and TypeScript rules)
2. **tsx** for running TypeScript scripts directly (used in seeding and maintenance)
3. **Turbopack** for fast development builds and production output
4. **Vercel** for deployment and hosting

---

## Core Features

### Book Catalogue and Circulation

The catalogue system provides full-text search, category filtering, and detailed book views. Each book entry supports metadata fields including title, author, ISBN, category, cover image, publication year, and optional rich text content or external document links via Cloudinary. The system manages multiple copies per book, each tracked by barcode and shelf location with its own availability status (AVAILABLE, LOANED, LOST, DAMAGED, RESERVED).

Circulation workflows cover the complete loan lifecycle: checkout, renewal, return, overdue detection, and fine association. Loans track the borrower, the specific copy, checkout date, due date, return date, renewal count, and current status. Overdue items are automatically flagged, and fine records are created and linked to the originating loan.

### Holds and Reservations

Members can place holds on books that are currently loaned out. Each hold maintains a queue position, request timestamp, and expiry date. The system tracks hold status through PENDING, READY, EXPIRED, FULFILLED, and CANCELLED states. When a book is returned, the next hold in the queue is notified and moved to READY status.

### Space Bookings

The system manages reservations for library spaces including reading halls, study rooms, audio-visual rooms, boardrooms, computer labs, and innovation corners. Each space has a defined capacity and type. Bookings include start and end times, a title, and a status (PENDING, APPROVED, REJECTED, CANCELLED, NO_SHOW). Conflict detection prevents double bookings for the same space and time slot.

### Announcements and Events

Administrators and authorized staff publish announcements with rich text content, category classification, attachment support via Cloudinary, and targeted delivery to specific roles. Announcement categories include GENERAL, EVENT, CLOSURE, ERESOURCE, POLICY, CAMPAIGN, WORKSHOP, and ACQUISITION. Announcements support pinning and automatic expiration.

Events follow a similar model with venue information, start and end times, attendee capacity limits, and category classification (GENERAL, WORKSHOP, FAIR, MEETING, CLUB, TRAINING). Both announcements and events support role-based targeting to ensure content reaches the intended audience.

### Digital Resources and E-Resources

The system catalogs external digital resources and electronic resources, each with provider information, description, URL, category, and active status. These resources give members quick access to licensed databases, journals, and online tools through a unified interface.

### Equipment and Inventory

Equipment tracking covers the full lifecycle from procurement to retirement. Each item records name, description, category, image, status (AVAILABLE, IN_USE, MAINTENANCE, RETIRED), location, and optional assignment to a specific user. The inventory module provides operational visibility into library assets.

### Policies and Guidelines

A policies module stores library rules and guidelines organized by category (GENERAL, BORROWING, LATE_RETURN, ROOM_BOOKING, ERESOURCE, INCIDENT, CONDUCT). Each policy has a title, description, category, optional PDF document link, and active status flag.

### Lost and Found

Members and staff can report lost or found items with descriptions, categories, images, and status tracking (LOST, FOUND, CLAIMED). The system records who reported each item and when it was resolved.

### Issue Logging

An issue logging system tracks problems related to book damage, late returns, facility issues, equipment problems, and member conduct. Issues carry severity levels (LOW, MEDIUM, HIGH) and status tracking (OPEN, IN_PROGRESS, RESOLVED, CLOSED) with optional assignment to specific staff members.

### Bookmarks

Members can bookmark books for quick access. Each bookmark stores the book title, author, category, cover image, and personal notes. The system enforces a unique constraint per user per book title to prevent duplicate bookmarks.

### Courses

An academic course catalog links books and resources to specific courses. Each course has a code, name, department, form level, instructor, and material count.

### Newspapers and Periodicals

The system tracks newspapers and periodicals with publisher information, frequency (DAILY, etc.), language, category, and access URLs.

### QR Code Authentication

Members can authenticate using QR cards. Each card has a unique reference, status (ACTIVE, SUSPENDED, REVOKED), and issuance history. The system supports QR-based login as an alternative to traditional email/password authentication.

### Issue and Feedback Tracking

Members can submit feedback and report issues through dedicated forms. The system captures issue details including category, severity, description, and optional attachments.

---

## Data Model

The Prisma schema defines the following primary models and their relationships. The schema file is located at `prisma/schema.prisma`.

### Core Models

1. **User** - Central identity model with fields for email, student ID, full name, avatar URL, role, member type, and status. Relations connect users to loans, holds, bookings, QR cards, announcements, events, bookmarks, issue logs, lost and found items, equipment, and digital resources.

2. **Book** - Represents a library book with title, author, ISBN, category, cover image, description, rich text content, external document URL, and publication year. Each book has multiple copies.

3. **Copy** - A physical copy of a book, identified by barcode and shelf location. Each copy has an availability status and is linked to one book.

4. **Loan** - Records a book checkout with the borrower, the specific copy, checkout date, due date, optional return date, renewal count, status, and processor reference. Links to an optional fine record.

5. **Hold** - Manages a reservation request for a book with queue position, request timestamp, expiry date, and status.

6. **Booking** - Reserves a library space with start time, end time, title, and status. Links to a user and a space.

7. **Space** - Defines a reservable library space with name, capacity, and type.

8. **QRCard** - Represents an issued QR authentication card with a unique reference, status, and issuance timestamps.

### Content Models

9. **Announcement** - Library announcements with title, body, category, attachment URL, author, target roles, pin status, publish time, and expiration.

10. **Event** - Library events with title, description, venue, image, start and end times, category, attendee capacity, author, and target roles.

11. **Policy** - Library policies with title, description, category, document URL, and active status.

12. **DigitalResource** - External digital resources with title, provider, description, URL, icon, category, and active status.

13. **EResource** - Electronic resources with title, provider, description, URL, category, icon, and active status.

14. **Newspaper** - Newspapers and periodicals with title, publisher, category, frequency, language, URL, cover image, and active status.

15. **Course** - Academic courses with code, name, department, form level, material count, and instructor.

### Operational Models

16. **Equipment** - Library equipment with name, description, category, image, status, location, and optional assignment to a user.

17. **Fine** - Financial penalties linked to overdue loans with amount, reason, paid status, and payment timestamp.

18. **LostFoundItem** - Lost or found items with title, description, category, image, status, reporter, and resolution timestamp.

19. **IssueLog** - Reported issues with title, description, category, severity, status, reporter, assignee, and attachment.

20. **Bookmark** - Personal book bookmarks with title, author, category, cover image, and notes.

21. **RoleRequest** - Requests for role changes with requested role, reason, status, reviewer, review note, and timestamps.

### Enumerations

The schema defines the following enums for consistent status and type values:

1. **Role**: STUDENT, STAFF, EXECUTIVE, ASSISTANT, CAPTAIN, PREFECT, LIBRARY_HEAD, SUPER_ADMIN
2. **MemberType**: STUDENT, STAFF, EXECUTIVE, PUBLIC
3. **UserStatus**: ACTIVE, INACTIVE, SUSPENDED
4. **QRStatus**: ACTIVE, SUSPENDED, REVOKED
5. **CopyStatus**: AVAILABLE, LOANED, LOST, DAMAGED, RESERVED
6. **LoanStatus**: ACTIVE, RETURNED, OVERDUE, LOST
7. **HoldStatus**: PENDING, READY, EXPIRED, FULFILLED, CANCELLED
8. **SpaceType**: READING_HALL, STUDY_ROOM, AVR, BOARDROOM, COMPUTER_LAB, INNOVATION_CORNER
9. **BookingStatus**: PENDING, APPROVED, REJECTED, CANCELLED, NO_SHOW
10. **RequestStatus**: PENDING, APPROVED, REJECTED, REVOKED
11. **AnnouncementCategory**: GENERAL, EVENT, CLOSURE, ERESOURCE, POLICY, CAMPAIGN, WORKSHOP, ACQUISITION
12. **EventCategory**: GENERAL, WORKSHOP, FAIR, MEETING, CLUB, TRAINING
13. **PolicyCategory**: GENERAL, BORROWING, LATE_RETURN, ROOM_BOOKING, ERESOURCE, INCIDENT, CONDUCT
14. **LostFoundStatus**: LOST, FOUND, CLAIMED
15. **IssueCategory**: GENERAL, BOOK_DAMAGE, LATE_RETURN, FACILITY, EQUIPMENT, MEMBER_CONDUCT
16. **IssueSeverity**: LOW, MEDIUM, HIGH
17. **IssueStatus**: OPEN, IN_PROGRESS, RESOLVED, CLOSED
18. **EquipmentStatus**: AVAILABLE, IN_USE, MAINTENANCE, RETIRED

---

## Application Architecture

### Route Groups

The application uses Next.js route groups to organize pages into three distinct zones:

**Public Routes** (`app/(public)/`)
Pages accessible to all visitors without authentication. Includes the landing page, about page, contact page, news section, resources directory, search functionality, and services overview. The public layout provides a navigation bar, footer, and an AI chat widget.

**Auth Routes** (`app/(auth)/`)
Standalone authentication pages with no shared navigation shell. Includes login, registration, QR code login, password reset, and forgot password flows. Each auth page renders independently for a focused, distraction-free experience.

**Operations Routes** (`app/(operations)/`)
Authenticated pages behind a role-based gatekeeper layout. The operations layout component (`app/(operations)/layout.tsx`) verifies the user session via Supabase, fetches the user profile from Prisma, and wraps all child routes in an `OperationsShell` component that provides the sidebar, header, and navigation context. This layout is force-dynamic to ensure fresh data on every request.

### Route Sections Within Operations

1. **Student** (`(operations)/student/`) - 21 route sections covering dashboard, catalogue, loans, holds, bookings, announcements, events, e-resources, newspapers, policies, courses, bookmarks, fines, history, feedback, help, profile, settings, requests, AI tools, and reservations.

2. **Staff** (`(operations)/staff/`) - 22 route sections covering dashboard, catalogue, loans, holds, bookings, announcements, events, e-resources, newspapers, policies, courses, bookmarks, fines, history, feedback, help, profile, settings, requests, inventory, members, and equipment booking.

3. **Library Head** (`(operations)/library-head/`) - Administrative dashboard for managing all library operations, staff, members, inventory, bookings, feedback, lost and found, charges, access cards, and messages.

4. **Executive** (`(operations)/executive/`) - Oversight dashboard with approval queues, library performance snapshots, oversight reports, policy visibility, and resource monitoring.

5. **Super Admin** (`(operations)/super-admin/`) - 25 management sections covering dashboard, users, members, catalogue, loans, bookings, events, policies, digital resources, learning resources, inventory, newspapers, courses, QR cards, permissions, system announcements, audit trails, automations, backups, feature flags, integrations, logs, settings, access portals, and profile.

6. **Desk** (`(operations)/desk/`) - Front desk operations for day-to-day circulation tasks.

7. **Account** (`(operations)/account/`) - Account management for the authenticated user.

### Layout Hierarchy

The root layout (`app/layout.tsx`) applies globally across all routes. It loads the Poppins and Inter fonts, wraps the application in a `ThemeProvider` for dark/light mode support, includes an `InitialLoader` for the first paint experience, and renders a `PWAInstallPrompt` for progressive web app installation.

Each route group overrides or extends this root layout with its own specific shell, navigation, and access control logic.

---

## Roles and Access Control

The system implements a comprehensive role-based access control model. Each user is assigned a role that determines which dashboards, pages, and actions they can access.

### Role Hierarchy

1. **STUDENT** - Can browse the catalogue, borrow books, manage holds, reserve spaces, view announcements and events, access digital resources, submit feedback, log issues, manage bookmarks, and use AI tools. Dashboard at `/student/dashboard`.

2. **STAFF** - All student capabilities plus circulation management (checkouts, returns, renewals), member lookup, inventory management, and equipment booking. Dashboard at `/staff/dashboard`.

3. **ASSISTANT** - Desk operations role with access to front desk workflows including returns processing, member management, book management, issue logging, lost and found, inventory, reports, and KPIs. Dashboard at `/desk/dashboard`.

4. **CAPTAIN** - Same access level as ASSISTANT for desk operations. Dashboard at `/desk/dashboard`.

5. **PREFECT** - Same access level as ASSISTANT for desk operations. Dashboard at `/desk/dashboard`.

6. **EXECUTIVE** - Oversight role with approval queues, performance monitoring, policy management, and reporting. Dashboard at `/executive/dashboard`.

7. **LIBRARY_HEAD** - Full operational management including staff oversight, member management, inventory control, bookings, feedback review, lost and found, charges, and access card management. Dashboard at `/library-head/dashboard`.

8. **SUPER_ADMIN** - Complete system control including user management, role assignments, feature flags, system announcements, audit trails, automations, backups, integrations, learning resources, digital resources, system logs, and all administrative settings. Dashboard at `/super-admin/dashboard`.

### Access Control Implementation

The `requireRole` function in `lib/auth/roleGuard.ts` enforces access at the server component level. It retrieves the authenticated user from Supabase, fetches their profile from Prisma, and verifies that their role matches one of the allowed roles for the current route. Unauthorized access attempts redirect to the `/unauthorized` page.

The `getRouteForRole` function maps each role to its default dashboard route, enabling automatic redirection after login.

---

## AI Capabilities

The system integrates multiple AI providers (Google Gemini, Groq, OpenRouter) to deliver intelligent features across the library experience.

### AI API Endpoints

1. **Chat** (`app/api/ai/chat/route.ts`) - Conversational AI assistant for general library inquiries.
2. **Book Summary** (`app/api/ai/book-summary/route.ts`) - Generates summaries for books in the catalogue.
3. **Citation Generator** (`app/api/ai/citation/route.ts`) - Creates properly formatted citations for books and resources.
4. **FAQ** (`app/api/ai/faq/route.ts`) - Answers frequently asked questions about library services and policies.
5. **Reading List** (`app/api/ai/reading-list/route.ts`) - Generates personalized reading recommendations.
6. **Recommendations** (`app/api/ai/recommendations/route.ts`) - Suggests books based on reading history and preferences.
7. **Renewal Assistant** (`app/api/ai/renewal-assistant/route.ts`) - Helps members understand and process loan renewals.
8. **Research Assistant** (`app/api/ai/research-assistant/route.ts`) - Assists with research queries and resource discovery.
9. **Study Plan** (`app/api/ai/study-plan/route.ts`) - Creates structured study plans using library resources.
10. **Suggestions** (`app/api/ai/suggestions/route.ts`) - Provides contextual suggestions for library exploration.

### AI Components

The `components/ai/` directory contains 17 client-side components that provide AI-powered user interfaces:

1. **ai-chat-widget.tsx** - Floating chat widget available on public pages for instant AI assistance.
2. **ai-book-summary.tsx** - Displays AI-generated book summaries within book detail views.
3. **ai-book-recommendations.tsx** - Shows personalized book recommendations on dashboards.
4. **ai-reading-list.tsx** - Renders AI-curated reading lists.
5. **ai-citation-generator.tsx** - Provides a citation generation interface.
6. **ai-research-assistant.tsx** - Research help interface integrated into relevant pages.
7. **ai-study-plan.tsx** - Study plan creation and display component.
8. **ai-renewal-assistant.tsx** - Loan renewal guidance interface.
9. **ai-library-faq.tsx** - AI-powered FAQ chatbot for library inquiries.
10. **ai-search-suggestions.tsx** - Intelligent search suggestions for the catalogue.
11. **ai-announcement-banner.tsx** - AI-enhanced announcement display.
12. **ai-feature-banner.tsx** - Promotional banners highlighting AI features.
13. **book-ai-actions.tsx** - Action buttons for AI features on book detail pages.
14. **loan-ai-actions.tsx** - AI action buttons for loan management pages.
15. **portal-ai-toolbar.tsx** - AI toolbar integrated into dashboard portals.
16. **library-head-banner-wrapper.tsx** - AI banner wrapper for library head dashboard.
17. **super-admin-banner-wrapper.tsx** - AI banner wrapper for super admin dashboard.

---

## Progressive Web App Support

The application functions as a Progressive Web App (PWA), allowing users to install it on their devices and access it with a native app experience.

The PWA manifest (`app/manifest.ts`) defines the app name as "Akamba Hall Library", short name as "Akamba Hall", standalone display mode, portrait orientation, and a navy brand color (#0B1A3B). The manifest specifies three icon sizes: 192x192, 512x512, and a maskable variant for adaptive icon support on Android devices.

The service worker configuration in `next.config.ts` ensures the service worker file (`/sw.js`) is never cached and always served fresh, with appropriate Content-Type and Content-Security-Policy headers.

The `PWAInstallPrompt` component renders on every page and detects when the browser supports PWA installation, offering users the option to add the app to their home screen.

---

## Local Development Setup

### Prerequisites

1. **Node.js** - Current LTS version (18 or later recommended)
2. **PostgreSQL** - A running PostgreSQL instance, either local or hosted (Supabase, Neon, Railway, or similar)
3. **Package Manager** - npm, pnpm, or yarn
4. **Git** - For version control

### Step 1: Clone the Repository

```bash
git clone https://github.com/Abivic9-ops/Akamba-Hall.git
cd Akamba-Hall
```

### Step 2: Install Dependencies

```bash
npm install
```

This command installs all dependencies and triggers the `postinstall` script, which runs `prisma generate` to produce the Prisma client.

### Step 3: Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Then open `.env` and provide values for each variable. See the [Environment Variables](#environment-variables) section for a complete reference.

### Step 4: Seed the Database

```bash
npm run db:seed
```

This creates the initial super admin user and any other seed data required for the system to function.

### Step 5: Start the Development Server

```bash
npm run dev
```

The application starts at `http://localhost:3000`. The development server uses Turbopack for fast hot module replacement and rebuilds.

### Step 6: Build for Production

```bash
npm run build
```

This runs `prisma generate` followed by `next build`, producing optimized production assets in the `.next` directory.

### Step 7: Start the Production Server

```bash
npm start
```

---

## Environment Variables

The `.env.example` file documents all required environment variables. Copy it to `.env` and provide your values.

### Supabase Configuration

1. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL. Found in the Supabase dashboard under Project Settings > API.
2. **NEXT_PUBLIC_SUPABASE_ANON_KEY** - Your Supabase anonymous/public key. Found in the same location as the project URL.
3. **SUPABASE_SERVICE_ROLE_KEY** - Your Supabase service role key (secret). Found in Supabase Dashboard > Settings > API > service_role. Required for the seed script and administrative operations.

### Database Configuration

4. **DATABASE_URL** - The PostgreSQL connection string using the Transaction mode from Supabase. Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`. This is used by the Prisma client at runtime.
5. **DIRECT_URL** - The PostgreSQL connection string using the Session mode from Supabase. Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres`. This is used by Prisma migrations.

### Super Admin Seed Credentials

6. **SUPER_ADMIN_EMAIL** - Email address for the initial super admin account. Default: `admin@akambahall.local`.
7. **SUPER_ADMIN_PASSWORD** - Password for the initial super admin account.
8. **SUPER_ADMIN_NAME** - Full name for the initial super admin account. Default: `System Administrator`.

### Cloudinary Configuration

9. **CLOUDINARY_CLOUD_NAME** - Your Cloudinary cloud name. Found in the Cloudinary dashboard.
10. **CLOUDINARY_API_KEY** - Your Cloudinary API key.
11. **CLOUDINARY_API_SECRET** - Your Cloudinary API secret.

### AI Provider Configuration

12. **GEMINI_API_KEY** - Google Gemini API key for primary AI features. Obtain at https://aistudio.google.com/apikey.
13. **GROQ_API_KEY** - Groq API key for high-speed AI fallback. Obtain at https://console.groq.com/keys.
14. **OPENROUTER_API_KEY** - OpenRouter API key for additional AI fallback. Obtain at https://openrouter.ai/settings/keys.

---

## Prisma Workflow and Database Migrations

### Editing the Schema

Open `prisma/schema.prisma` and make your model changes. The schema defines all database models, fields, relations, enums, and indexes.

### Creating a Migration

After modifying the schema, generate a migration for local development:

```bash
npx prisma migrate dev --name describe_your_change
```

This creates a new migration directory under `prisma/migrations/` with the SQL statements needed to update the database.

### Applying Migrations in Production

Deploy migrations to production through your CI/CD pipeline:

```bash
npx prisma migrate deploy
```

### Regenerating the Prisma Client

After any schema change, regenerate the client to ensure type definitions match the updated schema:

```bash
npx prisma generate
```

This is also handled automatically by `npm run build` and `npm run db:seed`.

### Resetting and Reseeding

To reset the database to a clean state and apply all migrations fresh:

```bash
npm run db:seed
```

Or to fully reset the database (drops all data):

```bash
npm run db:reset
```

This runs `prisma migrate reset` followed by `db:seed`.

### Prisma Client Initialization

The Prisma client singleton is initialized in `lib/db/prisma.ts` using the `@prisma/adapter-pg` adapter with a PostgreSQL connection pool. In development, the client is cached on the global object to survive hot module reloads.

---

## Project Structure

```
akamba-hall/
  app/
    (auth)/               Standalone authentication pages (login, register, QR auth, password reset)
    (operations)/         Authenticated role-based dashboard pages
      account/            Account management for the current user
      catalogue/          Book catalogue browsing and search
      desk/               Front desk operations
      executive/          Executive oversight dashboard
      library-head/       Library head management dashboard
      members/            Member management
      reservations/       Space reservation management
      staff/              Staff operational dashboard
      student/            Student dashboard and features
      super-admin/        Full system administration (25 sections)
    (public)/             Public-facing pages (landing, about, contact, news, resources, services)
    api/
      ai/                 AI API endpoints (10 routes)
      auth/               Authentication API endpoints
    globals.css           Global styles and Tailwind theme configuration
    icon.png              Application icon
    layout.tsx            Root layout with fonts, theme provider, and PWA prompt
    manifest.ts           PWA manifest configuration
    not-found.tsx         Custom 404 page
    offline/              Offline fallback page
    unauthorized/         Unauthorized access page
  components/
    admin/                Admin CRUD components (announcements, catalogue, courses, e-resources, events, policies)
    ai/                   AI-powered UI components (17 files)
    dashboard/            Dashboard-specific components organized by role (student, staff, executive, library-head)
    desk/                 Front desk operational components (21 files)
    forms/                Form components (login form)
    guards/               Role guard UI components
    layout/               Layout components (sidebar, header, navbar, footer, loader, mobile nav)
    motion/               Animation components using Framer Motion
    pwa/                  PWA install prompt component
    shared/               Shared list and display components (announcements, bookmarks, courses, e-resources, equipment, events, feedback, fines, holds, history, newspapers, policies)
    staff/                Staff-specific components
    super-admin/          Super admin management components (17 files)
    ui/                   shadcn/ui base components (button, card, dialog, input, select, badge, label, textarea, donut chart, section card, empty state, theme toggle)
  lib/
    actions/              Server actions (20 files covering all domain areas)
    auth/                 Authentication and role guard utilities
    cloudinary/           Cloudinary media helper functions
    config/               Application configuration
    contexts/             React context providers (auth, theme)
    db/                   Prisma client initialization
    design/               Design utilities and constants
    supabase/             Supabase client setup (client, server, admin, middleware)
    types/                TypeScript type definitions
    utils/                Utility functions
    utils.ts              cn() Tailwind class merge utility
  prisma/
    schema.prisma         Database schema definition
    seed.ts               Database seed script
    migrations/           Prisma migration history
  public/                 Static assets, service worker, images, and PWA icons
  scripts/                Maintenance and utility scripts
  next.config.ts          Next.js configuration (image patterns, security headers)
  package.json            Dependencies, scripts, and project metadata
  tsconfig.json           TypeScript compiler configuration
  postcss.config.mjs      PostCSS configuration for Tailwind CSS v4
  eslint.config.mjs       ESLint configuration
  prisma.config.ts        Prisma configuration (schema path, migrations, datasource URL)
  components.json         shadcn/ui configuration
  vercel.json             Vercel deployment configuration
```

---

## Code Conventions and Patterns

### Server Components for Data Rendering

Data fetching and rendering happen in server components within the `app` directory. Server components call Prisma directly to query the database, eliminating client-side loading states and reducing JavaScript bundle size. The operations layout is an async server component that fetches the user profile before rendering any child route.

### Client Components for Interactivity

Components that require state, effects, event handlers, or browser APIs are marked with `use client` at the top. Client components handle form submissions, optimistic UI updates, search filtering, modal dialogs, and real-time interactions. The `components/` directory contains all client components, organized by domain.

### Server Actions for Mutations

All data mutations (create, update, delete) use server actions defined in `lib/actions/`. Each action file corresponds to a domain area (books, loans, holds, bookings, announcements, events, users, etc.). Server actions validate inputs, perform database operations, and return results to client components. Client components call server actions directly and manage optimistic UI updates locally.

### Component Composition

Components follow a composition pattern where large dashboard pages are assembled from smaller, focused components. Each component handles a single responsibility (overview cards, search, activity feed, etc.) and accepts data through props.

### Path Aliases

The project uses the `@/*` path alias (configured in `tsconfig.json`) to reference files relative to the project root. For example, `@/components/ui/button` resolves to `components/ui/button.tsx` and `@/lib/db/prisma` resolves to `lib/db/prisma.ts`.

### Naming Conventions

1. Component files use kebab-case (e.g., `loans-page-client.tsx`, `overview-cards.tsx`)
2. Client components include a `-client` suffix when they are the primary client component for a page
3. Server actions use camelCase function names in kebab-case files (e.g., `lib/actions/loans.ts` exports `createLoan`, `returnLoan`, etc.)
4. Prisma models use PascalCase (e.g., `User`, `Book`, `Loan`)
5. Enum values use SCREAMING_SNAKE_CASE (e.g., `ACTIVE`, `OVERDUE`, `READING_HALL`)

---

## API Routes

### Authentication API

1. **POST /api/auth/logout** - Signs out the current user and clears the session.

### AI API Endpoints

All AI endpoints are located under `app/api/ai/` and accept POST requests with JSON payloads.

1. **POST /api/ai/chat** - General purpose AI chat. Accepts a message array and returns an AI response.
2. **POST /api/ai/book-summary** - Generates a summary for a book. Accepts book details and returns a structured summary.
3. **POST /api/ai/citation** - Creates a formatted citation. Accepts book metadata and returns the citation in the requested format.
4. **POST /api/ai/faq** - Answers library-related questions. Accepts a question and returns an answer sourced from library policies and documentation.
5. **POST /api/ai/reading-list** - Generates a reading list. Accepts preferences or a topic and returns a list of recommended books.
6. **POST /api/ai/recommendations** - Provides book recommendations. Accepts reading history or interests and returns personalized suggestions.
7. **POST /api/ai/renewal-assistant** - Helps with loan renewal decisions. Accepts loan details and returns guidance on renewal eligibility and options.
8. **POST /api/ai/research-assistant** - Assists with research queries. Accepts a research topic and returns resource suggestions and guidance.
9. **POST /api/ai/study-plan** - Creates a study plan. Accepts a subject, timeline, and available resources and returns a structured plan.
10. **POST /api/ai/suggestions** - Provides contextual suggestions. Accepts a context (page, action, or query) and returns relevant next-step suggestions.

---

## Authentication and Authorization

### Supabase Authentication

The system uses Supabase for authentication. The `lib/supabase/` directory contains four client configurations:

1. **server.ts** - Server-side Supabase client for use in server components and server actions. Reads the session from cookies.
2. **client.ts** - Browser-side Supabase client for use in client components. Manages the auth session in the browser.
3. **admin.ts** - Admin/service-role Supabase client for administrative operations that bypass row-level security.
4. **middleware.ts** - Supabase middleware helper for auth state management at the edge.

### Session Management

The `getAuthUser` function in `lib/auth/roleGuard.ts` retrieves the current user by calling `supabase.auth.getSession()`. This reads the JWT from cookies and decodes it locally, avoiding rate limit issues with the Supabase auth server.

### Role-Based Access Control

The `requireRole` function accepts an array of allowed roles and performs three steps:

1. Verifies the user is authenticated (redirects to `/login` if not)
2. Fetches the user profile from Prisma to get the current role
3. Checks if the role is in the allowed list (redirects to `/unauthorized` if not)

Server components call `requireRole` at the top of the component body to enforce access before any data fetching or rendering occurs.

### Route to Role Mapping

The `roleRoutes` constant maps each role to its default dashboard:

1. STUDENT maps to `/student/dashboard`
2. STAFF maps to `/staff/dashboard`
3. EXECUTIVE maps to `/executive/dashboard`
4. ASSISTANT maps to `/desk/dashboard`
5. CAPTAIN maps to `/desk/dashboard`
6. PREFECT maps to `/desk/dashboard`
7. LIBRARY_HEAD maps to `/library-head/dashboard`
8. SUPER_ADMIN maps to `/super-admin/dashboard`

---

## Integrations and Third Party Services

### Supabase

Provides authentication (sign up, sign in, sign out, session management), PostgreSQL database hosting, row-level security policies, and realtime subscriptions. The project uses both the transaction-mode and session-mode connection strings from Supabase for different purposes (runtime queries vs. migrations).

### Cloudinary

Handles all media storage and transformation. Images uploaded for book covers, avatars, announcements, events, equipment, digital resources, and documents are stored in Cloudinary. The system generates transformed URLs optimized for different contexts (thumbnails, detail views, full-size).

### Google Gemini

Primary AI provider powering the chat assistant, book summaries, citation generation, FAQ responses, reading lists, research assistance, study plans, and contextual suggestions.

### Groq

High-speed AI fallback provider. Used when Gemini rate limits are reached or for features that prioritize response speed over model complexity.

### OpenRouter

Additional AI fallback provider with access to a range of models, including free-tier options for cost-effective AI features.

### Vercel

Hosting and deployment platform. The `vercel.json` configuration specifies the Next.js framework, build command, install command, and output directory. Environment variables are configured in the Vercel dashboard.

---

## Styling and Design Tokens

### Tailwind CSS v4

The project uses Tailwind CSS version 4 with the `@tailwindcss/postcss` PostCSS plugin. The `postcss.config.mjs` file configures only this plugin, reflecting the modern Tailwind v4 setup.

### shadcn/ui

The `components.json` file configures shadcn/ui with the `base-nova` style, React Server Component support, TypeScript, and the `lucide` icon library. Components are aliased to `@/components`, `@/components/ui`, `@/lib`, and `@/hooks`.

### Brand Palette

The global stylesheet (`app/globals.css`) defines the Akamba brand colors within the Tailwind theme:

1. **Navy** (#0B1A3B) - Primary brand color, used for backgrounds, headers, and strong visual elements
2. **Navy Light** (#13285A) - Lighter variant for hover states and secondary backgrounds
3. **Navy Mid** (#0E2150) - Mid-tone variant for depth and layering
4. **Gold** (#E8A63C) - Accent color for highlights, calls to action, and decorative elements

### Design Token System

The stylesheet defines a complete design token system following shadcn/ui conventions: background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring, chart-1 through chart-5, and a full set of sidebar tokens for the dashboard sidebar.

### Typography

The root layout loads two Google Fonts:

1. **Poppins** (weights: 300, 400, 500, 600, 700) as the primary font applied to the body
2. **Inter** (weights: 400, 500, 600, 700) as a secondary font available via the `--font-inter` CSS variable

### Animations

Framer Motion 12 provides animation capabilities. The `tw-animate-css` package adds Tailwind-compatible animation utilities. The `components/motion/` directory contains reusable animation components.

---

## Testing and Quality Assurance

### Type Checking

Run TypeScript type checking to catch type errors:

```bash
npx tsc --noEmit
```

### Linting

Run ESLint to catch code style and quality issues:

```bash
npm run lint
```

The ESLint configuration extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, with ignores for `.next/`, `out/`, `build/`, and `next-env.d.ts`.

### Recommended Testing Approach

1. **Unit Tests** - Test pure functions, utility helpers, and server actions in isolation. Place tests in a `tests/` directory or co-locate them with the source files.
2. **Integration Tests** - Test API endpoints and server actions against a test database. Use a disposable database or a test schema to isolate tests.
3. **End-to-End Tests** - Use Playwright or a similar tool to validate critical user flows: login, catalogue search, book checkout, book return, hold placement, space booking, and admin workflows.

---

## Build and Deployment

### Vercel Deployment

1. Connect the repository to Vercel.
2. Configure environment variables in the Vercel dashboard using the values from your `.env` file.
3. The build command is `npm run build` and the install command is `npm install`, as specified in `vercel.json`.
4. The output directory is `.next`.

### Docker Deployment

A production Docker container can be built with the following Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json .
RUN npm ci --only=production
COPY . .
RUN npm run build
ENV DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
CMD ["npm", "start"]
```

### Production Build Process

The `npm run build` command executes `prisma generate` followed by `next build`. This ensures the Prisma client is up to date with the current schema before Next.js produces the optimized production bundle.

### Environment Variables in Production

All environment variables must be configured in the deployment platform (Vercel dashboard, Docker environment, or hosting provider). The `.env` file is used only for local development and must never be committed to version control.

---

## Performance Optimization

### Rendering Strategy

Server rendering provides fresh data for dynamic pages (dashboards, catalogue search results, loan lists). Static rendering benefits pages where caching improves throughput (public landing page, about page, policy pages). The operations layout uses `force-dynamic` to ensure every authenticated page request returns current data.

### Database Access Patterns

1. Use Prisma's `select` to fetch only the fields required by the page, reducing data transfer and serialization overhead.
2. Use cursor-based pagination for large lists (catalogue, loan history, member directory) to maintain consistent performance as data grows.
3. Apply composite indexes to frequently filtered columns (e.g., the `@@index([userId])` and `@@index([status])` on RoleRequest).

### Connection Management

The Prisma client in `lib/db/prisma.ts` uses the `@prisma/adapter-pg` adapter with a PostgreSQL connection pool. This is particularly important for serverless and function-based deployments where each invocation creates a new connection.

### Static Assets

Cloudinary serves images through its global CDN, reducing latency for users worldwide. The Next.js image configuration in `next.config.ts` defines remote patterns for allowed image sources (pravatar.cc and unsplash.com).

### Service Worker

The service worker provides offline support for previously visited pages and static assets, improving the experience on unreliable networks.

---

## Security

### HTTP Headers

The `next.config.ts` file configures global security headers applied to all routes:

1. **X-Content-Type-Options** set to `nosniff` prevents MIME type sniffing.
2. **X-Frame-Options** set to `DENY` prevents clickjacking through iframe embedding.
3. **Referrer-Policy** set to `strict-origin-when-cross-origin` controls referrer information leakage.

### Service Worker Security

The service worker file receives dedicated headers with a strict Content-Security-Policy that restricts script execution to same-origin sources.

### Secrets Management

All sensitive values (database credentials, API keys, service tokens) are stored in environment variables. The `.gitignore` file excludes all `.env*` files (except `.env.example`) from version control. For production, use a secrets manager (Vercel Environment Variables, AWS Secrets Manager, HashiCorp Vault, or similar).

### Input Validation

Server actions validate all mutation inputs before processing. The server-side validation ensures data integrity regardless of client-side validation state.

### Role-Based Access

Every authenticated page verifies the user's role before rendering content. The `requireRole` function runs at the server component level, ensuring unauthorized users access redirected before any data is fetched or rendered.

---

## Database Maintenance and Backups

### Backup Strategy

1. Use your database provider's backup facility (Supabase automatic backups, pg_dump, or similar).
2. Store encrypted backup copies in durable storage (S3, GCS, or similar).
3. Perform periodic restore tests in a staging environment to validate backup integrity.

### Restore Procedure

1. Restore the backup to a staging database.
2. Run `npx prisma migrate deploy` to ensure all migrations are applied.
3. Validate key application flows: login, catalogue search, book checkout, and admin dashboard access.
4. Document the restore time and any issues encountered.

### Database Monitoring

1. Review slow query logs weekly and add indexes for frequently accessed patterns.
2. Monitor connection pool usage to ensure the database handles peak traffic.
3. Track database growth and plan capacity upgrades ahead of demand.

---

## Operational Runbook

### Daily Checks

1. Verify that scheduled jobs (overdue detection, fine calculation) completed successfully.
2. Review production error logs for high-frequency issues.
3. Confirm that AI provider API keys remain within rate limits.

### Weekly Tasks

1. Review database growth metrics and index usage statistics.
2. Check for failed login attempts or unusual access patterns in audit logs.
3. Verify that backups completed and are stored securely.
4. Review and respond to member feedback and issue logs.

### Release Checklist

1. Run `npx tsc --noEmit` to verify type safety.
2. Run `npm run lint` to verify code quality.
3. Run `npm run build` to verify production build succeeds.
4. Test critical flows in a staging environment.
5. Review all changes included in the release.
6. Update the changelog with release notes.
7. Create a release tag and deploy.

---

## Contribution Guidelines

### Branch Naming

Use a descriptive prefix reflecting the change type:

1. `feature/` for new functionality
2. `bugfix/` for bug corrections
3. `chore/` for maintenance tasks
4. `docs/` for documentation changes

Include a ticket number when applicable (e.g., `feature/add-email-notifications-123`).

### Pull Request Checklist

1. Provide a clear summary of the change and its purpose.
2. Include database migration details when schema changes are involved.
3. Run type checking (`npx tsc --noEmit`), linting (`npm run lint`), and tests locally before requesting review.
4. Add screenshots or recordings for UI changes.
5. Document any new environment variables or configuration requirements.

### Code Review Standards

1. Verify that server-side validation is present for all new mutation endpoints.
2. Confirm that role-based access control is enforced for new pages and actions.
3. Check that database queries use selective field selection and appropriate indexing.
4. Ensure new components follow the existing naming and organization patterns.

---

## Troubleshooting

### Type Errors

Run `npx tsc --noEmit` to identify all type errors. Common causes include mismatched Prisma types after schema changes, missing imports, or incorrect prop types.

### Prisma Client Mismatch

If you encounter Prisma client errors after modifying the schema, run:

```bash
npx prisma generate
```

This regenerates the client to match the current schema definition.

### Build Failures

If `npm run build` fails, check:

1. All environment variables are set (especially DATABASE_URL and Supabase keys).
2. Prisma schema compiles without errors (`npx prisma validate`).
3. TypeScript type checking passes (`npx tsc --noEmit`).

### Development Server Issues

If the development server fails to start:

1. Verify Node.js version is 18 or later.
2. Delete the `.next` directory and restart.
3. Run `npm install` again to ensure all dependencies are installed.
4. Check that PostgreSQL is accessible at the configured DATABASE_URL.

### Authentication Issues

1. Verify Supabase URL and anon key are correct in `.env`.
2. Check that the Supabase service role key is set for server-side operations.
3. Ensure cookies are enabled in the browser for session management.

### AI Feature Issues

1. Verify that at least one AI API key (GEMINI_API_KEY, GROQ_API_KEY, or OPENROUTER_API_KEY) is configured.
2. Check API key validity and remaining quota with the respective provider.
3. Review server logs for specific error messages from the AI provider.

---

## Next Steps

1. Create a developer onboarding checklist with step-by-step commands and expected outputs.
2. Build a comprehensive troubleshooting guide with specific error messages and resolution steps.
3. Automate release drafting and changelog generation in the CI pipeline.
4. Add analytics dashboards for library usage insights and administrative reporting.

---

**Author:** Victor Mwendwa

**GitHub:** https://github.com/Abivic9-ops/Akamba-Hall

**Website:** https://victormwendwa.vercel.app/
