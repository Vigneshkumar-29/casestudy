import React, { ElementType, RefObject } from "react";
import { motion } from "framer-motion";

interface TimelineContentProps {
    as?: ElementType;
    className?: string;
    animationNum: number;
    customVariants: any;
    timelineRef?: RefObject<any>;
    children: React.ReactNode;
}

export const TimelineContent = ({ as = "div", className, animationNum, customVariants, children }: TimelineContentProps) => {
    // Use motion.create() instead of deprecated motion() for framer-motion v12+
    const Component = motion.create(as as any);
    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={animationNum}
            variants={customVariants}
        >
            {children}
        </Component>
    )
}
