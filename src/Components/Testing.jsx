import React from "react";
import CustomCarousel from "./CustomCarousel ";

const Testing = () => {
  const images = [
    "https://thumbs.dreamstime.com/b/portrait-handsome-young-hispanic-man-outdoors-looking-camera-sitting-outside-modern-house-209149232.jpg",
    "https://freedesignfile.com/upload/2017/01/Handsome-man-HD-picture-09.jpg",
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  ];

  return (
    <div className="max-w-md mx-auto mt-10">
      <CustomCarousel images={images} interval={3000} />
    </div>
  );
};

export default Testing;
