
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, SectionHeader } from './Card';
import { ClipboardCheckIcon } from '../constants';
import { CustomAssessmentItem, RadarChartData } from '../types';

interface SelfAssessmentSectionProps {
  overallScore: number;
  items: CustomAssessmentItem[];
}

const SelfAssessmentSection: React.FC<SelfAssessmentSectionProps> = ({ overallScore, items }) => {
  const chartData: RadarChartData[] = items.map(item => ({
    subject: item.label,
    score: item.score,
    fullMark: 5,
  }));

  return (
    <Card padding="p-0">
      <SectionHeader icon={<ClipboardCheckIcon />} title="自己評価" iconBgColor="bg-green-100 text-green-600" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Column for Scores */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-50/70 rounded-lg p-4">
            <h3 className="block text-sm text-slate-500 mb-1">総合評価スコア (10点満点)</h3>
            <p className="text-5xl font-bold text-slate-800">{overallScore.toFixed(1)}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">自己評価の詳細 (各項目5点満点)</h3>
            <div className="space-y-2">
              {items.filter(item => item.label).map(item => (
                <div key={item.id} className="flex items-center justify-between bg-slate-50/70 p-3 rounded-md">
                  <span className="text-slate-600 font-medium">{item.label}</span>
                  <p className="font-bold text-slate-800 text-lg">{item.score.toFixed(1)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column for Radar Chart */}
        <div className="md:col-span-3 h-96 w-full flex flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: '#475569' }}/>
              <PolarRadiusAxis angle={90} domain={[0, 5]} tickCount={6} tick={({ payload, x, y, textAnchor, ...rest }) => (
                  <text
                    {...rest}
                    y={y + (y - 180) / 180 * 5} // Adjust position slightly
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="12"
                  >
                    {payload.value}
                  </text>
              )} />
              <Radar name="自己評価スコア" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
           <div className="flex justify-center items-center mt-4">
                <div className="flex items-center">
                    <span className="w-4 h-4 rounded-sm bg-[#10b981] mr-2"></span>
                    <span className="text-sm font-medium text-slate-600">自己評価スコア</span>
                </div>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default SelfAssessmentSection;
