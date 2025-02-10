import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 2; // Restrict to two videos
  const nextVdRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Function to get the video source
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // Increment loaded videos count on load
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Update loading state when all videos are loaded
  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Handle video switch on click
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1); // Toggle between video 1 and 2
  };

  // GSAP animations for video transitions
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // GSAP animations for video frame on scroll
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Smooth scroll to sections
  const handleScroll = (e, targetId, offset = -100) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden" onMouseMove={handleMouseMove}>
      {/* Video frame */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {loading && (
          <img
            src="/img/gallery-2.webp" // Placeholder image
            alt="Loading placeholder"
            className="absolute left-0 top-0 w-full h-full object-cover"
          />
        )}

        {!loading && (
          <video
            src={getVideoSrc(currentIndex)}
            muted
            playsInline
            autoPlay
            loop
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        )}
      </div>

      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-16 sm:mt-24 px-4 sm:px-10">
          <h1
            className="special-font hero-heading text-blue-100 text-4xl sm:text-6xl md:text-7xl lg:text-9xl 
              leading-tight tracking-tight"
          >
            David <b>Oyelade</b>
          </h1>

          <p
            className="mb-8 max-w-md font-robert-regular text-blue-100 text-base sm:text-lg md:text-xl 
              leading-relaxed tracking-wide"
          >
            Full Stack Software Engineer <br className="hidden sm:block" />
            Building high-performance web and mobile applications with AI integration
          </p>

          <div className="flex items-center gap-4">
            <Button
              title="View Projects"
              leftIcon={<TiLocationArrow />}
              onClick={(e) => handleScroll(e, "#projects", -50)}
              containerClass="bg-yellow-300 text-black"
            />
            <Button
              title="Contact Me"
              onClick={(e) => handleScroll(e, "#contact", -50)}
              containerClass="bg-white/10 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
