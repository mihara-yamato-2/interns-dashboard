
import React from 'react';
import WorkingHoursSection from './WorkingHoursSection';
import SelfAssessmentSection from './SelfAssessmentSection';
import InitiativesReportSection from './InitiativesReportSection';
import TaskListSection from './TaskListSection';
import { Card, SectionHeader } from './Card';
import { SparklesIcon } from '../constants';
import { CustomAssessmentItem, InitiativesData, Task, OverallEvaluationData } from '../types';

interface OutputPanelProps {
    workingHours: number[];
    tasks: Task[];
    overallScore: number;
    selfAssessment: CustomAssessmentItem[];
    overallEvaluation: OverallEvaluationData;
    initiativesData: InitiativesData;
}

const OutputPanel = React.forwardRef<HTMLDivElement, OutputPanelProps>((props, ref) => {
    const {
        workingHours,
        tasks,
        overallScore,
        selfAssessment,
        overallEvaluation,
        initiativesData
    } = props;
    
    const dummySetter = () => {};

    const OutputField = ({ label, value }: { label: string, value: string }) => (
        <div>
            <h3 className="font-semibold text-slate-800 mb-2">{label}</h3>
            <p className="whitespace-pre-wrap p-3 bg-slate-50 rounded-md min-h-[3rem]">{value || " "}</p>
        </div>
    );

    return (
        <div ref={ref} className="bg-slate-50 p-2 sm:p-4 lg:p-6 rounded-lg shadow-lg">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-md space-y-12">
                
                {/* 1. Qualitative Section */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center border-b-2 border-blue-500 pb-3">
                        主観評価
                    </h2>
                    <div className="space-y-8">
                        <InitiativesReportSection 
                            data={initiativesData} 
                            setData={dummySetter as any} 
                            isOutputMode={true}
                        />
                         <SelfAssessmentSection
                            overallScore={overallScore}
                            items={selfAssessment}
                        />
                    </div>
                </section>

                {/* 2. Quantitative Section */}
                <section>
                     <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center border-b-2 border-green-500 pb-3">
                        客観評価
                    </h2>
                    <div className="space-y-8">
                        <WorkingHoursSection 
                            hours={workingHours} 
                            setHours={dummySetter as any} 
                            isOutputMode={true}
                        />
                        <TaskListSection
                            tasks={tasks}
                            setTasks={dummySetter as any}
                            isOutputMode={true}
                        />
                    </div>
                </section>

                {/* 3. Overall Evaluation Section */}
                 <section>
                     <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 text-center border-b-2 border-purple-500 pb-3">
                        総合評価
                    </h2>
                     <div className="space-y-8">
                         <Card padding="p-0">
                            <SectionHeader icon={<SparklesIcon />} title="より良く働くために" iconBgColor="bg-purple-100 text-purple-600" />
                            <div className="space-y-6 text-slate-700">
                                <OutputField label="達成できたこと" value={overallEvaluation.achievements} />
                                <OutputField label="課題点" value={overallEvaluation.challenges} />
                                <OutputField label="次週の目標" value={overallEvaluation.nextWeekGoals} />
                            </div>
                        </Card>
                     </div>
                </section>
            </div>
        </div>
    );
});

export default OutputPanel;
