
import { ProjectTask, User, Post, ApprovalRequest, Notice, UserProfile, AttendanceLog, SystemLog } from './types';

export const PROJECT_PLAN: ProjectTask[] = [
  // Week 1
  { id: '1-1', week: 'Week 1', module: 'Foundation', feature: 'RBAC System', task: 'DB Schema Design', description: 'Design tables: users, roles, permissions', priority: 'High', assignee: 'bachtv', status: 'Done' },
  { id: '1-2', week: 'Week 1', module: 'Foundation', feature: 'Dynamic Menu', task: 'Sidebar Component', description: 'Dynamic sidebar based on permissions', priority: 'Medium', assignee: 'bachtv', status: 'Done' },
  { id: '1-3', week: 'Week 1', module: 'Auth', feature: 'Authentication', task: 'Login/Logout Flow', description: 'JWT auth with cookie storage', priority: 'High', assignee: 'bachtv', status: 'Done' },
  { id: '1-4', week: 'Week 1', module: 'UI/UX', feature: 'Theme System', task: 'Color Variables', description: 'OKLCH color system', priority: 'Medium', assignee: 'bachtv', status: 'Done' },
  // Week 2
  { id: '2-1', week: 'Week 2', module: 'Profile', feature: 'View Profile', task: 'Profile Page UI', description: 'Display user info: name, email, phone', priority: 'High', assignee: 'anhnv', status: 'Pending' },
  { id: '2-2', week: 'Week 2', module: 'Profile', feature: 'Edit Profile', task: 'Edit Form', description: 'Update name, phone, bio', priority: 'High', assignee: 'anhnv', status: 'Pending' },
  { id: '2-3', week: 'Week 2', module: 'Settings', feature: 'Approvers', task: 'Approver Config UI', description: 'Select default approvers', priority: 'High', assignee: 'hieunn', status: 'Pending' },
  // Week 3
  { id: '3-1', week: 'Week 3', module: 'Talkbox', feature: 'Create Post', task: 'Post Editor UI', description: 'Rich text editor with formatting', priority: 'High', assignee: 'ducpt', status: 'Pending' },
  { id: '3-2', week: 'Week 3', module: 'Feed', feature: 'Feed UI', task: 'Infinite scroll feed', description: 'Virtual scroll post cards', priority: 'High', assignee: 'ducpt', status: 'Pending' },
  // Week 4
  { id: '4-1', week: 'Week 4', module: 'Approvals', feature: 'Form Templates', task: 'Vacation Request Form', description: 'Leave type, start/end date', priority: 'High', assignee: 'ducpt', status: 'Pending' },
  { id: '4-2', week: 'Week 4', module: 'Workflow', feature: 'Approval Actions', task: 'Approve, Reject, Return', description: 'Action history log', priority: 'High', assignee: 'ducpt', status: 'Pending' },
  // Week 5
  { id: '5-1', week: 'Week 5', module: 'Notice', feature: 'Admin CRUD', task: 'Notice List (Admin)', description: 'DataTable with search', priority: 'High', assignee: 'anhnv', status: 'Pending' },
  { id: '5-2', week: 'Week 5', module: 'Regulations', feature: 'User View', task: 'Regulations Viewer', description: 'Browse by category, download PDF', priority: 'Medium', assignee: 'hieunn', status: 'Pending' },
  // Week 6
  { id: '6-1', week: 'Week 6', module: 'Colleague', feature: 'Directory', task: 'Employee List', description: 'Directory with avatar, name', priority: 'High', assignee: 'bachtv', status: 'Pending' },
  { id: '6-2', week: 'Week 6', module: 'Department', feature: 'Dept Tree View', task: 'Org hierarchy visualization', description: 'Tree component', priority: 'High', assignee: 'bachtv', status: 'Pending' },
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Bach TV', role: 'Super Admin', department: 'Engineering', email: 'bachtv@nffice.com', avatar: 'https://picsum.photos/seed/bach/200/200' },
  { id: 'u2', name: 'Anh NV', role: 'Frontend Dev', department: 'Product', email: 'anhnv@nffice.com', avatar: 'https://picsum.photos/seed/anh/200/200' },
  { id: 'u3', name: 'Duc PT', role: 'Backend Dev', department: 'Engineering', email: 'ducpt@nffice.com', avatar: 'https://picsum.photos/seed/duc/200/200' },
  { id: 'u4', name: 'Hieu NN', role: 'QA Engineer', department: 'Quality', email: 'hieunn@nffice.com', avatar: 'https://picsum.photos/seed/hieu/200/200' },
];

// Extended Profile Data for the logged-in user
export const MOCK_USER_PROFILE: UserProfile = {
  ...MOCK_USERS[0],
  phone: '+84 987 654 321',
  address: 'Keangnam Landmark 72, Hanoi, Vietnam',
  bio: 'Passionate about building scalable systems and optimizing developer experience. Currently leading the migration to Micro-Frontend architecture. Fan of clean code and strong coffee.',
  joinedDate: 'Jan 10, 2022',
  dob: 'Oct 15, 1995',
  socialLinks: [
    { platform: 'GitHub', url: 'github.com/bachtv', icon: 'github' },
    { platform: 'LinkedIn', url: 'linkedin.com/in/bachtv', icon: 'linkedin' },
    { platform: 'Twitter', url: 'twitter.com/bachtv', icon: 'twitter' }
  ],
  stats: {
    projects: 12,
    yearsExperience: 5,
    uploads: 148 // Files uploaded
  }
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: MOCK_USERS[0],
    content: 'Just deployed the new RBAC system to staging. Please verify your permissions!',
    timestamp: '2 hours ago',
    likes: 12,
    commentsCount: 3,
    tags: ['Engineering', 'Release'],
    comments: [
      {
        id: 'c1',
        author: MOCK_USERS[3], // Hieu NN
        content: 'Great work team! I will test the new permissions in the QA env shortly.',
        timestamp: '1 hour ago',
        likes: 2,
        replies: [
          {
            id: 'c1-r1',
            author: MOCK_USERS[0], // Bach TV
            content: 'Thanks Hieu, let me know if you find any edge cases.',
            timestamp: '45 mins ago',
            likes: 1
          }
        ]
      },
      {
        id: 'c2',
        author: MOCK_USERS[2], // Duc PT
        content: 'DB migrations ran smoothly. No downtime observed.',
        timestamp: '30 mins ago',
        likes: 5
      }
    ]
  },
  {
    id: 'p2',
    author: MOCK_USERS[1],
    content: 'The new UI theme "Underverse" is looking slick. Dark mode by default is a game changer. Here are some early screenshots of the design system.',
    timestamp: '5 hours ago',
    likes: 24,
    commentsCount: 8,
    tags: ['Design', 'UI/UX'],
    images: [
      'https://picsum.photos/seed/ui1/800/400',
      'https://picsum.photos/seed/ui2/800/400'
    ],
    comments: [
       {
        id: 'c3',
        author: MOCK_USERS[0],
        content: 'Love the purple accent color. Very modern.',
        timestamp: '4 hours ago',
        likes: 3
      }
    ]
  }
];

export const MOCK_APPROVALS: ApprovalRequest[] = [
  { 
    id: 'req1', 
    type: 'Vacation', 
    title: 'Annual Leave - Lunar New Year', 
    description: 'Taking 5 days off for Tet holidays with family.',
    status: 'Pending', 
    urgency: 'Medium',
    date: 'Jan 20, 2024', 
    author: MOCK_USERS[3], // Hieu NN
    attachments: [],
    workflow: [
      { approver: MOCK_USERS[0], status: 'Pending' }, // Bach TV
      { approver: MOCK_USERS[1], status: 'Pending' }  // Anh NV
    ]
  },
  { 
    id: 'req2', 
    type: 'Expense', 
    title: 'AWS Server Costs Q1', 
    description: 'Payment for EC2 and RDS instances for Jan-Mar 2024.',
    status: 'Approved', 
    urgency: 'High',
    date: 'Jan 15, 2024', 
    author: MOCK_USERS[0], // Bach TV
    attachments: ['invoice_jan.pdf', 'cost_explorer.csv'],
    workflow: [
      { approver: MOCK_USERS[2], status: 'Approved', comment: 'Looks within budget.', timestamp: 'Jan 16, 2024' }
    ]
  },
  { 
    id: 'req3', 
    type: 'Report', 
    title: 'Q4 Financial Report', 
    description: 'Draft version of the end-of-year financial statement.',
    status: 'Rejected', 
    urgency: 'Low',
    date: 'Jan 10, 2024', 
    author: MOCK_USERS[1], // Anh NV
    attachments: ['q4_report_v1.xlsx'],
    workflow: [
       { approver: MOCK_USERS[0], status: 'Rejected', comment: 'Missing marketing expenses section.', timestamp: 'Jan 11, 2024' }
    ]
  },
];

export const MOCK_NOTICES: Notice[] = [
  { id: 'n1', title: 'New Remote Work Policy 2024', category: 'HR', content: 'Updated guidelines for working from home effective next month. Please review the attached document for details on core hours and availability.', date: 'Feb 10, 2024', author: 'Bach TV', priority: 'High', isRead: false },
  { id: 'n2', title: 'System Maintenance Window', category: 'IT', content: 'There will be a scheduled server downtime this Sunday from 2 AM to 4 AM for database upgrades.', date: 'Feb 12, 2024', author: 'Duc PT', priority: 'Normal', isRead: true },
  { id: 'n3', title: 'Q1 All Hands Meeting', category: 'General', content: 'Join us for the quarterly review and roadmap discussion. Lunch will be provided.', date: 'Feb 15, 2024', author: 'Bach TV', priority: 'Normal', isRead: false },
  { id: 'n4', title: 'Expense Report Deadline', category: 'Finance', content: 'Please submit all expenses for the previous month by Friday to ensure timely reimbursement.', date: 'Feb 18, 2024', author: 'Hieu NN', priority: 'High', isRead: true },
];

export const MOCK_ATTENDANCE: AttendanceLog[] = [
  { id: 'att1', date: 'Feb 14, 2024', checkIn: '08:45 AM', checkOut: '06:15 PM', status: 'On Time', workingHours: 8.5 },
  { id: 'att2', date: 'Feb 13, 2024', checkIn: '08:55 AM', checkOut: '06:00 PM', status: 'On Time', workingHours: 8.1 },
  { id: 'att3', date: 'Feb 12, 2024', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'Late', workingHours: 8.25 },
  { id: 'att4', date: 'Feb 09, 2024', checkIn: '08:30 AM', checkOut: '05:45 PM', status: 'On Time', workingHours: 8.25 },
  { id: 'att5', date: 'Feb 08, 2024', checkIn: '08:40 AM', checkOut: '06:00 PM', status: 'On Time', workingHours: 8.3 },
];

export const MOCK_SYSTEM_LOGS: SystemLog[] = [
  { id: 'log1', action: 'Uploaded File', target: 'Design_System_v2.fig', timestamp: '1 hour ago', iconType: 'file' },
  { id: 'log2', action: 'Approved Request', target: 'EXP-2024-001 (Server Costs)', timestamp: '3 hours ago', iconType: 'approval' },
  { id: 'log3', action: 'System Login', target: 'Web Client (Chrome/Mac)', timestamp: '08:45 AM', iconType: 'auth' },
  { id: 'log4', action: 'Updated Permission', target: 'Role: Content Editor', timestamp: 'Yesterday', iconType: 'system' },
  { id: 'log5', action: 'Password Change', target: 'Security Settings', timestamp: '2 days ago', iconType: 'auth' },
];
