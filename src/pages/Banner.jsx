
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    img: "https://i.ibb.co/5xvrxqsp/01.jpg",
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
    img: "https://i.ibb.co/vCYH8VHH/03.jpg",
    title: "Be a Champion, Run Today",
    desc: "Don’t just run, inspire others. Start your journey now.",
    btnText: "Join Now",
    btnStyle: "btn-secondary",
  },
];

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-[300px] md:h-[400px] lg:h-[500px] mb-8"
    >
      {slides.map((s) => (
        <SwiperSlide key={s.id}>
          <div className="relative w-full h-full">
            {/* মূল ব্যাকগ্রাউন্ড ইমেজ */}
            <img
              src={s.img}
              alt={`slide-${s.id}`}
              className="w-full h-full object-cover"
            />

            {/* গ্রেডিয়েন্ট ওভারলে */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

            {/* টেক্সট ও CTA */}
            <div className="absolute  left-5 md:left-16 top-1/4 text-white space-y-4 max-w-md z-10">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
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
  );
};

export default Banner;
