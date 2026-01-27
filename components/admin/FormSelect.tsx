interface FormSelectOption {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: FormSelectOption[];
  defaultValue?: string | number;
  required?: boolean;
}

export function FormSelect({
  label,
  name,
  options,
  defaultValue,
  required
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
