"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import NewsCard from "@/components/NewsCard";

interface SliderData {
  id: string;
  judul: string;
  konten: string | null;
  gambar: string | null;
  link: string | null;
  tipe: string;
  dibuat: string;
}

export default function HeroSlider({ sliders }: { sliders: SliderData[] }) {
  const newsItems = sliders.map((slider) => ({
    title: slider.judul,
    date: new Date(slider.dibuat).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    image:
      slider.gambar ||
      "https://images.unsplash.com/photo-5000382017468-9049fed747ef?w=800&q=80",
    link: slider.link,
  }));

  if (newsItems.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="pb-12"
    >
      {newsItems.map((item, index) => (
        <SwiperSlide key={index}>
          <NewsCard
            title={item.title}
            date={item.date}
            image={item.image}
            link={item.link}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
