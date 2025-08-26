import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import flowbiteReact from "flowbite-react/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: '/',   // ✅ For Vercel deployment (root)
  plugins: [react(), flowbiteReact(), tailwindcss()]
});
