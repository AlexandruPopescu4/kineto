'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/mock-data/patients';
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Calendar,
  ChevronRight,
  User
} from 'lucide-react';

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const getPainTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'worsening': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAdherenceColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your patient roster</p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name or condition..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <div className="flex space-x-2">
                  {['all', 'active', 'at-risk', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' ? 'All Patients' : 
                       status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <p className="text-sm text-gray-600">{patient.condition}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                      {patient.status.replace('-', ' ')}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Recovery Stage */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Recovery Stage</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRecoveryStageColor(patient.recoveryStage)}`}>
                      {patient.recoveryStage.charAt(0).toUpperCase() + patient.recoveryStage.slice(1)}
                    </span>
                  </div>

                  {/* Adherence Rate */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Adherence</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            patient.adherenceRate >= 80 ? 'bg-green-500' :
                            patient.adherenceRate >= 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${patient.adherenceRate}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getAdherenceColor(patient.adherenceRate)}`}>
                        {patient.adherenceRate}%
                      </span>
                    </div>
                  </div>

                  {/* Pain Level */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pain Level</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{patient.painLevel}/10</span>
                      {getPainTrendIcon(patient.painTrend)}
                    </div>
                  </div>

                  {/* Next Session */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next Session</span>
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{patient.nextSession}</span>
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Last activity: {patient.lastActivity}
                    </p>
                  </div>

                  {/* View Profile Button */}
                  <Button variant="outline" className="w-full">
                    View Profile
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first patient'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Patient
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {mockPatients.filter(p => p.status === 'active').length}
                </div>
                <p className="text-sm text-gray-600">Active Patients</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {mockPatients.filter(p => p.status === 'at-risk').length}
                </div>
                <p className="text-sm text-gray-600">At Risk</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(mockPatients.reduce((acc, p) => acc + p.adherenceRate, 0) / mockPatients.length)}%
                </div>
                <p className="text-sm text-gray-600">Avg Adherence</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mockPatients.filter(p => p.painTrend === 'improving').length}
                </div>
                <p className="text-sm text-gray-600">Improving</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
