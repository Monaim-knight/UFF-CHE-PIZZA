interface FormTextareaProps {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export function FormTextarea({
  label,
  name,
  defaultValue,
  required,
  placeholder,
  rows = 4
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
      />
    </div>
  );
}
