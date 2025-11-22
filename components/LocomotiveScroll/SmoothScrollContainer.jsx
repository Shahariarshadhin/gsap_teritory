"use client";

import { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";


export default function SmoothScrollContainer({ children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    let locomotive = null;

    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      locomotive = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.1,
      });
    })();

    return () => {
      if (locomotive) locomotive.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
}
