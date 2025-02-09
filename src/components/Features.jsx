import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import BentoTilt from "./BentoTilt";

const Projects = () => (
  <div id="projects" className="relative min-h-screen w-full bg-black px-5 py-32 sm:px-10">
    <div className="mx-auto max-w-7xl">
      {/* Section Title */}
      <div className="mb-16 md:mb-24">
        <p className="font-general text-xs uppercase bg-gradient-to-r from-violet-400 to-blue-400 
          bg-clip-text text-transparent font-bold tracking-wider sm:text-sm">
          Recent Projects
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50/80 leading-relaxed mt-2">
          A showcase of my recent work, featuring full-stack applications
          with modern technologies and innovative solutions.
        </p>
      </div>

      {/* Main Project */}
      <BentoTilt className="border-hsla relative mb-7 h-[500px] w-full overflow-hidden rounded-2xl 
        border border-violet-500/20">
        <BentoCard
          src="/img/nextjobquest.png"
          title={<span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 
            bg-clip-text text-transparent">NextJobQuest</span>}
          description="AI-powered job application tracking system with automated resume parsing and job matching capabilities."
          isLive={true}
          projectLink="https://www.nextjobquest.com/"
          techStack={["Next.js", "TailwindCSS", "OpenAI", "Firebase", "Supabase"]}
          isImage={true}
        />
      </BentoTilt>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 auto-rows-[400px]">
        <BentoTilt>
          <BentoCard
            src="/img/openprop-web.png"
            title={<span className="bg-gradient-to-r from-emerald-400 to-teal-400 
              bg-clip-text text-transparent">OpenProp</span>}
            description="Contributed to Africa's premier real estate platform, enhancing property search and management features."
            isLive={true}
            projectLink="https://www.openprop.africa/"
            techStack={["React", "Node.js", "PostgreSQL", "AWS"]}
            isImage={true}
          />
        </BentoTilt>

        <BentoTilt>
          <BentoCard
            src="/img/wahtcsupply.png"
            title={<span className="bg-gradient-to-r from-orange-400 to-rose-400 
              bg-clip-text text-transparent">WAHTC Supply</span>}
            description="A brand focused on creating simple, impactful, and timeless designs. Built with Shopify featuring custom theme development and unique product showcases."
            isLive={true}
            projectLink="https://wahtcsupply.com/"
            techStack={["Shopify", "Liquid", "JavaScript", "Custom API"]}
            isImage={true}
          />
        </BentoTilt>

        <BentoTilt>
          <BentoCard
            src="/img/dweller.png"
            title={<span className="bg-gradient-to-r from-sky-400 to-indigo-400 
              bg-clip-text text-transparent">Dweller</span>}
            description="An innovative roommate-matching platform that connects compatible roommates based on lifestyle preferences and living habits."
            isLive={true}
            projectLink="https://www.getdweller.com/"
            techStack={["Webflow", "JavaScript", "CMS", "Animations"]}
            isImage={true}
          />
        </BentoTilt>

        {/* More Projects */}
        <BentoTilt>
          <div className="flex size-full flex-col justify-between bg-gradient-to-br 
            from-violet-400/20 to-blue-400/20 backdrop-blur-sm p-8 border border-violet-500/20">
            <h1 className="bento-title special-font max-w-64">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 
                bg-clip-text text-transparent">
                M<b>o</b>re Pr<b>o</b>jects <br /> C<b>o</b>ming S<b>oo</b>n
              </span>
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end text-violet-400" />
          </div>
        </BentoTilt>
      </div>
    </div>
  </div>
);

export default Projects;
