import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.61, 1, 0.88, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 20
  }
};

const App = () => {
  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
        >
          <main className="relative min-h-screen w-screen overflow-x-hidden cursor-none">
            <NavBar />
            <Hero />
            <About />
            <Features />
            <Story />
            <Contact />
            <Footer />
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default App;
