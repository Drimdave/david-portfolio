// Hero.jsx

import gsap from "gsap";
import { useEffect, useState } from "react";
import Button from "./Button";

gsap.registerPlugin();

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const videoUrls = [
    "https://res.cloudinary.com/dzihom5jb/video/upload/v1739181160/hero-1_hznmfy.mp4", // Video 1
    "https://res.cloudinary.com/dzihom5jb/video/upload/v1739181150/hero-2_wddwtr.mp4", // Video 2
  ];

  // Get the current video source
  const getVideoSrc = (index) => {
    const url = videoUrls[(index - 1) % videoUrls.length];
    console.log("Current video src:", url); // Debugging
    return url;
  };

  // Handle video load and update loading state
  const handleVideoLoad = () => {
    console.log("Video loaded"); // Debugging
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    console.log("Loaded videos:", loadedVideos); // Debugging
    if (loadedVideos === videoUrls.length) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // Handle click to switch between videos
  const handleVideoClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex % 2) + 1);
  };

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
          playsInline
          autoPlay
          loop
          className="absolute left-0 top-0 size-full object-cover object-center"
          style={{ visibility: "visible", opacity: 1 }}
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
              title="Switch Video"
              onClick={handleVideoClick} // Switch between video 1 and 2
              containerClass="bg-yellow-300 text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
