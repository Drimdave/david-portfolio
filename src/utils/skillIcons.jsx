import { FaReact, FaServer, FaRobot, FaCloud } from 'react-icons/fa';

const skillThemes = {
    Frontend: {
        icon: <FaReact className="animate-spin-slow" />,
        color: "text-white",
        gradient: "from-cyan-500/30 to-blue-500/30",
        border: "group-hover:border-cyan-400/50",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)]",
        accent: "text-cyan-400",
    },
    Backend: {
        icon: <FaServer className="animate-pulse" />,
        color: "text-white",
        gradient: "from-emerald-500/30 to-green-500/30",
        border: "group-hover:border-emerald-400/50",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(52,211,153,0.5)]",
        accent: "text-emerald-400",
    },
    'AI/ML': {
        icon: <FaRobot className="animate-bounce" />,
        color: "text-white",
        gradient: "from-purple-500/30 to-pink-500/30",
        border: "group-hover:border-purple-400/50",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(192,132,252,0.5)]",
        accent: "text-purple-400",
    },
    DevOps: {
        icon: <FaCloud className="animate-float" />,
        color: "text-white",
        gradient: "from-orange-500/30 to-red-500/30",
        border: "group-hover:border-orange-400/50",
        glow: "group-hover:shadow-[0_0_25px_-5px_rgba(251,146,60,0.5)]",
        accent: "text-orange-400",
    },
};

export const getSkillTheme = (category) => skillThemes[category] || skillThemes.Frontend; 