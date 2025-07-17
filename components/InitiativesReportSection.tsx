
import React from 'react';
import { Card, SectionHeader } from './Card';
import { RocketIcon } from '../constants';
import { InitiativesData } from '../types';
import { TextInput } from './FormControls';

interface InitiativesReportSectionProps {
    data: InitiativesData;
    setData: React.Dispatch<React.SetStateAction<InitiativesData>>;
    isOutputMode?: boolean;
}

const InitiativesReportSection: React.FC<InitiativesReportSectionProps> = ({ data, setData, isOutputMode = false }) => {

    const handleInitiativeChange = (id: number, value: string) => {
        const newInitiatives = data.initiatives.map(i => i.id === id ? { ...i, description: value } : i);
        setData(prev => ({ ...prev, initiatives: newInitiatives }));
    };
    
    return (
        <Card padding={isOutputMode ? "p-0" : "p-6 sm:p-8"}>
            <SectionHeader icon={<RocketIcon />} title="実施した施策" iconBgColor="bg-blue-100 text-blue-600" />
            {isOutputMode ? (
                <div className="space-y-4">
                    <ul className="list-disc list-inside space-y-2 pl-2">
                       {data.initiatives.filter(i => i.description).map(initiative => (
                            <li key={initiative.id} className="text-slate-800">{initiative.description}</li>
                       ))}
                    </ul>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="space-y-4">
                        {data.initiatives.map(initiative => (
                            <TextInput
                                key={initiative.id}
                                label={`施策${initiative.id}:`}
                                placeholder="（例）顧客インタビュー実施（10社）"
                                value={initiative.description}
                                onChange={(e) => handleInitiativeChange(initiative.id, e.target.value)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default InitiativesReportSection;