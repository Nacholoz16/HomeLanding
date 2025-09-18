import React, { useState, useEffect } from "react";

interface Slide {
    image: string;

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
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />

                    </div>
                ))}
            </div>

            {/* Botones */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/0 p-3 rounded-full hover:bg-white/50 transition"
            >
                ◀
            </button>
            <button
                onClick={nextSlide}
                className=" absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/0 p-3 rounded-full hover:bg-white/50 transition"
            >
                ▶
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
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
