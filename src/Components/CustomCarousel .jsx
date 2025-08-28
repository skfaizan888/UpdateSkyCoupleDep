import React, { useEffect, useState } from "react";

const CustomCarousel = ({ images = [], interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = (Array.isArray(images) ? images : [images]).map((i) =>
    typeof i === "string"
      ? { img: i, gender: "male" }
      : { img: i.img || "", gender: i.gender || "male" }
  );

  const fallback = (item) =>
    item.gender?.toLowerCase().trim() === "female"
      ? "https://cdn-icons-png.flaticon.com/512/195/195072.png"
      : "https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png";

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((c) => (c + 1) % slides.length),
      interval
    );
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const current = slides[currentIndex];
  const src = (current.img || "").toString().trim()
    ? current.img
    : fallback(current);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-gray-200">
      <img
        src={src}
        alt={current.fullname || `Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        onError={(e) => (e.currentTarget.src = fallback(current))}
      />

      <button
        onClick={() =>
          setCurrentIndex((c) => (c === 0 ? slides.length - 1 : c - 1))
        }
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((c) => (c + 1) % slides.length)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;
