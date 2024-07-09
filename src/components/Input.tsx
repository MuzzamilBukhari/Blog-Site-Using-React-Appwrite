import { forwardRef, LegacyRef, useId } from "react";

const Input = (
  {
    label,
    type,
    className = "",
    placeholder = "",
    readonly = false,
    onInput,
    ...props
  }: {
    label: string;
    type: string;
    className?: string;
    placeholder: string;
    readonly?: boolean;
    onInput?: (e: any) => void;
  },
  ref: LegacyRef<HTMLInputElement>
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={id}
        onInput={onInput}
        readOnly={readonly}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
