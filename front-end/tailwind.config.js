/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./frontend/**/*.{js,jsx}"    // Include frontend files
  ],
  theme: {
    fontFamily: {
      display: ["Poppins","sans-serif"],
    },
    extend: {
      // Colors used in this Project
      colors: {
        primary: "#05B6D3",
        secondary: "#EF863E",
      },
      backgroundImage: {
        'login-bg-img': "url('/Images/bg-img.jpg')",
        'signup-bg-img': "url('/Images/signup-bg-img.jpeg')",
      }
    },
  },
  plugins: [],
}

