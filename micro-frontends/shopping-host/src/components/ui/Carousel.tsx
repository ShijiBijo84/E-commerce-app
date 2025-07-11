
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
type ImageProps = {
    image: string
}

const Carousel = ({ images }: { images: ImageProps[] }) => {
    const [current, setCurrent] = useState<number>(0)

    const previousImage = () => {
        if (current == 0) setCurrent(images.length - 1)
        else setCurrent(current - 1)
    }
    const nextImage = () => {
        if (current == images.length - 1) setCurrent(0)
        else setCurrent(current + 1)
    }

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform ease-out duration-40"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <div key={index} className="min-w-full">
                            <img
                                src={img.image}
                                alt={`image-${index}`}
                                className="w-full max-h-[300px] object-contain rounded shadow"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex absolute top-0 justify-between items-center h-full w-full px-3 text-2xl">
                    <button>
                        <FaArrowAltCircleLeft onClick={previousImage} />
                    </button>
                    <button>
                        <FaArrowAltCircleRight onClick={nextImage} />
                    </button>
                </div>
            </div>

            {/* Dots container outside the relative image container */}
            <div className="flex py-4 gap-2 w-full justify-center">
                {images.map((_, index) => (
                    <div
                        onClick={() => setCurrent(index)}
                        className={`rounded-full w-3 h-3 cursor-pointer ${index === current ? "bg-orange-400" : "bg-gray-400"
                            }`}
                        key={`circle-${index}`}
                    />
                ))}
            </div>
        </div>
    );

}
export default Carousel