
# 🏙️ CivicTrack

CivicTrack is an open-source, public good platform that empowers citizens to report, map, and prioritize local civic issues. It's built to be easily cloned, configured, and deployed by any community or local government.

### The Problem

In many communities, reporting problems like potholes, broken streetlights, or trash buildup is a confusing process. There's no single place to see what has already been reported, and no way for the community to visualize which problems are the most urgent.

### The Solution

This app solves that by providing a simple, three-part solution:

1.  **Report:** A simple, mobile-friendly form to submit a complaint. It automatically reverse-geocodes the user's clicked location to find the neighborhood name.
2.  **Map:** A live, interactive map that displays all submitted issues as pins for everyone to see.
3.  **Prioritize:** A public dashboard that automatically identifies and ranks the most common issues (e.g., "Potholes") and the "hotspot" neighborhoods with the most reports, giving leaders a clear, data-driven path for action.

-----

## 🧰 Tech Stack

  * **Framework:** Next.js (App Router)
  * **Styling:** Tailwind CSS
  * **Database:** Supabase (Postgres)
  * **File Storage:** Supabase Storage (for photo uploads)
  * **Maps:** React Leaflet (Open Source)
  * **Charts:** Recharts (Open Source)

-----

## 🚀 Getting Started

To run this project for your own community, follow these steps:

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/civic-track.git
cd civic-track
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Set Up Supabase

1.  Go to [supabase.com](https://supabase.com/) and create a new free project.
2.  **Database:** Go to the **SQL Editor** and run the query in `setup.sql` (you'll need to create this file) to create your `complaints` table.
3.  **Storage:** Go to the **Storage** section, create a new **public bucket** named `complaint_images`, and add policies to allow `INSERT` and `SELECT` for the `anon` role.

### 4\. Set Up Environment Variables

1.  In your Supabase project, go to **Settings \> API**.

2.  Create a file named `.env.local` in the root of your project.

3.  Copy and paste your keys into the file:

    ```.env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL_HERE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
    ```

### 5\. Run the Development Server

```bash
npm run dev
```

Your app is now running at `http://localhost:3000`.

-----

## ⚙️ Configuration

To make this app your own, there are two key places to customize:

### 1\. Set Your Community's Map Location

You can set the default map center and zoom level for your specific town, state, or country.

  * Open `components/MapPicker.tsx`
  * Open `components/LiveMap.tsx`

In both files, find the `CUSTOMIZE MAP LOCATION` comment block and change the `defaultCenter` and `defaultZoom` variables to match your region.

```javascript
// Example for Oyo State, Nigeria:
const defaultCenter: [number, number] = [7.3775, 3.9470];
const defaultZoom = 9;
```

### 2\. Customize Complaint Categories

To change the types of issues users can report, edit the `<option>` tags in the submission form.

  * Open `components/SubmitForm.tsx`
  * Find the `<select>` tag with the `id="category"` and add, remove, or edit the `<option>` values.

<!-- end list -->

```html
<select id="category" ...>
  <option value="" disabled>Select a category</option>
  <option value="Pothole">Pothole</option>
  <option value="Trash Buildup">Trash Buildup</option>
  </select>
```