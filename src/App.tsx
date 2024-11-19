import { useRef, useState } from "react";
import { motion } from "framer-motion";
import StarIcon from "./StarIcon";

interface CardProps {
  title: string;
  price: number;
}

function App({ title, price }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOnButton, setIsOnButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });

      const target = event.target as HTMLElement;
      const isAddToCartButton =
        target.tagName.toLowerCase() === "a" &&
        target.textContent?.trim() === "Add to cart";
      setIsOnButton(isAddToCartButton);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        ref={cardRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="w-full max-w-sm bg-white border hover:cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="p-8 rounded-t-lg"
              src="/apple-watch.png"
              alt="product image"
            />
          </a>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <StarIcon filled={true} />
                <StarIcon filled={true} />
                <StarIcon filled={true} />
                <StarIcon filled={true} />
                <StarIcon />
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {`$${price}`}
              </span>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute pointer-events-none w-24 h-24 bg-white bg-opacity-50 rounded-full flex items-center justify-center text-md font-medium text-black shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered && !isOnButton ? 1 : 0,
            scale: isHovered && !isOnButton ? 1 : 0.8,
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            x: { type: "spring", stiffness: 1000, damping: 50 },
            y: { type: "spring", stiffness: 1000, damping: 80 },
          }}
          style={{
            top: 0,
            left: 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <span className="text-center">View</span>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
