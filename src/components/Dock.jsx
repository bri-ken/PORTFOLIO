"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from 'styled-components'; // Import styled-components

// Modified DockItem to accept iconComponent and label as props
function DockItem({
  iconComponent: Icon, // This is now the direct path to the SVG
  labelElement,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [size, setSize] = useState(baseItemSize);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  // Size is animated based on mouse distance
  const sizeSpring = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: sizeSpring,
        height: sizeSpring,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-white border-neutral-300 border-2 shadow-md ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      <div className="flex items-center justify-center w-full h-full p-2">
        <img 
          src={Icon} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {cloneElement(labelElement, { isHovering })} 
    </motion.div>
  );
}

// Modified DockLabel to accept isHovering boolean
function DockLabel({ children, className = "", isHovering }) {
  return (
    <AnimatePresence>
      {isHovering && ( // Use the boolean hover state
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060606] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Removed DockIcon component as it is no longer needed
/*
function DockIcon({ children, className = "", isHovering }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
*/

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 50,
  distance = 200,
  panelHeight = 48,
  dockHeight = 200,
  baseItemSize = 36,
}) {
  const mouseX = useMotionValue(0);
  const containerRef = useRef(null);

  // The overall dock container handles the mouse position tracking
  const ref = useRef(null);

  return (
    <motion.div
       ref={ref}
      style={{ height: panelHeight, scrollbarWidth: "none" }} // Initial height, expands on hover
      className="mx-2 flex max-w-full items-center"
       // Mouse move listener on the main dock container
      onMouseMove={({ pageX }) => {
          const rect = ref.current?.getBoundingClientRect();
          if (rect) {
             mouseX.set(pageX);
          }
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
    >
      <motion.div
        // Removed mouse events from here, handled by the parent div
        className={`${className} absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border-neutral-700 border-2 pb-2 px-4`}
        style={{ height: panelHeight }} // This height will be animated by framer-motion based on mouse position
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={() => window.open(item.url, '_blank')}
            className={item.className}
            mouseX={mouseX} // Pass the global mouseX
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            iconComponent={item.icon} // Pass the icon component directly
            labelElement={<DockLabel>{item.label}</DockLabel>} // Pass DockLabel element
          />
        ))}
      </motion.div>
    </motion.div>
  );
} 