'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { 
  mockDashboardStats, 
  mockAdherenceData, 
  mockRecentActivity, 
  mockUpcomingSessions, 
  mockAlerts 
} from '@/mock-data/dashboard';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Calendar,
  Clock,
  ChevronRight,
  Bell,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your practice.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockDashboardStats.activePatients}</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-green-600">+3</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Adherence Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockDashboardStats.adherenceRate}%</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-green-600">+5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">At-Risk Patients</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockDashboardStats.atRiskPatients}</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-orange-600">Requires attention</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Pain Reduction</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{mockDashboardStats.averagePainReduction}</div>
              <p className="text-xs text-gray-600 mt-1">
                <span className="text-green-600">-0.8</span> points this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Adherence Chart */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Adherence Trend</CardTitle>
              <CardDescription>Patient exercise completion rate over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockAdherenceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest patient updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'exercise' ? 'bg-blue-500' :
                    activity.type === 'pain' ? 'bg-green-500' :
                    activity.type === 'note' ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.activity}</p>
                    <p className="text-xs text-gray-500">{activity.patientName}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Sessions */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled appointments</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockUpcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{session.patientName}</p>
                      <p className="text-sm text-gray-600">{session.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.time}</p>
                    <p className="text-xs text-gray-500">{session.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Important updates requiring attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-xl ${
                  alert.type === 'warning' ? 'bg-orange-50' :
                  alert.type === 'info' ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.type === 'warning' ? 'bg-orange-200' :
                    alert.type === 'info' ? 'bg-blue-200' : 'bg-green-200'
                  }`}>
                    {alert.type === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    ) : alert.type === 'info' ? (
                      <Info className="h-4 w-4 text-blue-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    {alert.patientName && (
                      <p className="text-xs text-gray-600">{alert.patientName}</p>
                    )}
                    <p className="text-xs text-gray-500">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Add Patient</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Schedule Session</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Activity className="h-6 w-6" />
                <span className="text-sm">Create Program</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Clock className="h-6 w-6" />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
