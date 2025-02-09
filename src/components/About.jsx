import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getSkillTheme } from "../utils/skillIcons";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const mousePosition = useMousePosition();
  const [skillsRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useGSAP(() => {
    // Keep the original clip animation
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });

    // Add the text parallax effect
    const textParallax = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    textParallax.to(textRef.current, {
      y: "-30%",
      ease: "none",
    });
  }, []);

  const skills = [
    {
      category: "Frontend",
      techs: ["React.js", "Next.js", "TailwindCSS", "TypeScript"]
    },
    {
      category: "Backend",
      techs: ["Node.js", "Flask", "Express.js"]
    },
    {
      category: "AI/ML",
      techs: ["TensorFlow", "NLP", "LLMs", "Computer Vision"]
    },
    {
      category: "DevOps",
      techs: ["Docker", "Kubernetes", "AWS", "CI/CD"]
    }
  ];

  // Particle effect for skills
  const generateParticles = (tech) => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={`particle-${tech}-${i}`}
        className="absolute size-2 rounded-full bg-blue-300/30"
        initial={{ scale: 0 }}
        animate={{
          scale: [1, 2, 0],
          x: [0, (Math.random() - 0.5) * 100],
          y: [0, (Math.random() - 0.5) * 100],
          opacity: [1, 0],
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: Math.random() * 0.2,
        }}
      />
    ));
  };

  // 3D tilt effect for skill cards
  const calculateTilt = (e, element) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    return { tiltX, tiltY };
  };

  return (
    <div id="about" className="min-h-screen w-screen">
      {/* Animated Title Section */}
      <div className="relative mb-8 mt-20 sm:mt-36 flex flex-col items-center gap-3 sm:gap-5">
        <p className="font-general text-[10px] sm:text-sm uppercase">
          About Me
        </p>

        <AnimatedTitle
          title="Full St<b>a</b>ck Engineer & <br /> AI Enthusi<b>a</b>st"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext px-4 sm:px-0">
          <p className="text-sm sm:text-lg">Building high-performance applications with modern technologies</p>
          <p className="text-xs sm:text-base text-gray-500 mt-2">
            Passionate about integrating AI-driven solutions and cloud-based infrastructure to drive product innovation
          </p>
        </div>
      </div>

      {/* Background Image with Clip Animation */}
      <div className="h-[calc(100vh-4rem)] sm:h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />

          {/* Interactive Background Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)`,
            }}
          />

          {/* Skills Grid Overlay - Mobile improvements */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8 sm:py-16">
              <motion.div
                ref={skillsRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {skills.map((skill) => {
                  const theme = getSkillTheme(skill.category);

                  return (
                    <motion.div
                      key={skill.category}
                      className={`relative p-4 sm:p-6 rounded-xl bg-black/40 backdrop-blur-md border border-white/10
                        ${theme.border} transition-all duration-500 transform group
                        hover:shadow-lg ${theme.glow} hover:-translate-y-1 h-full`}
                      whileHover={{
                        scale: 1.02,
                        rotateX: mousePosition.tiltY,
                        rotateY: -mousePosition.tiltX,
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Enhanced Glow effects */}
                      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
                        bg-gradient-to-r ${theme.gradient} transition-all duration-500 blur-xl`} />

                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${theme.gradient} 
                        opacity-0 group-hover:opacity-100 transition-all duration-500`} />

                      {/* Content Container - Mobile improvements */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Title with Icon */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <motion.div
                            className={`text-xl sm:text-2xl ${theme.accent} flex-shrink-0`}
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            {theme.icon}
                          </motion.div>
                          <h3 className={`text-base sm:text-xl font-bold ${theme.color} group-hover:${theme.accent} 
                            transition-colors duration-300 line-clamp-1`}>
                            {skill.category}
                          </h3>
                        </div>

                        {/* Tech Tags Container - Mobile improvements */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {skill.techs.map((tech) => (
                            <motion.span
                              key={tech}
                              className={`relative px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm 
                                bg-white/5 ${theme.color}
                                hover:bg-white/10 transition-all duration-300 
                                cursor-pointer overflow-hidden backdrop-blur-sm
                                border border-white/10 hover:border-white/20
                                flex items-center justify-center`}
                              whileHover={{
                                scale: 1.05,
                                color: "#fff",
                                boxShadow: `0 0 20px 0 ${theme.accent}`,
                              }}
                              onHoverStart={() => generateParticles(tech)}
                            >
                              <span className="relative z-10">{tech}</span>
                              {/* Enhanced Particle container */}
                              <div className="absolute inset-0 pointer-events-none">
                                {generateParticles(tech)}
                              </div>
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Floating decoration - Mobile adjustments */}
                      <motion.div
                        className={`absolute -right-1 sm:-right-2 -top-1 sm:-top-2 text-2xl sm:text-3xl ${theme.accent} opacity-20
                          group-hover:opacity-40 transition-opacity duration-300`}
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {theme.icon}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Professional Summary - Hidden on mobile */}
              <motion.div
                ref={textRef}
                className="mt-8 sm:mt-16 max-w-2xl mx-auto text-center text-blue-100/90 px-4 sm:px-0 hidden sm:block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Full Stack Software Engineer with 3+ years of experience developing high-performance web and mobile applications.
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Proficient in React.js, Node.js, AWS, and AI/ML technologies, with expertise in designing scalable architectures and optimizing system performance.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a new hook for mouse position tracking
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        tiltX: (e.clientX / window.innerWidth - 0.5) * 20,
        tiltY: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

export default About;
