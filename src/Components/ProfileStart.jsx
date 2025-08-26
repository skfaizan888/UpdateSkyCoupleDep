import { useNavigate } from "react-router-dom";

export const ProfileStart = () => {
  // const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          // "url('https://wallpapers.com/images/hd/wedding-couple-pink-and-white-roses-xjc8hkj2q7qqfhho.jpg')",
          "url('Public/Image/bouquet-roses-4k.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col justify-between min-h-screen px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center text-center text-white">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/047/937/290/small/realistic-wedding-rings-with-flowers-element-free-png.png"
            alt="Wedding Rings"
            className="w-40 sm:w-36 md:w-40 lg:w-44 mx-auto mb-6"
          />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[Dancing Script] mb-6 drop-shadow-lg leading-tight">
            Welcome to <span className="text-pink-500">SkyCouple</span>{" "}
            Matrimony
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-200 drop-shadow mb-6 max-w-xl">
            Find your perfect life partner. Trusted by thousands. Begin your
            journey to love today.
          </p>

          <p className="text-xs sm:text-sm opacity-70 mb-6">
            © 2025 Shaikh Faizan
          </p>
        </div>

        <div className="mt-auto flex justify-center">
          <button
            // onClick={() => navigate("/login")}
            className="bg-pink-700 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full text-lg shadow transition duration-300 w-full sm:w-auto"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
