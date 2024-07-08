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
      <select id={id} ref={ref} className={`${className}`} {...props}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef(Select);
