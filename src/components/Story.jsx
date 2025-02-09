import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Escape Enterprises LLC",
    role: "Machine Learning Engineer & Developer",
    period: "November 2024 - Present",
    bullets: [
      "Engineered and maintained AI-driven self-care features, leveraging LLMs and NLP, leading to a 20% increase in user engagement.",
      "Developed and optimized Lucille, a proprietary LLM, using transformers and sentiment analysis to generate tailored self-care plans.",
      "Integrated real-time sentiment analysis into AI modules, refining recommendations and boosting customer satisfaction by 18%.",
      "Collaborated with product, design, and QA teams to optimize AI feature usability, reducing feature deployment time by 25%."
    ],
    category: "AI & ML"
  },
  {
    company: "VetXD",
    role: "Software Engineer",
    period: "February 2024 - October 2024",
    bullets: [
      "Developed a deep-learning-based diagnostic platform using Python, TensorFlow, and React.",
      "Converted murmur sounds into 2D/3D spectrograms, boosting cancer detection accuracy by 15%.",
      "Optimized PostgreSQL indexing and query performance, ensuring 99.9% uptime for a 5TB+ audio dataset.",
      "Collaborated in an Agile team to enhance CNN-based detection algorithms, improving precision by 12%."
    ],
    category: "HEALTHCARE"
  },
  {
    company: "RazorLabs",
    role: "Full Stack Developer",
    period: "June 2022 - November 2023",
    bullets: [
      "Led development of four React.js and Node.js web applications using Agile methodologies.",
      "Created interactive 3D storytelling features using Blender + Unity, increasing engagement by 25%.",
      "Built and deployed three cross-platform mobile apps using React Native and Flutter.",
      "Increased user engagement by 30% through optimized performance and enhanced UX."
    ],
    category: "DEVELOPMENT"
  },
  {
    company: "RitaMarie Designs",
    role: "Developer",
    period: "November 2023 - February 2024",
    bullets: [
      "Developed Shopify e-commerce platform with optimized theme performance and caching.",
      "Reduced page load times by 30% through lazy loading and performance optimizations.",
      "Integrated Stripe and PayPal payment gateways with automated inventory tracking.",
      "Increased sales by 25% through improved checkout flow and user experience."
    ],
    category: "E-COMMERCE"
  },
  {
    company: "Freelance Projects",
    role: "Web Developer",
    period: "2024",
    bullets: [
      "Designed and developed Dweller's landing page with responsive design and animations.",
      "Built Wanderlust's Shopify store with custom theme and payment integrations.",
      "Created WAHTCO's 3D-integrated Shopify website with unique product showcases.",
      "Implemented performance optimizations and SEO best practices across all projects."
    ],
    category: "FREELANCE"
  },
  {
    company: "Festive BySpire",
    role: "Digital Marketing Manager",
    period: "October 2019 - February 2021",
    bullets: [
      "Managed SEO, SEM, and social media campaigns using Google Analytics and SEMrush.",
      "Increased brand visibility by 20% through targeted digital marketing strategies.",
      "Led email marketing campaigns achieving 25% increase in open rates.",
      "Boosted website traffic by 35% through optimized content and marketing funnels."
    ],
    category: "MARKETING"
  }
];

const Story = () => {
  const [activeExperience, setActiveExperience] = useState(null);
  const frameRef = useRef(null);
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#story",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  }, []);

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50 overflow-x-hidden">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Experience
        </p>

        <div className="relative w-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> David <b>O</b>yelade"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          {/* Floating Image - Hidden on mobile */}
          <div className="story-img-container absolute top-0 right-0 w-1/2 hidden md:block">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>

            {/* SVG Filter */}
            <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Experience Section - Mobile Responsive */}
          <div className="mt-1 px-4 md:px-10 w-full max-w-[1400px] mx-auto">
            <div className="space-y-4 md:space-y-8">
              {experiences.map((exp, index) => (
                <div key={exp.company} className="flex flex-col md:flex-row gap-4 md:gap-10">
                  {/* Company Name */}
                  <motion.div
                    className={`relative cursor-pointer py-2 md:py-3 pl-4 md:pl-6 
                      w-full md:w-1/3 border-l-2 md:border-l-0 shrink-0
                      ${activeExperience?.company === exp.company
                        ? 'border-yellow-300 text-white scale-[1.02]'
                        : 'border-white/20 text-white/40 hover:text-white/60'
                      }`}
                    onMouseEnter={() => setActiveExperience(exp)}
                    onMouseLeave={() => setActiveExperience(null)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="text-xs font-light tracking-wider opacity-50 mb-1">
                      {exp.category}
                    </p>
                    <h2 className="bento-title special-font text-3xl md:text-5xl font-bold tracking-tight">
                      {exp.company}
                    </h2>
                  </motion.div>

                  {/* Experience Details */}
                  <motion.div
                    className="w-full md:w-2/3 overflow-hidden"
                    initial={{ opacity: 0, x: -20, display: 'none' }}
                    animate={{
                      opacity: activeExperience?.company === exp.company ? 1 : 0,
                      x: activeExperience?.company === exp.company ? 0 : -20,
                      display: activeExperience?.company === exp.company ? 'block' : 'none',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 md:p-6">
                      <div className="mb-3 md:mb-4">
                        <p className="text-base md:text-lg font-light">
                          {exp.role}
                        </p>
                        <p className="text-xs md:text-sm font-light opacity-70">
                          {exp.period}
                        </p>
                      </div>
                      <ul className="space-y-2 md:space-y-3">
                        {exp.bullets?.map((bullet, i) => (
                          <li key={i} className="text-xs md:text-sm leading-relaxed opacity-80 flex gap-2">
                            <span className="text-blue-400">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
