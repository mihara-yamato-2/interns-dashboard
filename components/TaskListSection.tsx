
import React from 'react';
import { Card, SectionHeader } from './Card';
import { ListBulletIcon } from '../constants';
import { Task } from '../types';
import { TextArea } from './FormControls';

interface TaskListSectionProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isOutputMode?: boolean;
}

const TaskListSection: React.FC<TaskListSectionProps> = ({ tasks, setTasks, isOutputMode = false }) => {
  
  const totalTaskHours = tasks.reduce((sum, task) => sum + (task.time || 0), 0);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const lines = text.split('\n');
    
    const newTasks: Task[] = lines
      .map((line, index) => {
        const match = line.match(/^(.+?)\s*[:：]\s*([\d.]+)/);
        if (match) {
          const description = match[1].trim();
          const time = parseFloat(match[2]);
          if (description && !isNaN(time)) {
            return { id: Date.now() + index, description, time };
          }
        }
        return null;
      })
      .filter((task): task is Task => task !== null);

    setTasks(newTasks);
  };

  const tasksAsText = tasks.map(task => `${task.description}: ${task.time}`).join('\n');


  if (isOutputMode) {
    return (
      <Card padding="p-0">
        <SectionHeader icon={<ListBulletIcon />} title="タスク内訳" iconBgColor="bg-yellow-100 text-yellow-600" />
        <div className="space-y-3">
            <ul className="space-y-2">
                {tasks.filter(t => t.description).map(task => (
                    <li key={task.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-md">
                        <span className="text-slate-700">{task.description}</span>
                        <span className="font-semibold text-slate-800 bg-white px-2 py-1 rounded-md text-sm">{task.time.toFixed(1)}h</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-end items-center pt-2 mt-2 border-t">
                 <span className="text-sm font-semibold text-slate-600 mr-2">合計:</span>
                 <span className="text-lg font-bold text-slate-800">{totalTaskHours.toFixed(1)} 時間</span>
            </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <TextArea
        id="task-bulk-input"
        label="タスク内容と時間を一行ずつ入力 (例: タスクA: 1.5)"
        value={tasksAsText}
        onChange={handleTextChange}
        rows={10}
        placeholder={"ハイパーネオCS共有MTG：1.0\nハイパーネオ共有MTG準備：3.0\n..."}
        containerClassName="flex-grow"
      />
      <div className="flex justify-end items-center pt-2 mt-2 border-t">
        <span className="text-sm font-semibold text-slate-600 mr-2">合計:</span>
        <span className="text-lg font-bold text-slate-800">{totalTaskHours.toFixed(1)} 時間</span>
      </div>
    </div>
  );
};

export default TaskListSection;
