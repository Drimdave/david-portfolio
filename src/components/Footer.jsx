import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";

const socialLinks = [
  { href: "https://www.linkedin.com/in/oyelade-david/", icon: <FaLinkedin /> },
  { href: "https://github.com/Drimdave", icon: <FaGithub /> },
  { href: "https://x.com/Jacobian1234", icon: <FaTwitter /> },
  { href: "mailto:oyeladedavid1@gmail.com", icon: <FaEnvelope /> },
];

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate position relative to center
      const x = (e.clientX - windowWidth / 2) * 0.05;
      const y = (e.clientY - windowHeight / 2) * 0.05;

      // Calculate rotation based on mouse position
      const rotateY = ((e.clientX - windowWidth / 2) / windowWidth) * 20; // -10 to 10 degrees
      const rotateX = ((e.clientY - windowHeight / 2) / windowHeight) * -20; // 10 to -10 degrees

      setMousePosition({ x, y, rotateX, rotateY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer className="relative w-screen bg-[#5542ff] py-24 text-black overflow-hidden min-h-[70vh] flex flex-col justify-between">
      {/* Main content section with the large text */}
      <div className="flex-1 relative flex items-center justify-center mb-12 perspective-[1000px]">
        <div
          className="text-[35vw] font-zentry font-black text-black pointer-events-none select-none tracking-[1vw]"
          style={{
            transform: `
              translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)
              rotateX(${mousePosition.rotateX}deg)
              rotateY(${mousePosition.rotateY}deg)
            `,
            transition: 'transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          DAVID
        </div>
      </div>

      {/* Footer content at bottom */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-center text-sm font-light md:text-left">
            ©2025. All rights reserved
          </p>

          <div className="flex justify-center gap-6 md:justify-start">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-colors duration-500 ease-in-out hover:text-white text-xl"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            className="text-center text-sm font-light hover:underline md:text-right"
          >
            Download Resume
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
