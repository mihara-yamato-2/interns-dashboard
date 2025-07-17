
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CustomAssessmentItem, InitiativesData, Task, OverallEvaluationData } from './types';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';

const App: React.FC = () => {
    // State for Working Hours Section
    const [workingHours, setWorkingHours] = useState<number[]>([
      4, 5, 0, 0, 4, 5, 4.5, // Week 1: Thu, Fri, Sat, Sun, Mon, Tue, Wed
      4, 5, 0, 0, 4, 5, 4.5  // Week 2: Thu, Fri, Sat, Sun, Mon, Tue, Wed
    ]); // 14 days

    // State for Task List
    const [tasks, setTasks] = useState<Task[]>([
      { id: Date.now() + 1, description: '顧客インタビュー準備', time: 3.5 },
      { id: Date.now() + 2, description: '新規リード施策Aの実行', time: 8.0 },
      { id: Date.now() + 3, description: 'チーム定例・情報共有', time: 2.5 },
      { id: Date.now() + 4, description: '〇〇機能の設計', time: 10.0 },
      { id: Date.now() + 5, description: '△△のバグ修正', time: 4.0 },
    ]);

    // State for Self Assessment Section
    const [overallScore, setOverallScore] = useState<number>(7.5);
    const [selfAssessment, setSelfAssessment] = useState<CustomAssessmentItem[]>([
        { id: 1, label: '知識・スキル', score: 3.5 },
        { id: 2, label: 'コミュニケーション', score: 4.0 },
        { id: 3, label: '問題解決力', score: 3.8 },
        { id: 4, label: 'チーム貢献度', score: 4.2 },
        { id: 5, label: '時間管理', score: 4.5 },
    ]);

    // State for Overall Evaluation
    const [overallEvaluation, setOverallEvaluation] = useState<OverallEvaluationData>({
      achievements: 'ユーザーインタビューから得られた洞察を元に、◯◯という施策を実施し、△△という効果が見られました。',
      challenges: 'タスクの優先順位付けに時間がかかってしまうことがあった。',
      nextWeekGoals: '次週は〇〇のタスクを完了させ、△△の技術調査を開始する。'
    });

    // State for Initiatives Report Section
    const [initiativesData, setInitiativesData] = useState<InitiativesData>({
        initiatives: [
            { id: 1, description: '（例）顧客インタビュー実施（10社）' },
            { id: 2, description: '（例）新規リード獲得施策の実行' },
            { id: 3, description: '' },
            { id: 4, description: '' },
        ],
    });
    
    const outputRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const performDownload = async (action: (canvas: HTMLCanvasElement) => void) => {
      const element = outputRef.current;
      if (!element || isDownloading) return;

      setIsDownloading(true);
      setIsDropdownOpen(false);

      const clone = element.cloneNode(true) as HTMLDivElement;
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '0px';
      clone.style.width = `${element.offsetWidth}px`;
      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: clone.scrollWidth,
          height: clone.scrollHeight,
          windowWidth: clone.scrollWidth,
          windowHeight: clone.scrollHeight,
      });

      document.body.removeChild(clone);

      action(canvas);
      
      setIsDownloading(false);
    }

    const handleDownloadPdf = () => {
        performDownload((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            const canvasAspectRatio = canvasWidth / canvasHeight;
            const imgHeight = pdfWidth / canvasAspectRatio;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save('work-performance-report.pdf');
        });
    };

    const handleDownloadPng = () => {
      performDownload((canvas) => {
        const link = document.createElement('a');
        link.download = 'work-performance-report.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    };

    const allStates = {
        workingHours,
        tasks,
        overallScore,
        selfAssessment,
        overallEvaluation,
        initiativesData,
    };

    const allSetters = {
        setWorkingHours,
        setTasks,
        setOverallScore,
        setSelfAssessment,
        setOverallEvaluation,
        setInitiativesData,
    };

    return (
        <div className="min-h-screen text-slate-700 bg-slate-100">
            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl lg:text-2xl font-bold text-slate-800 py-4">Work Performance Dashboard</h1>
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            disabled={isDownloading}
                            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center"
                        >
                            {isDownloading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Downloading...
                                </>
                            ) : (
                                <>
                                Download
                                 <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </>
                            )}
                        </button>
                        {isDropdownOpen && (
                            <div 
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5"
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <button
                                        onClick={handleDownloadPdf}
                                        className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                        role="menuitem"
                                    >
                                        Save as PDF
                                    </button>
                                    <button
                                        onClick={handleDownloadPng}
                                        className="w-full text-left block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                        role="menuitem"
                                    >
                                        Save as Image (PNG)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <aside className="lg:h-full">
                    <div className="lg:sticky lg:top-24">
                       <InputPanel {...allStates} {...allSetters} />
                    </div>
                </aside>
                <main>
                    <OutputPanel ref={outputRef} {...allStates} />
                </main>
            </div>
        </div>
    );
};

export default App;
