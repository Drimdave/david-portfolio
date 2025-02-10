// Hero.jsx

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
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

  const videoUrls = [
    "https://res.cloudinary.com/dzihom5jb/video/upload/v1739181160/hero-1_hznmfy.mp4",
    "https://res.cloudinary.com/dzihom5jb/video/upload/v1739181150/hero-2_wddwtr.mp4",
    "https://res.cloudinary.com/dzihom5jb/video/upload/v1739181022/hero-3_vav6yo.mp4",
    "https://res.cloudinary.com/dzihom5jb/video/upload/v1739181431/hero-4_rhzvlb.mp4",
  ];

  // Function to get the current video URL
  const getVideoSrc = (index) => {
    const url = videoUrls[(index - 1) % videoUrls.length];
    console.log("Current video src:", url); // Debug log
    return url;
  };

  // Update loadedVideos when a video is successfully loaded
  const handleVideoLoad = () => {
    console.log("Video loaded"); // Debug log
    setLoadedVideos((prev) => prev + 1);
  };

  // Triggered when all videos are loaded
  useEffect(() => {
    console.log("Loaded videos:", loadedVideos); // Debug log
    if (loadedVideos === totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Handle click event for video interaction
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // Add animations for GSAP (can temporarily disable for debugging)
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

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading spinner */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Video frame */}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        {/* Current video */}
        <video
          src={getVideoSrc(currentIndex)}
          muted
          autoPlay
          loop
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        />

        {/* Next video for animation */}
        <video
          ref={nextVdRef}
          src={getVideoSrc((currentIndex % totalVideos) + 1)}
          muted
          autoPlay
          loop
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        />
      </div>

      {/* Hero text */}
      <div className="absolute left-0 top-0 z-40 size-full">
        <div className="mt-16 sm:mt-24 px-4 sm:px-10">
          <h1 className="special-font hero-heading text-blue-100 text-4xl sm:text-6xl md:text-7xl lg:text-9xl leading-tight tracking-tight">
            David <b>Oyelade</b>
          </h1>

          <p className="mb-8 max-w-md font-robert-regular text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide">
            Full Stack Software Engineer <br className="hidden sm:block" />
            Building high-performance web and mobile applications with AI integration
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Button
              title="View Projects"
              onClick={() => console.log("View Projects clicked")} // Example action
              containerClass="bg-yellow-300 text-black"
            />
            <Button
              title="Contact Me"
              onClick={() => console.log("Contact Me clicked")} // Example action
              containerClass="bg-white/10 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
