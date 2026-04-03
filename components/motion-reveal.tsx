"use client";

import { HTMLMotionProps, Variants, motion } from "framer-motion";
import { ReactNode } from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type MotionRevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  variants?: Variants;
};

export function MotionReveal({
  children,
  delay = 0,
  once = true,
  variants = defaultVariants,
  transition,
  ...props
}: MotionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      transition={{ delay, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
