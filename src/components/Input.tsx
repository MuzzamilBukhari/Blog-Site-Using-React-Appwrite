import { forwardRef, LegacyRef, useId } from "react";

const Input = (
  {
    label,
    type,
    className = "",
    placeholder = "",
    readonly = false,
    accept,
    onInput,
    ...props
  }: {
    label: string;
    type: string;
    className?: string;
    placeholder: string;
    accept?: string;
    readonly?: boolean;
    onInput?: (e: any) => void;
  },
  ref: LegacyRef<HTMLInputElement>
) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-purple" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type}
        ref={ref}
        accept={accept}
        className={`px-4 py-2 rounded-lg bg-white text-darkBlue border border-darkBlue/20 outline-none focus:border-green focus:ring-2 focus:ring-green/50 duration-200 w-full ${className}`}
        id={id}
        onInput={onInput}
        readOnly={readonly}
        {...props}
      />
    </div>
  );
};

export default forwardRef(Input);
