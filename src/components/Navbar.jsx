import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import MagneticButton from "./MagneticButton";
import { useActiveSection } from '../hooks/useActiveSection';
import { motion } from 'framer-motion';

const navItems = [
  {
    label: "About",
    href: "#about",
    offset: -100
  },
  {
    label: "Projects",
    href: "#projects",
    offset: -50
  },
  {
    label: "Experience",
    href: "#story",
    offset: -50
  },
  {
    label: "Contact",
    href: "#contact",
    offset: -50
  }
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);
  const hasAttemptedAutoplay = useRef(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!audioElementRef.current || hasAttemptedAutoplay.current) return;

    const initAudio = async () => {
      try {
        audioElementRef.current.volume = 0.3;
        await audioElementRef.current.play();
        setIsAudioPlaying(true);
        setIsIndicatorActive(true);
      } catch (error) {
        console.log("Autoplay prevented - waiting for user interaction");
      }
      hasAttemptedAutoplay.current = true;
    };

    initAudio();

    const handleUserInteraction = async () => {
      if (!isAudioPlaying && audioElementRef.current) {
        try {
          await audioElementRef.current.play();
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
        } catch (error) {
          console.error("Audio playback failed:", error);
        }
      }
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event =>
      document.addEventListener(event, handleUserInteraction, { once: true })
    );

    return () => {
      events.forEach(event =>
        document.removeEventListener(event, handleUserInteraction)
      );
    };
  }, []);

  const toggleAudioIndicator = async () => {
    if (!audioElementRef.current) return;

    try {
      if (isAudioPlaying) {
        audioElementRef.current.pause();
        setIsAudioPlaying(false);
        setIsIndicatorActive(false);
      } else {
        await audioElementRef.current.play();
        setIsAudioPlaying(true);
        setIsIndicatorActive(true);
      }
    } catch (error) {
      console.error("Audio toggle failed:", error);
    }
  };

  const handleNavClick = (e, href, offset = 0) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false); // Close mobile menu after click
  };

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-4 transition-all duration-300 sm:px-10 
        ${isScrolled ? "bg-black/50 backdrop-blur-md" : ""}`}
      >
        {/* Logo/Name */}
        <MagneticButton>
          <a href="#" className="font-zentry text-xl font-bold text-blue-100">
            DO
          </a>
        </MagneticButton>

        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          {navItems.map((item) => (
            <MagneticButton key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.offset)}
                className={`nav-hover-btn relative ${activeSection === item.href.slice(1)
                  ? 'text-blue-100'
                  : 'text-blue-100/60 hover:text-blue-100'
                  }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </MagneticButton>
          ))}

          {/* Audio Toggle */}
          <button
            onClick={toggleAudioIndicator}
            className="ml-10 flex items-center space-x-0.5 group"
          >
            <span className="mr-2 text-blue-100 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isAudioPlaying ? 'Sound On' : 'Sound Off'}
            </span>
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={clsx("indicator-line bg-blue-100", {
                  active: isIndicatorActive,
                })}
                style={{
                  animationDelay: `${bar * 0.1}s`,
                }}
              />
            ))}
          </button>

          {/* Resume Button */}
          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-10 rounded-full border border-blue-100 px-4 py-2 text-sm text-blue-100 transition-colors hover:bg-blue-100 hover:text-black"
            >
              Resume
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-blue-100 text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </nav>

      {/* Mobile Menu - Separate from nav */}
      <div
        className={`
          fixed inset-0 z-40 
          bg-gradient-to-b from-black/95 via-blue-900/95 to-black/95
          backdrop-blur-md
          transition-all duration-500 ease-in-out
          ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          md:hidden
          overflow-y-auto
          pt-20 pb-8
        `}
      >
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-between px-6">
          {/* Navigation Links */}
          <div className="flex flex-col items-center justify-center flex-1 gap-8 py-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.offset)}
                className={`text-2xl font-zentry relative overflow-hidden group
                  ${activeSection === item.href.slice(1)
                    ? 'text-blue-100'
                    : 'text-blue-100/60'
                  }`}
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {item.label}
                </span>
                <span className="absolute top-full left-0 inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {item.label}
                </span>
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    layoutId="activeMobileSection"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
            {/* Enhanced Mobile Audio Toggle */}
            <button
              onClick={toggleAudioIndicator}
              className="flex items-center justify-center space-x-1 p-4 w-full
                rounded-full bg-blue-100/10 hover:bg-blue-100/20 
                transition-all duration-300 group"
            >
              <span className="mr-3 text-blue-100 text-sm">
                {isAudioPlaying ? 'Pause Music' : 'Play Music'}
              </span>
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line bg-blue-100", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    height: isIndicatorActive ? '16px' : '4px',
                  }}
                />
              ))}
            </button>

            {/* Enhanced Mobile Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center rounded-full border-2 border-blue-100 px-8 py-3 
                text-blue-100 hover:bg-blue-100 hover:text-black 
                transition-all duration-300 active:scale-95"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Audio element */}
      <audio
        ref={audioElementRef}
        src="/audio/background-music.mp3"
        loop
        preload="auto"
        className="hidden"
      />
    </>
  );
};

export default NavBar;
