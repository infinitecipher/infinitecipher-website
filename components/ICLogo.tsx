"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ICLogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function ICLogo({ size = 28, showWordmark = true, className = "" }: ICLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  const strokeColor = isDark ? "#F1EFE8" : "#0A0A0C";
  const accentColor = isDark ? "#AFA9EC" : "#534AB7";
  const wordmarkColor = isDark ? "#F1EFE8" : "#0A0A0C";
  const cipherColor = isDark ? "#AFA9EC" : "#534AB7";

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Document shape — pentagon with clipped top-right */}
        <polygon
          points="2,2 22,2 30,10 30,30 2,30"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Fold corner line */}
        <polyline
          points="22,2 22,10 30,10"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
        {/* I-bar top */}
        <line x1="9" y1="10" x2="17" y2="10" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* I stem */}
        <line x1="13" y1="10" x2="13" y2="22" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* I-bar bottom */}
        <line x1="9" y1="22" x2="17" y2="22" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* C arc */}
        <path
          d="M 21 13 C 26 13 29 15 29 16 C 29 17 26 19 21 19"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Accent dot at fold */}
        <circle cx="22" cy="10" r="2" fill={accentColor} />
      </svg>

      {showWordmark && (
        <span className="flex items-baseline leading-none">
          <span
            className="font-serif font-normal text-[17px] tracking-tight"
            style={{ color: wordmarkColor }}
          >
            Infinite
          </span>
          <span
            className="font-mono font-bold text-[12px] tracking-widest uppercase"
            style={{ color: cipherColor }}
          >
            CIPHER
          </span>
        </span>
      )}
    </div>
  );
}
