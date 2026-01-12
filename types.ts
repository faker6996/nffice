export type TaskStatus = 'Done' | 'Pending' | 'InProgress';
export type Priority = 'High' | 'Medium' | 'Low';

export interface ProjectTask {
  id: string;
  week: string;
  module: string;
  feature: string;
  task: string;
  description: string;
  priority: Priority;
  assignee: string;
  status: TaskStatus;
}

export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  tags?: string[];
  comments?: Comment[];
  images?: string[];
}

export interface ApprovalRequest {
  id: string;
  type: 'Vacation' | 'Expense' | 'Report';
  title: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  author: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'HR' | 'IT' | 'General' | 'Finance';
  content: string;
  date: string;
  author: string;
  priority: 'High' | 'Normal';
  isRead: boolean;
}
