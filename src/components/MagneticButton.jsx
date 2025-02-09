import { useRef, useEffect } from "react";
import gsap from "gsap";

const MagneticButton = ({ children, className = "", scale = 1.2 }) => {
    const buttonRef = useRef(null);
    const boundingRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        const bounding = boundingRef.current;
        let magneticArea = { x: 0, y: 0 };

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = bounding.getBoundingClientRect();

            const x = (clientX - (left + width / 2)) * 0.35;
            const y = (clientY - (top + height / 2)) * 0.35;

            magneticArea = { x, y };

            gsap.to(button, {
                x: magneticArea.x,
                y: magneticArea.y,
                duration: 0.2,
                ease: "power3.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to(button, {
                scale,
                duration: 0.3,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(button, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power3.out"
            });
        };

        bounding.addEventListener("mousemove", handleMouseMove);
        bounding.addEventListener("mouseenter", handleMouseEnter);
        bounding.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            bounding.removeEventListener("mousemove", handleMouseMove);
            bounding.removeEventListener("mouseenter", handleMouseEnter);
            bounding.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [scale]);

    return (
        <div ref={boundingRef} className="p-8">
            <div ref={buttonRef} className={className}>
                {children}
            </div>
        </div>
    );
};

export default MagneticButton; 