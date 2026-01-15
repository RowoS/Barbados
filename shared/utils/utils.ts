import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JournalEntry, GroupedEntries } from "@/shared/types";
import { Task } from '@/shared/types';

export type TaskType = 'Watering' | 'Fertilizing' | 'Pruning' | 'Health Checkup' | 'General';

export interface DashboardMetrics {
  overdue: number;
  dueToday: number;
  completed: number;
  typeDistribution: Record<TaskType, number>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const groupEntriesByMonthYear = (entries: JournalEntry[]): GroupedEntries => {
  return entries.reduce((groups, entry) => {
    const date = new Date(entry.created_at);
    const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(entry);
    return groups;
  }, {} as GroupedEntries);
};

export type TaskStatus = 'Ongoing' | 'Overdue' | 'Completed';

export const getTaskStatus = (task: Task, isMarkedComplete: boolean) => {
  if (isMarkedComplete) return 'Completed';


  if (task.task_status === 'Completed') return 'Completed';

  if (task.end_date) {
    const today = new Date();
    const dueDate = new Date(task.end_date);
    today.setHours(0, 0, 0, 0); 
    dueDate.setHours(0, 0, 0, 0);

    if (today > dueDate) return 'Overdue';
  }

  return 'Ongoing';
}

export function calculateTaskMetrics(tasks: Task[]): DashboardMetrics {
  // Normalize "Today" to midnight for accurate date comparison
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const todayEnd = todayStart + (24 * 60 * 60 * 1000);

  // Initialize distribution with 0
  const typeDistribution: Record<TaskType, number> = {
    'Watering': 0, 'Fertilizing': 0, 'Pruning': 0, 'Health Checkup': 0, 'General': 0
  };

  let overdue = 0;
  let dueToday = 0;
  let completed = 0;

  tasks.forEach((task) => {
    const type = task.task_type as TaskType;
    if (typeDistribution.hasOwnProperty(type)) {
      typeDistribution[type]++;
    }

    if (task.task_status === 'Completed') {
      completed++;
    } else {

      const taskEndDate = new Date(task.end_date).getTime();

      if (taskEndDate < todayStart) {
        overdue++;
      } else if (taskEndDate >= todayStart && taskEndDate < todayEnd) {
        dueToday++;
      }
    }
  });

  return { overdue, dueToday, completed, typeDistribution };
}