
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, SectionHeader } from './Card';
import { ClockIcon } from '../constants';
import { BarChartData } from '../types';
import { NumberInput } from './FormControls';

interface StatDisplayProps {
  label: string;
  value: string;
  comparison?: boolean;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, comparison = false }) => (
  <div className="bg-slate-50 rounded-lg p-4 flex-1 text-center">
    <p className="text-sm text-slate-500 mb-1">{label}</p>
    <p className={`text-2xl font-bold ${comparison && (value.startsWith('+') ? 'text-green-500' : 'text-red-500')}`}>
      {value}
    </p>
  </div>
);

interface WorkingHoursSectionProps {
  hours: number[];
  setHours: React.Dispatch<React.SetStateAction<number[]>>;
  isOutputMode?: boolean;
}

const WorkingHoursSection: React.FC<WorkingHoursSectionProps> = ({ hours, setHours, isOutputMode = false }) => {
  const totalHours = hours.reduce((sum, h) => sum + h, 0);
  const workingDaysCount = hours.filter(h => h > 0).length;
  const averageHours = workingDaysCount > 0 ? (totalHours / workingDaysCount) : 0;

  const dayLabels = ['木', '金', '土', '日', '月', '火', '水'];
  const chartData: BarChartData[] = hours.map((h, i) => ({
    name: `${i < 7 ? 'W1' : 'W2'}-${dayLabels[i % 7]}`,
    '稼働時間': h,
  }));

  const handleHourChange = (index: number, value: string) => {
    const newHours = [...hours];
    newHours[index] = parseFloat(value) || 0;
    setHours(newHours);
  };

  return (
    <Card padding={isOutputMode ? "p-0" : "p-6 sm:p-8"}>
      <SectionHeader icon={<ClockIcon />} title="稼働時間" />
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <StatDisplay label="今回の合計稼働時間" value={totalHours.toFixed(1)} />
        <StatDisplay label="平均稼働時間 (日)" value={averageHours.toFixed(1)} />
      </div>

      <div className="mb-8 h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip
                formatter={(value: number) => [`${value}時間`, '稼働時間']}
                cursor={{ fill: 'rgba(239, 246, 255, 0.5)' }}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar dataKey="稼働時間" fill="#3b82f6" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {!isOutputMode && (
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">稼働時間の内訳</h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
            {hours.map((hour, index) => (
              <NumberInput 
                key={index}
                id={`hour-input-${index}`}
                label={`${index < 7 ? '1週目' : '2週目'} ${dayLabels[index % 7]}`}
                value={hour}
                onChange={(e) => handleHourChange(index, e.target.value)}
                step="0.5"
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default WorkingHoursSection;
