interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string;
}

export function FormInput({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  min,
  max,
  step
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
      />
    </div>
  );
}
