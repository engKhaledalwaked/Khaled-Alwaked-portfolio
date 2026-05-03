"use client";

import { HTMLMotionProps, Variants, motion, useReducedMotion } from "framer-motion";
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
  viewportAmount?: number | "some" | "all";
  variants?: Variants;
};

export function MotionReveal({
  children,
  delay = 0,
  once = true,
  viewportAmount = 0.12,
  variants = defaultVariants,
  transition,
  ...props
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={false}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once, amount: viewportAmount }}
      variants={shouldReduceMotion ? undefined : variants}
      transition={shouldReduceMotion ? undefined : { delay, ...transition }}
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
