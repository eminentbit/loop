/** @type {import('tailwindcss').Config} */
export default{
  darkMode: 'dark',
  content: [
    "./src/**/*.{js,jsx,}",
    "./public/index.html", // Include HTML files
  ],
}
export const content = [
  "./src/**/*.{js,jsx}", // Add JSX support
];
export const theme = {
  extend: {},
};
export const plugins = [];
