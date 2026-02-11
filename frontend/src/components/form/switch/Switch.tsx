"use client";
import React from "react";

interface SwitchProps {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  color?: "blue" | "gray";
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  color = "blue",
  className = "",
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    if (checked === undefined) {
      setInternalChecked(newCheckedState);
    }
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const switchColors =
    color === "blue"
      ? {
        background: isChecked
          ? "bg-brand-500 "
          : "bg-gray-200 dark:bg-white/10",
        knob: isChecked
          ? "translate-x-full bg-white"
          : "translate-x-0 bg-white",
      }
      : {
        background: isChecked
          ? "bg-gray-800 dark:bg-white/10"
          : "bg-gray-200 dark:bg-white/10",
        knob: isChecked
          ? "translate-x-full bg-white"
          : "translate-x-0 bg-white",
      };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <label
        htmlFor={id}
        className={`flex cursor-pointer select-none items-center gap-3 text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-400"
          }`}
        onClick={(e) => {
          e.preventDefault();
          handleToggle();
        }}
      >
        <div className="relative">
          <div
            id={id}
            className={`block transition duration-150 ease-linear h-6 w-11 rounded-full ${disabled
                ? "bg-gray-100 pointer-events-none dark:bg-gray-800"
                : switchColors.background
              }`}
          ></div>
          <div
            className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-theme-sm duration-150 ease-linear transform ${switchColors.knob}`}
          ></div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Switch;
