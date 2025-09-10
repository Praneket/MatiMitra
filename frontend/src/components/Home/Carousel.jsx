// 📁 src/components/Carousel.jsx
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Hero from "./Hero";

const slides = [
  { type: "component", content: <Hero /> },
  { type: "image", content: "/img1.webp" },
  { type: "image", content: "/img2.png" },
  { type: "image", content: "/img3.jpg" },
  { type: "image", content: "/img5.jpg" },
];

const Carousel = () => {
  const swiperRef = useRef(null);
  const stopAutoplay = () => {
    const swiper = swiperRef.current;
    if (swiper?.autoplay?.running) {
      swiper.autoplay.stop();
      console.log("⛔ Autoplay stopped by user interaction");
    }
  };

  return (
    <div className="w-full  mx-auto mt-4 rounded overflow-hidden ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            {slide.type === "component" ? (
              <div onClick={stopAutoplay}>{slide.content}</div>
            ) : (
              <img
                onClick={stopAutoplay}
                src={slide.content}
                alt={`Slide ${i}`}
                className="w-full h-[calc(100vh-64px)] object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
