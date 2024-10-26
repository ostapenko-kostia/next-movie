"use client";

import { useState } from "react";

type TColor = "primary" | "secondary" | "booked";

interface SeatProps {
  color: TColor;
  size?: number;
  popupText?: string;
  onClick?: () => void;
  isAvailable?: boolean;
}

function Seat({ color, size, popupText, onClick, isAvailable }: SeatProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const colors = {
    primary: "#3caf2c",
    secondary: "#757575",
    booked: "#151212",
  };
  return (
    <div
      className="rounded-t-full cursor-pointer relative max-xs:scale-75 max-[350px]:scale-[.6]"
      style={{
        width: size ? `${size}px` : "24px",
        height: size ? `${size}px` : "24px",
        backgroundColor: isAvailable ? colors[color] : colors.booked,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      <div className={`rounded-xl text-nowrap absolute -top-14 left-1/2 -translate-x-1/2 p-3 text-black font-bold ${isHover ? "block" : "hidden"}`} style={{ backgroundColor: "rgba(255,255,255,.8)" }}>
        {popupText}
      </div>
    </div>
  );
}

export default Seat;
