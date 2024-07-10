import { forwardRef, LegacyRef, useId } from "react";

const Select = (
  {
    label,
    options,
    className = "",
    ...props
  }: {
    label?: string;
    options: string[];
    className?: string;
  },
  ref: LegacyRef<HTMLSelectElement> | undefined
) => {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
