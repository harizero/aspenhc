import React from 'react';
import { Users, UserCheck, AlertTriangle, Calendar, Package, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { mockDashboardStats, mockPatients, mockInventory } from '../../data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center">
      <div className={`${color} p-3 rounded-lg mr-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const lowStockItems = mockInventory.filter(item => item.currentStock <= item.minStock);
  const upcomingDischarges = mockPatients.filter(patient => patient.dischargeDate);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to Aspen Foundation Healthcare Management System</p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="bg-blue-500"
          trend="+2 this month"
        />
        <StatCard
          title="Active Staff"
          value={stats.activeStaff}
          icon={UserCheck}
          color="bg-green-500"
          trend="All active"
        />
        <StatCard
          title="Pending Dues"
          value={`$${stats.pendingDues.toLocaleString()}`}
          icon={DollarSign}
          color="bg-red-500"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          color="bg-purple-500"
          trend="+12% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Important Alerts
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <Package className="h-4 w-4 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800">Low Stock Alert</p>
                <p className="text-xs text-red-600">{lowStockItems.length} items below minimum stock</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <Calendar className="h-4 w-4 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Upcoming Discharges</p>
                <p className="text-xs text-yellow-600">{upcomingDischarges.length} patient scheduled for discharge</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Activity className="h-4 w-4 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">System Status</p>
                <p className="text-xs text-blue-600">All systems operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors duration-200">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-blue-900">Add Patient</p>
              <p className="text-xs text-blue-600">Register new patient</p>
            </button>
            <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors duration-200">
              <UserCheck className="h-6 w-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-green-900">Staff Management</p>
              <p className="text-xs text-green-600">Manage staff records</p>
            </button>
            <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors duration-200">
              <DollarSign className="h-6 w-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-purple-900">Process Payment</p>
              <p className="text-xs text-purple-600">Record new payment</p>
            </button>
            <button className="p-4 text-left bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors duration-200">
              <Package className="h-6 w-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium text-orange-900">Update Inventory</p>
              <p className="text-xs text-orange-600">Manage supplies</p>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Active Patients</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-600">Staff on Duty</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">$2,650</p>
            <p className="text-sm text-gray-600">Today's Collections</p>
          </div>
        </div>
      </div>
    </div>
  );
};