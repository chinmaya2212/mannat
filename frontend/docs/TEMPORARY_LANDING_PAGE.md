# Temporary Landing Page Knowledge

**Purpose**: This document tracks the implementation of the temporary landing page and provides instructions on how to remove it and revert the application back to its original state when it is no longer needed.

## Changes Made
To support a clean landing page without the application's sidebar and top navigation, the following Next.js Route Group restructuring was performed:
1. Created `src/app/(app)/layout.tsx` to house the `Sidebar` and `TopNav`.
2. Moved all dashboard and feature routes (e.g., `/dashboard`, `/lineage`, `/catalog`) inside `src/app/(app)/`.
3. Stripped the `Sidebar` and `TopNav` from the root `src/app/layout.tsx`.
4. Created a new `src/app/page.tsx` which acts as the temporary landing page with a visitor form that redirects to `/dashboard`.

## How to Remove the Temporary Landing Page
When you are ready to remove the landing page and make the Dashboard the default root (`/`) again, follow these steps:

1. **Delete the Landing Page**:
   - Delete the file `src/app/page.tsx`.

2. **Revert the Dashboard**:
   - Move `src/app/(app)/dashboard/page.tsx` back to the root `src/app/page.tsx`.
   - Delete the `src/app/(app)/dashboard` folder.

3. **Revert the Layout**:
   - Open `src/app/layout.tsx` and re-add `<Sidebar />` and `<TopNav />` inside the `<body>` tag, replicating the structure currently found in `src/app/(app)/layout.tsx`.
   - Delete the file `src/app/(app)/layout.tsx`.

4. **Flatten the Routes (Optional but recommended)**:
   - Move all folders inside `src/app/(app)/` (e.g., `admin`, `catalog`, `lineage`, etc.) back up to `src/app/`.
   - Delete the empty `src/app/(app)` folder.

5. **Update Sidebar Navigation**:
   - In `src/components/layout/Sidebar.tsx`, change the `Dashboard` link `href` back to `"/"` (from `"/dashboard"`).

Following these steps will completely remove the temporary landing page and restore the original enterprise platform routing.
