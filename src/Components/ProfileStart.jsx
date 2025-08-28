import { useNavigate } from "react-router-dom";

export const ProfileStart = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-y-auto"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/wedding-couple-pink-and-white-roses-xjc8hkj2q7qqfhho.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70" />

      <div className="relative z-10 w-full max-w-4xl flex flex-col justify-between min-h-screen px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center text-center text-white">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/047/937/290/small/realistic-wedding-rings-with-flowers-element-free-png.png"
            alt="Wedding Rings"
            className="w-28 sm:w-32 md:w-40 lg:w-44 mx-auto mb-6"
          />

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-[Dancing Script] mb-6 drop-shadow-lg leading-tight">
            Welcome to{" "}
            <span className="text-pink-500 font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              SkyCouple
            </span>{" "}
            Matrimony
          </h1>

          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-200 drop-shadow mb-6 max-w-2xl">
            Find your perfect life partner. Trusted by thousands. Begin your
            journey to love today.
          </p>

          <p className="text-xs sm:text-sm opacity-70 mb-6">
            © 2025 Shaikh Faizan
          </p>
        </div>

        <div className="mt-auto flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="
      bg-pink-700 hover:bg-pink-600 text-white font-semibold 
      py-2 px-6 text-base rounded-full shadow transition duration-300 
      w-3/4 sm:w-auto mb-20 sm:mb-0
    "
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
