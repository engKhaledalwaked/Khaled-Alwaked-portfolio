import { ComponentPropsWithoutRef, ReactNode } from "react";

type MotionRevealProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  delay?: number;
  disableMotion?: boolean;
  once?: boolean;
  viewportAmount?: number | "some" | "all";
};

export function MotionReveal({ children, delay, disableMotion, once, viewportAmount, ...props }: MotionRevealProps) {
  void delay;
  void disableMotion;
  void once;
  void viewportAmount;

  return <div {...props}>{children}</div>;
}
