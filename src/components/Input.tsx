interface InputProps {
  placeholder: string;
  reference?: any;
  type?: "text" | "password" | "email";
  label?: string;
  error?: string;
  className?: string;
}

export function Input({ placeholder, reference, type = "text", label, error, className = "" }: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input 
        ref={reference} 
        placeholder={placeholder} 
        type={type}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
