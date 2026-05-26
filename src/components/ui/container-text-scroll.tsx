"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import { cn } from "../../lib/utils";

export const ContainerTextScroll = ({
  titleComponent,
  children,
  className,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scale from smaller to full size as we scroll
  const scaleDimensions = () => (isMobile ? [0.85, 1] : [0.93, 1]);

  // Tilt forward from bottom: start 20°, end 0° (straight)
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translateY = useTransform(scrollYProgress, [0, 0.8], [50, 0]); // moves up

  return (
    <div
      ref={containerRef}
      className={cn("min-h-[60vh] md:min-h-[85vh] flex flex-col items-center justify-center relative p-4 md:p-8 overflow-visible", className)}
    >
      <motion.div
        style={{ translateY }}
        className="relative w-full max-w-6xl flex flex-col items-center justify-center"
      >
        {/* Title above/inside and Card element */}
        <div className="w-full mb-4 md:mb-6 text-center">
          {titleComponent}
        </div>
        
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </motion.div>
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        perspective: "1000px"
      }}
      className="relative h-auto md:h-[35rem] w-full border border-neutral-200/50 bg-[#f9fafb] rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="flex-1 w-full rounded-2xl bg-white overflow-hidden flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
