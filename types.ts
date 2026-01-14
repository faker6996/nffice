
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

// Maps to 'user_profiles' in ERD
export interface UserProfile extends User {
  phone: string;
  address: string;
  bio: string;
  joinedDate: string;
  dob: string;
  socialLinks: { platform: string; url: string; icon: string }[];
  stats: {
    projects: number;
    yearsExperience: number;
    uploads: number; // Maps to 'files' count
  };
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

export interface ApprovalStep {
  id: string;
  name: string; // e.g. "Step 1"
  approver: User; // Single person: "Sếp"
  status: 'Pending' | 'Approved' | 'Rejected';
  timestamp?: string;
  comment?: string;
}

export interface ApprovalRequest {
  id: string;
  type: 'Vacation' | 'Expense' | 'Report' | 'Procurement';
  title: string;
  description?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  urgency: 'High' | 'Medium' | 'Low';
  date: string;
  author: User;
  
  // Sequential Chain of Command
  workflow: ApprovalStep[];
  
  // Global Groups
  reviewers: User[]; // "Tán thành" group
  consensus: User[]; // "Đồng thuận" group
  
  attachments: string[]; // Mock file names
  comments: Comment[]; // Discussion thread
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

// Maps to 'attendance_logs' in ERD
export interface AttendanceLog {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'On Time' | 'Late' | 'Absent';
  workingHours: number;
}

// Maps to 'system_logs' in ERD
export interface SystemLog {
  id: string;
  action: string; // e.g., 'LOGIN', 'UPLOAD_FILE', 'APPROVE_REQUEST'
  target: string;
  timestamp: string;
  iconType: 'auth' | 'file' | 'approval' | 'system';
}
