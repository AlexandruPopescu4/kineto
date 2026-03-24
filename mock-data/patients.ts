export interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  condition: string;
  recoveryStage: 'early' | 'mid' | 'advanced' | 'maintenance';
  adherenceRate: number;
  painLevel: number;
  painTrend: 'improving' | 'stable' | 'worsening';
  nextSession: string;
  status: 'active' | 'at-risk' | 'completed';
  avatar: string;
  therapistId: string;
  startDate: string;
  lastActivity: string;
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    age: 34,
    condition: 'Lower Back Pain',
    recoveryStage: 'mid',
    adherenceRate: 85,
    painLevel: 4,
    painTrend: 'improving',
    nextSession: '2024-03-28',
    status: 'active',
    avatar: 'SJ',
    therapistId: 'therapist-1',
    startDate: '2024-02-15',
    lastActivity: '2024-03-25'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    age: 45,
    condition: 'Rotator Cuff Injury',
    recoveryStage: 'advanced',
    adherenceRate: 92,
    painLevel: 2,
    painTrend: 'improving',
    nextSession: '2024-03-27',
    status: 'active',
    avatar: 'MC',
    therapistId: 'therapist-1',
    startDate: '2024-01-20',
    lastActivity: '2024-03-25'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.d@email.com',
    age: 28,
    condition: 'ACL Recovery',
    recoveryStage: 'early',
    adherenceRate: 65,
    painLevel: 6,
    painTrend: 'stable',
    nextSession: '2024-03-29',
    status: 'at-risk',
    avatar: 'ED',
    therapistId: 'therapist-1',
    startDate: '2024-03-01',
    lastActivity: '2024-03-20'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@email.com',
    age: 52,
    condition: 'Knee Replacement',
    recoveryStage: 'maintenance',
    adherenceRate: 78,
    painLevel: 3,
    painTrend: 'improving',
    nextSession: '2024-04-05',
    status: 'active',
    avatar: 'JW',
    therapistId: 'therapist-1',
    startDate: '2024-01-10',
    lastActivity: '2024-03-24'
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    age: 38,
    condition: 'Neck Pain',
    recoveryStage: 'mid',
    adherenceRate: 88,
    painLevel: 3,
    painTrend: 'improving',
    nextSession: '2024-03-26',
    status: 'active',
    avatar: 'LA',
    therapistId: 'therapist-1',
    startDate: '2024-02-01',
    lastActivity: '2024-03-25'
  }
];
