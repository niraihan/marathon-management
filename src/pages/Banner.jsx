import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co/TqpjK8Ks/steward-masweneng-QITAa-HY1vo-Y-unsplash.jpg",
    title: "Join the Ultimate Marathon",
    desc: "Push your limits and run with passion. Be a part of history!",
    btnText: "Register Now",
    btnStyle: "btn-primary",
  },
  {
    id: 2,
    img: "https://i.ibb.co/YHC6n7n/rr.jpg",
    title: "Experience the Thrill of the Run",
    desc: "Thousands of runners. One goal. Endless memories.",
    btnText: "Explore Now",
    btnStyle: "btn-accent",
  },
  {
    id: 3,
    img: "https://i.ibb.co/84NHN78v/steven-lelham-at-Sa-EOe-E8-Nk-unsplash.jpg.jpg",
    title: "Be a Champion, Run Today",
    desc: "Don’t just run, inspire others. Start your journey now.",
    btnText: "Join Now",
    btnStyle: "btn-secondary",
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={s.img}
                alt={`slide-${s.id}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Text & CTA */}
              <div className="absolute left-5 md:left-16 top-1/3 transform -translate-y-1/3 text-white space-y-4 max-w-md z-10">
                <h2 className="text-3xl md:text-5xl font-bold drop-shadow">
                  {s.title}
                </h2>
                <p className="text-sm md:text-lg">{s.desc}</p>
                {/* <a href="/register" className={`btn ${s.btnStyle}`}>
                  {s.btnText}
                </a> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
