
import React from 'react';
import { Card, SectionHeader } from './Card';
import { TextInput, NumberInput, TextArea } from './FormControls';
import { CustomAssessmentItem, InitiativesData, Task, OverallEvaluationData } from '../types';
import { 
    ClockIcon, ClipboardCheckIcon, SparklesIcon,
    ListBulletIcon, TrashIcon
} from '../constants';
import TaskListSection from './TaskListSection';
import InitiativesReportSection from './InitiativesReportSection';


interface InputPanelProps {
    workingHours: number[];
    setWorkingHours: React.Dispatch<React.SetStateAction<number[]>>;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    overallScore: number;
    setOverallScore: React.Dispatch<React.SetStateAction<number>>;
    selfAssessment: CustomAssessmentItem[];
    setSelfAssessment: React.Dispatch<React.SetStateAction<CustomAssessmentItem[]>>;
    overallEvaluation: OverallEvaluationData;
    setOverallEvaluation: React.Dispatch<React.SetStateAction<OverallEvaluationData>>;
    initiativesData: InitiativesData;
    setInitiativesData: React.Dispatch<React.SetStateAction<InitiativesData>>;
}

const InputPanel: React.FC<InputPanelProps> = (props) => {
    const {
        workingHours, setWorkingHours,
        tasks, setTasks,
        overallScore, setOverallScore,
        selfAssessment, setSelfAssessment,
        overallEvaluation, setOverallEvaluation,
        initiativesData, setInitiativesData
    } = props;

    const dayLabels = ['木', '金', '土', '日', '月', '火', '水'];

    const handleHourChange = (index: number, value: string) => {
        const newHours = [...workingHours];
        newHours[index] = parseFloat(value) || 0;
        setWorkingHours(newHours);
    };

    const handleAssessmentChange = (id: number, field: 'label' | 'score', value: string | number) => {
        setSelfAssessment(items => items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const addAssessmentItem = () => {
        setSelfAssessment(items => [...items, { id: Date.now(), label: '', score: 0 }]);
    };

    const removeAssessmentItem = (id: number) => {
        setSelfAssessment(items => items.filter(item => item.id !== id));
    };
    
    const handleOverallEvaluationChange = (field: keyof OverallEvaluationData, value: string) => {
        setOverallEvaluation(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pr-4">
            {/* --- Qualitative Section --- */}
            <h3 className="text-xl font-bold text-slate-600 border-b-2 border-blue-300 pb-2">定性評価 入力</h3>
            
            <InitiativesReportSection data={initiativesData} setData={setInitiativesData} />

            <Card>
                <SectionHeader icon={<ClipboardCheckIcon />} title="自己評価" iconBgColor="bg-green-100 text-green-600" />
                <div className="space-y-4">
                     <NumberInput
                        id="overall-score-input"
                        label="総合評価スコア (10点満点)"
                        value={overallScore}
                        onChange={(e) => setOverallScore(parseFloat(e.target.value) || 0)}
                        step="0.1"
                        max="10"
                        min="0"
                    />
                    <div className="space-y-3 pt-2">
                        <p className="text-sm font-medium text-slate-600 mb-2">詳細評価 (各項目5点満点)</p>
                        {selfAssessment.map((item) => (
                             <div key={item.id} className="flex items-center gap-2">
                                <TextInput
                                    id={`assessment-label-${item.id}`}
                                    value={item.label}
                                    onChange={(e) => handleAssessmentChange(item.id, 'label', e.target.value)}
                                    placeholder="評価項目"
                                    containerClassName="flex-grow"
                                />
                                <div className="w-24">
                                    <NumberInput
                                        id={`assessment-score-${item.id}`}
                                        value={item.score}
                                        onChange={(e) => handleAssessmentChange(item.id, 'score', parseFloat(e.target.value) || 0)}
                                        max="5"
                                        min="0"
                                        step="0.1"
                                    />
                                </div>
                                <button
                                    onClick={() => removeAssessmentItem(item.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                    aria-label="Delete item"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        ))}
                        <button
                          onClick={addAssessmentItem}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-2"
                        >
                          + 項目を追加
                        </button>
                    </div>
                </div>
            </Card>

            {/* --- Quantitative Section --- */}
            <h3 className="text-xl font-bold text-slate-600 border-b-2 border-green-300 pb-2 mt-8">定量評価 入力</h3>

            <Card>
                <SectionHeader icon={<ClockIcon />} title="稼働時間" />
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-4">
                    {workingHours.map((hour, index) => (
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
            </Card>

            <Card>
                <SectionHeader icon={<ListBulletIcon />} title="タスク内訳" iconBgColor="bg-yellow-100 text-yellow-600" />
                <TaskListSection tasks={tasks} setTasks={setTasks} />
            </Card>

            {/* --- Overall Evaluation Section --- */}
            <h3 className="text-xl font-bold text-slate-600 border-b-2 border-purple-300 pb-2 mt-8">総合評価 入力</h3>
            <Card>
                <SectionHeader icon={<SparklesIcon />} title="より良く働くために" iconBgColor="bg-purple-100 text-purple-600" />
                 <div className="space-y-6">
                     <TextArea 
                        id="achievements-input"
                        label="達成できたこと"
                        value={overallEvaluation.achievements}
                        onChange={(e) => handleOverallEvaluationChange('achievements', e.target.value)}
                        placeholder="..."
                    />
                    <TextArea 
                        id="challenges-input"
                        label="課題点"
                        value={overallEvaluation.challenges}
                        onChange={(e) => handleOverallEvaluationChange('challenges', e.target.value)}
                        placeholder="..."
                    />
                    <TextArea 
                        id="next-week-goals-input"
                        label="次週の目標"
                        value={overallEvaluation.nextWeekGoals}
                        onChange={(e) => handleOverallEvaluationChange('nextWeekGoals', e.target.value)}
                        placeholder="具体的なアクションプラン"
                    />
                 </div>
            </Card>
        </div>
    );
};

export default InputPanel;
