// src/app/types/category.ts
export type Category = {
  id: string;
  name: string;
  slug: string;
  color: string;      // Tailwind text color class, e.g., "text-primary", "text-green-600"
  pillClass: string;  // CSS background pill class, e.g., "category-politics" or custom Tailwind classes
  gradient: string;   // Tailwind gradient background class, e.g., "bg-gradient-to-r from-primary to-accent"
  icon: string;       // Emoji or unicode icon, e.g., "🏛️"
  createdAt: string;
  updatedAt: string;
};
