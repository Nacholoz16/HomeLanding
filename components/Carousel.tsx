import React, { useState, useEffect } from "react";

interface Slide {
    image: string;
    title: string;
    description: string;
}

interface CarouselProps {
    slides: Slide[];
    interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(timer);
    }, [slides.length, interval]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-lg">
            {/* Contenedor de slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        {/* Imagen */}
                        <img
                            src={slide.image}
                            alt={`slide-${index}`}
                            className="w-full h-[35rem] sm:h-[40rem] object-cover"
                        />

                        {/* Gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0"></div>

                        {/* Texto */}
                        <div className="absolute bottom-10 left-6 text-white z-10 max-w-xl sm:max-w-2xl p-5 text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p className="mt-2 text-sm sm:text-lg drop-shadow-md">
                                {slide.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botones */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/0 p-3 rounded-full hover:bg-black/60 transition"
            >
                ◀
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/0 p-3 rounded-full hover:bg-black/60 transition"
            >
                ▶
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
