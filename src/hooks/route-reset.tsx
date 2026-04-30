"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteReset() {
  const pathname = usePathname();

  useEffect(() => {
    // reset scroll
    window.scrollTo(0, 0);

    // reset body styles (VERY IMPORTANT for layout bugs)
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";

    // force layout recalculation (fixes flex/grid bugs after nav)
    document.body.style.transform = "translateZ(0)";
  }, [pathname]);

  return null;
}