# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components in natural language, Claude generates the code using tool calls, and a live preview renders instantly in a sandboxed iframe.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma with SQLite, Anthropic Claude API (Haiku 4.5)

## Commands

```bash
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Vitest unit tests
npm run setup        # Install deps + generate Prisma client + run migrations
npm run db:reset     # Reset database (destructive)
```

## Architecture

### Core Data Flow

```
User Chat Input → /api/chat → Claude AI → Tool Calls → Virtual File System → Preview Iframe
```

1. **Chat API** (`src/app/api/chat/route.ts`): Streams Claude responses, provides two tools (`str_replace_editor`, `file_manager`), saves projects to DB on completion
2. **Virtual File System** (`src/lib/file-system.ts`): In-memory file tree - all generated code lives here, never written to disk
3. **File System Context** (`src/lib/contexts/file-system-context.tsx`): React context that wraps VFS, executes tool calls from Claude, triggers UI updates
4. **JSX Transformer** (`src/lib/transform/jsx-transformer.ts`): Uses Babel to transpile JSX to executable JS for the preview iframe
5. **Preview Frame** (`src/components/preview/PreviewFrame.tsx`): Sandboxed iframe that renders generated components with Tailwind

### Claude Tool Integration

Claude generates code via two tools defined in `src/lib/tools/`:
- `str_replace_editor`: view, create, str_replace, insert operations on files
- `file_manager`: rename, delete operations

The system prompt in `src/lib/prompts/generation.tsx` instructs Claude how to use these tools.

### Authentication

JWT-based auth with http-only cookies. Server actions in `src/actions/index.ts` handle signup/signin/signout. Middleware (`src/middleware.ts`) protects API routes.

### Mock Provider

When `ANTHROPIC_API_KEY` is not set, `src/lib/provider.ts` returns a mock provider that generates demo components for testing without API access.

## Key Files

- `src/app/api/chat/route.ts` - Main AI endpoint with streaming and tool execution
- `src/lib/file-system.ts` - Virtual file system implementation
- `src/lib/contexts/file-system-context.tsx` - State management for files
- `src/lib/transform/jsx-transformer.ts` - JSX to HTML transformation
- `src/components/preview/PreviewFrame.tsx` - Live preview rendering
- `prisma/schema.prisma` - Database schema (User, Project models)

## Code Style

- Use comments sparingly. Only comment complex code.

## Environment Variables

- `ANTHROPIC_API_KEY` - Optional; enables real AI generation (uses mock otherwise)
- `JWT_SECRET` - Defaults to "development-secret-key"
