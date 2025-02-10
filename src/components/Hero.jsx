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

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        const videoElement = nextVdRef.current;
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (videoElement) {
              videoElement.pause(); // Prevent any ongoing play actions
              videoElement.currentTime = 0; // Reset playback
              videoElement.play().catch((error) => {
                console.error("Video play failed:", error);
              });
            }
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

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

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
      {/* Hidden image layer */}
      <div className="hidden-image absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
        <div
          style={{
            clipPath: `circle(100px at ${mousePosition.x}px ${mousePosition.y}px)`,
          }}
        >
          <img
            src="/your-hidden-image.jpg"
            alt="Hidden"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
          PORTFOLIO
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-16 sm:mt-24 px-4 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 
              text-4xl sm:text-6xl md:text-7xl lg:text-9xl 
              leading-tight tracking-tight"
            >
              David <b>Oyelade</b>
            </h1>

            <p className="mb-8 max-w-md font-robert-regular text-blue-100 
              text-base sm:text-lg md:text-xl 
              leading-relaxed tracking-wide"
            >
              Full Stack Software Engineer <br className="hidden sm:block" />
              Building high-performance web and mobile applications with AI integration
            </p>

            <div className="flex items-center gap-4">
              <Button
                title="View Projects"
                leftIcon={<TiLocationArrow />}
                onClick={(e) => handleScroll(e, '#projects', -50)}
                containerClass="bg-yellow-300 text-black"
              />
              <Button
                title="Contact Me"
                onClick={(e) => handleScroll(e, '#contact', -50)}
                containerClass="bg-white/10 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
        PORTFOLIO
      </h1>
    </div>
  );
};

export default Hero;
