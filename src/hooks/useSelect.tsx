"use client";

import { useState } from "react";

interface Props {
  options: { value: string; label: string }[];
  settings?: {
    placeholder?: string;
  };
}

export default function useSelect({ options, settings }: Props) {
  let selectJSX: () => JSX.Element = () => <></>;
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);

  selectJSX = () => {
    return (
      <div className="flex flex-col items-center">
        <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)} className="select">
          {settings?.placeholder && (
            <option hidden value="placeholder">
              {settings.placeholder}
            </option>
          )}
          {options &&
            options[0] &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        {!options[0] && <small className="text-secondary text-nowrap ">No showtimes for this movie :{"("}</small>}
      </div>
    );
  };

  return { selectJSX, selectValue };
}
