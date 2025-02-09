import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorOuterRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power3.out"
            });

            gsap.to(cursorOuterRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power3.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to([cursorRef.current, cursorOuterRef.current], {
                scale: 1,
                opacity: 1,
                duration: 0.3
            });
        };

        const handleMouseLeave = () => {
            gsap.to([cursorRef.current, cursorOuterRef.current], {
                scale: 0,
                opacity: 0,
                duration: 0.3
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed z-50 pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
            >
                <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <div
                ref={cursorOuterRef}
                className="fixed z-50 pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
            >
                <div className="w-8 h-8 border border-white rounded-full" />
            </div>
        </>
    );
};

export default CustomCursor; 