"use client";

import { ReactElement, useRef } from "react";
import { cloneElement } from "react";

interface IProps {
  step?: number;
  children: ReactElement;
}

export default function Slider({ step = 150, children }: IProps) {
  const slider = useRef<HTMLElement | null>(null);

  function scrollLeft() {
    if (slider && slider.current) slider.current.scrollLeft -= step;
  }

  function scrollRight() {
    if (slider && slider.current) slider.current.scrollLeft += step;
  }

  return (
    <div className="flex items-center w-full gap-5">
      <button onClick={scrollLeft} className="rounded-full text-primary text-xl flex items-center justify-center w-10 h-10 transition-transform duration-150 ease-in hover:scale-125">{`<`}</button>
      {cloneElement(children, { ref: slider })}
      <button onClick={scrollRight} className="rounded-full text-primary text-xl flex items-center justify-center w-10 h-10 transition-transform duration-150 ease-in hover:scale-125">{`>`}</button>
    </div>
  );
}
