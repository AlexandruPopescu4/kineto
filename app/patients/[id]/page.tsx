'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/mock-data/patients';
import { 
  User, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  FileText,
  Target,
  Clock,
  Award,
  AlertCircle,
  CheckCircle,
  Play,
  Edit
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock additional data for patient profile
const mockPainHistory = [
  { date: 'Week 1', pain: 8 },
  { date: 'Week 2', pain: 7 },
  { date: 'Week 3', pain: 6 },
  { date: 'Week 4', pain: 5 },
  { date: 'Week 5', pain: 4 },
  { date: 'Week 6', pain: 4 },
];

const mockAdherenceData = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: false },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: false },
  { day: 'Sun', completed: true },
];

const mockMilestones = [
  { id: '1', title: 'Initial Assessment', date: '2024-02-15', completed: true, description: 'Completed initial evaluation and baseline measurements' },
  { id: '2', title: 'Pain Reduction Goal', date: '2024-03-01', completed: true, description: 'Achieved 50% pain reduction from baseline' },
  { id: '3', title: 'Range of Motion Target', date: '2024-03-15', completed: false, description: 'Restore full range of motion in shoulder' },
  { id: '4', title: 'Strength Goal', date: '2024-04-01', completed: false, description: 'Regain 90% of pre-injury strength' },
];

const mockExerciseProgram = [
  { id: '1', name: 'Shoulder Flexion Exercises', sets: 3, reps: 10, frequency: 'Daily', difficulty: 'Medium' },
  { id: '2', name: 'External Rotation', sets: 3, reps: 12, frequency: 'Every other day', difficulty: 'Easy' },
  { id: '3', name: 'Scapular Stabilization', sets: 2, reps: 15, frequency: 'Daily', difficulty: 'Hard' },
];

const mockTherapistNotes = [
  { id: '1', date: '2024-03-25', note: 'Patient showing excellent progress with shoulder mobility. Pain levels consistently decreasing. Recommend continuing current program with slight increase in resistance.', therapist: 'Dr. Sarah Mitchell' },
  { id: '2', date: '2024-03-20', note: 'Patient reported increased confidence in daily activities. Adherence has been excellent this week. No complaints of pain during exercises.', therapist: 'Dr. Sarah Mitchell' },
  { id: '3', date: '2024-03-15', note: 'Completed milestone assessment. Patient has achieved 50% pain reduction goal. Ready to advance to next phase of rehabilitation.', therapist: 'Dr. Sarah Mitchell' },
];

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const patient = mockPatients[0]; // Using first patient as example

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'program', label: 'Exercise Program', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecoveryStageColor = (stage: string) => {
    switch (stage) {
      case 'early': return 'bg-purple-100 text-purple-800';
      case 'mid': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Patient Header */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                  <p className="text-gray-600">{patient.condition}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecoveryStageColor(patient.recoveryStage)}`}>
                      {patient.recoveryStage.charAt(0).toUpperCase() + patient.recoveryStage.slice(1)} Recovery
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Next Session</p>
                  <p className="font-medium">{patient.nextSession}</p>
                </div>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Adherence Rate</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{patient.adherenceRate}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${patient.adherenceRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Pain Level</CardTitle>
              {patient.painTrend === 'improving' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : patient.painTrend === 'worsening' ? (
                <TrendingDown className="h-4 w-4 text-red-600" />
              ) : (
                <Minus className="h-4 w-4 text-gray-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{patient.painLevel}/10</div>
              <p className="text-xs text-gray-600 mt-1">
                {patient.painTrend === 'improving' ? 'Improving' : 
                 patient.painTrend === 'worsening' ? 'Worsening' : 'Stable'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Days in Program</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">39</div>
              <p className="text-xs text-gray-600 mt-1">Since {patient.startDate}</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Sessions Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <p className="text-xs text-gray-600 mt-1">Total sessions</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Progress */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Pain History</CardTitle>
                  <CardDescription>Pain levels over the past 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockPainHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" domain={[0, 10]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pain" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Weekly Adherence */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Weekly Adherence</CardTitle>
                  <CardDescription>Exercise completion this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAdherenceData.map((day) => (
                      <div key={day.day} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{day.day}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          day.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {day.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Weekly Completion</span>
                      <span className="text-sm font-medium">71%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Program Summary */}
              <Card className="border-0 shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle>Current Program Summary</CardTitle>
                  <CardDescription>Active exercise program overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockExerciseProgram.slice(0, 3).map((exercise) => (
                      <div key={exercise.id} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">{exercise.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{exercise.sets} sets × {exercise.reps} reps</p>
                          <p>{exercise.frequency}</p>
                          <p>Difficulty: {exercise.difficulty}</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          <Play className="mr-2 h-3 w-3" />
                          View Exercise
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'program' && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Exercise Program</CardTitle>
                    <CardDescription>Current rehabilitation exercises</CardDescription>
                  </div>
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Modify Program
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockExerciseProgram.map((exercise) => (
                      <div key={exercise.id} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            exercise.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            exercise.difficulty === 'Medium' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {exercise.difficulty}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Sets</p>
                            <p className="font-medium">{exercise.sets}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Reps</p>
                            <p className="font-medium">{exercise.reps}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Frequency</p>
                            <p className="font-medium">{exercise.frequency}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Play className="mr-2 h-3 w-3" />
                            Demo
                          </Button>
                          <Button variant="outline" size="sm">
                            Instructions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              {/* Milestones */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recovery Milestones</CardTitle>
                  <CardDescription>Key achievements and goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockMilestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          milestone.completed ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            <span className="text-sm text-gray-500">{milestone.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Progress Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Range of Motion Progress</CardTitle>
                    <CardDescription>Shoulder mobility improvement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={[
                        { week: 'W1', rom: 45 },
                        { week: 'W2', rom: 55 },
                        { week: 'W3', rom: 65 },
                        { week: 'W4', rom: 75 },
                        { week: 'W5', rom: 85 },
                        { week: 'W6', rom: 95 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="week" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Line type="monotone" dataKey="rom" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Strength Progress</CardTitle>
                    <CardDescription>Strength measurements over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={[
                        { week: 'W1', strength: 40 },
                        { week: 'W2', strength: 50 },
                        { week: 'W3', strength: 60 },
                        { week: 'W4', strength: 70 },
                        { week: 'W5', strength: 80 },
                        { week: 'W6', strength: 85 },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="week" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Bar dataKey="strength" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Therapist Notes</CardTitle>
                    <CardDescription>Clinical observations and recommendations</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTherapistNotes.map((note) => (
                      <div key={note.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{note.therapist}</h4>
                          <span className="text-sm text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-gray-700">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
