// tailwind.config.js
const tailwindConfig = {
    theme: {
      extend: {
        keyframes: {
          slide: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
        animation: {
          slide: 'slide 1.5s linear infinite',
        },
      },
    },
    variants: {},
    plugins: [],
  };

export { tailwindConfig };
  
  import logoLoop from "../assets/logo-loop.jpg";
  

  export default function LoadingScreen() {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo with pulse animation */}
          <img
            src={logoLoop}
            alt="LOOP-0S Logo"
            className="w-32 h-32 object-contain animate-pulse"
          />
  
          {/* Horizontal loader bar */}
          <div className="relative w-64 h-1 bg-gray-200 overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 w-1/3 bg-blue-500 animate-slide"
              aria-label="Loading indicator"
            />
          </div>
          
        </div>
      </div>
    );
  }
  