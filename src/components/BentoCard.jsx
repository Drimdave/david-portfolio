import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { motion } from "framer-motion";

const BentoCard = ({ src, title, description, isComingSoon, isLive, projectLink, githubLink, techStack = [], isImage = false }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    const buttonVariants = {
        initial: {
            scale: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        hover: {
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        tap: {
            scale: 0.98,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
        }
    };

    const iconVariants = {
        initial: { x: 0 },
        hover: {
            x: 5,
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.6,
            },
        },
        tap: { x: 3 }
    };

    return (
        <div className="group relative size-full flex overflow-hidden">
            {/* Content Side */}
            <div className="relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-8">
                {/* Title and Description */}
                <div>
                    <h1 className="bento-title special-font text-3xl sm:text-4xl md:text-5xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-3 max-w-md text-sm sm:text-base 
                            font-medium text-blue-50/80 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Buttons and Tech Stack */}
                {isLive && (
                    <div className="flex flex-col gap-4 mt-4">
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 text-xs rounded-full bg-blue-50/10 
                                        text-blue-50/70 backdrop-blur-sm border border-blue-50/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Visit Site Button */}
                        <motion.a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit border-hsla group flex items-center gap-2 rounded-full 
                                bg-black/30 px-5 py-2.5 text-sm uppercase text-blue-50/90 
                                backdrop-blur-sm border border-blue-50/20 hover:border-blue-50/40 
                                transition-colors active:text-blue-50"
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <motion.span
                                className="relative z-10 flex items-center gap-2"
                                variants={iconVariants}
                            >
                                Visit Site
                                <TiLocationArrow className="text-lg transition-transform" />
                            </motion.span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r 
                                from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity 
                                duration-300 group-hover:opacity-100 group-active:opacity-100 blur-sm" />
                        </motion.a>
                    </div>
                )}
            </div>

            {/* Image Side */}
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
                {isImage ? (
                    <img
                        src={src}
                        alt={title}
                        className="h-full w-full object-cover object-center transition-transform 
                            duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                ) : (
                    <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        className="h-full w-full object-cover object-center transition-transform 
                            duration-500 group-hover:scale-110"
                    />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black to-black/50 -z-10" />
        </div>
    );
};

export default BentoCard; 