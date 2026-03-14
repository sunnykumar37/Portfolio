"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const Photo = () => {
  return (
    <div className="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] xl:w-[506px] xl:h-[506px] mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" }
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" }
          }}
          className="w-[212px] h-[212px] sm:w-[292px] sm:h-[292px] xl:w-[498px] xl:h-[498px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
          <Image src="/Mynewpic.png"
            priority
            quality={100}
            fill
            alt="Sunny Kumar"
            className="object-cover object-top"
          />
        </motion.div>

        <motion.svg className="w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] xl:w-[506px] xl:h-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >

          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

        </motion.svg>

      </motion.div>
    </div>
  );
};

export default Photo;
