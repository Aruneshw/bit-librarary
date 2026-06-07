# ARC_OS Academic Nexus — Deployment Guide

This document describes how to deploy the database, frontend, and backend for the ARC_OS Academic Nexus, using the credentials you provided.

---

## 1. Database Setup (Supabase)

To initialize your tables, RLS policies, and triggers:

1. Go to your **Supabase Dashboard** for the project `wyczuyicyswcdsrcbfwa`.
2. Click on the **SQL Editor** tab in the left sidebar.
3. Click **New query**.
4. Open the [schema.sql](file:///mnt/FDrive/bit-library/database/schema.sql) file. Copy its entire content and paste it into the editor.
5. Click **Run**. This will create the database tables (`profiles`, `subjects`, `questions`, `question_views`, `settings`) and the automatic user signup trigger.
6. Open the [seed.sql](file:///mnt/FDrive/bit-library/database/seed.sql) file. Copy its content, paste it into the editor, and click **Run**. This will populate the subjects and the sample questions bank.

---

## 2. Authentication Setup (Supabase)

Because the specification mandates authentication with a `@bitsathy.ac.in` domain, we use **Google OAuth**:

1. In the **Supabase Dashboard**, navigate to **Authentication** > **Providers** > **Google**.
2. **Enable** the Google provider.
3. Retrieve your **Client ID** and **Client Secret** from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials):
   - Create a Web Application credential.
   - Set the Authorized Redirect URI to the URL provided in the Supabase Google Provider dashboard (e.g. `https://wyczuyicyswcdsrcbfwa.supabase.co/auth/v1/callback`).
4. Paste the **Client ID** and **Client Secret** into your Supabase Google Auth configurations.
5. Save the configuration.

---

## 3. Pushing Code to GitHub

To push the codebase to your GitHub account:

1. Open a terminal on your local system in the root directory `/mnt/FDrive/bit-library/`.
2. Rename the default branch to `main`:
   ```bash
   git branch -M main
   ```
3. Add your remote GitHub repository:
   ```bash
   git remote add origin <your-github-repository-url>
   ```
4. Push the code:
   ```bash
   git push -u origin main
   ```

---

## 4. Deploying Frontend to Vercel

To deploy your frontend to Vercel:

1. In the **Vercel Dashboard**, click **Add New** > **Project**.
2. Import your GitHub repository.
3. Configure the project parameters:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` (Ensure you edit this setting, since Next.js is located in the nested `frontend` folder)
4. Add the following **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://wyczuyicyswcdsrcbfwa.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Y3p1eWljeXN3Y2RzcmNiZndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NDA5MzQsImV4cCI6MjA5NjQxNjkzNH0.GKFfZB7cTWxS46l3xxgvCxCsmLUXoRm6_xgfDuFz_Ek`
   - `NEXT_PUBLIC_API_URL` = `<your-deployed-backend-url>/api/v1` (Note: Update this value after deploying the backend)
5. Click **Deploy**.

---

## 5. Deploying Backend to Render or Koyeb

Since Next.js App Router runs purely on the edge / serverless on Vercel, the Express backend should be deployed to a persistent server provider (like Render, Railway, or Koyeb):

1. Connect your repository to your server hosting provider.
2. Select Root Directory as `backend`.
3. Set the build command to `npm run build` and start command to `npm start`.
4. Add the following **Environment Variables**:
   - `SUPABASE_URL` = `https://wyczuyicyswcdsrcbfwa.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Y3p1eWljeXN3Y2RzcmNiZndhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg0MDkzNCwiZXhwIjoyMDk2NDE2OTM0fQ.Veb8jTE4khhnJUQBeauhr41pIXN1OlJk4oXakhkuCGw`
   - `CORS_ORIGIN` = `<your-deployed-vercel-frontend-url>`
