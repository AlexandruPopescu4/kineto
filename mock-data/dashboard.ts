export interface DashboardStats {
  activePatients: number;
  adherenceRate: number;
  atRiskPatients: number;
  averagePainReduction: number;
}

export interface AdherenceData {
  date: string;
  rate: number;
}

export interface RecentActivity {
  id: string;
  patientName: string;
  activity: string;
  timestamp: string;
  type: 'exercise' | 'pain' | 'note' | 'session';
}

export interface UpcomingSession {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  patientName?: string;
  timestamp: string;
}

export const mockDashboardStats: DashboardStats = {
  activePatients: 24,
  adherenceRate: 82,
  atRiskPatients: 3,
  averagePainReduction: 4.2
};

export const mockAdherenceData: AdherenceData[] = [
  { date: 'Mon', rate: 78 },
  { date: 'Tue', rate: 82 },
  { date: 'Wed', rate: 85 },
  { date: 'Thu', rate: 80 },
  { date: 'Fri', rate: 88 },
  { date: 'Sat', rate: 75 },
  { date: 'Sun', rate: 82 }
];

export const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    patientName: 'Sarah Johnson',
    activity: 'Completed exercise routine',
    timestamp: '2 hours ago',
    type: 'exercise'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    activity: 'Reported pain level: 2/10',
    timestamp: '3 hours ago',
    type: 'pain'
  },
  {
    id: '3',
    patientName: 'Emma Davis',
    activity: 'Missed scheduled exercise',
    timestamp: '5 hours ago',
    type: 'exercise'
  },
  {
    id: '4',
    patientName: 'James Wilson',
    activity: 'Session completed',
    timestamp: '1 day ago',
    type: 'session'
  },
  {
    id: '5',
    patientName: 'Lisa Anderson',
    activity: 'Therapist note added',
    timestamp: '1 day ago',
    type: 'note'
  }
];

export const mockUpcomingSessions: UpcomingSession[] = [
  {
    id: '1',
    patientName: 'Lisa Anderson',
    date: '2024-03-26',
    time: '10:00 AM',
    type: 'Follow-up'
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    date: '2024-03-27',
    time: '2:00 PM',
    type: 'Assessment'
  },
  {
    id: '3',
    patientName: 'Sarah Johnson',
    date: '2024-03-28',
    time: '11:30 AM',
    type: 'Treatment'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Low adherence rate this week',
    patientName: 'Emma Davis',
    timestamp: '1 hour ago'
  },
  {
    id: '2',
    type: 'info',
    message: 'New patient intake form submitted',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    type: 'success',
    message: 'Sarah Johnson reached pain reduction goal',
    timestamp: '1 day ago'
  }
];
