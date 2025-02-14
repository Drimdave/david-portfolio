import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { motion, useInView } from "framer-motion";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <motion.div
          ref={ref}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-10 font-general text-[10px] uppercase">
            Get in Touch
          </p>

          <AnimatedTitle
            title="Let&#39;s Cr<b>e</b>ate <br /> S<b>o</b>mething <br /> Am<b>a</b>zing."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="Send Email"
            leftIcon={<TiLocationArrow />}
            containerClass="mt-10 bg-yellow-300 text-black hover:scale-105 transition-transform"
            onClick={() => window.location.href = 'mailto:oyeladedavid1@gmail.com'}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
