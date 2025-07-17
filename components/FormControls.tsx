
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ label, id, containerClassName = '', ...props }) => {
  return (
    <div className={containerClassName}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>}
      <input
        id={id}
        type="text"
        className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        {...props}
      />
    </div>
  );
};

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({ label, unit, id, ...props }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">{label}</label>}
      <div className="relative">
        <input
          id={id}
          type="number"
          className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          {...props}
        />
        {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{unit}</span>}
      </div>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    containerClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, containerClassName = '', ...props }) => {
    return (
        <div className={containerClassName}>
            <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
            <textarea
                id={id}
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                {...props}
            ></textarea>
        </div>
    );
};
