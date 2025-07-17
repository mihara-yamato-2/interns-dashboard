
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-6 sm:p-8' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm ${padding} ${className}`}>
      {children}
    </div>
  );
};

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  iconBgColor?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title, iconBgColor = 'bg-blue-100 text-blue-600' }) => {
    return (
        <div className="flex items-center mb-6">
            <div className={`rounded-full p-2.5 mr-4 ${iconBgColor}`}>
                {icon}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h2>
      </div>
    );
};
