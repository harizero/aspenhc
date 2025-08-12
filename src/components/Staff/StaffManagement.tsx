import React, { useState } from 'react';
import { UserCheck, Search, Plus, DollarSign, Calendar, Phone, Mail } from 'lucide-react';
import { mockStaff } from '../../data/mockData';
import { Staff } from '../../types';
import { format } from 'date-fns';

export const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staff] = useState(mockStaff);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Management</h2>
        <p className="text-gray-600">Manage staff records, salaries, and payments</p>
      </div>

      {/* Search and Add */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Staff Directory</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredStaff.map((member) => (
                <div
                  key={member.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                    selectedStaff?.id === member.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedStaff(member)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-md font-medium text-gray-900">{member.name}</h4>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{member.role}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        Joined: {format(new Date(member.joiningDate), 'MMM yyyy')}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${member.salary.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Annual</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Staff Details */}
        <div>
          {selectedStaff ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Staff Details</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900">{selectedStaff.name}</h4>
                  <p className="text-sm text-gray-600">{selectedStaff.role}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{selectedStaff.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{selectedStaff.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">
                      Joined: {format(new Date(selectedStaff.joiningDate), 'MMMM dd, yyyy')}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="text-md font-medium text-gray-700 mb-3">Salary Information</h5>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">${selectedStaff.salary.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Annual Salary</p>
                    <p className="text-sm text-gray-500 mt-1">
                      ${(selectedStaff.salary / 12).toFixed(2)} monthly
                    </p>
                  </div>
                </div>

                <div>
                  <h5 className="text-md font-medium text-gray-700 mb-3">Recent Payments</h5>
                  <div className="space-y-2">
                    {selectedStaff.paymentHistory.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.month} {payment.year}</p>
                          <p className="text-xs text-gray-500">{format(new Date(payment.date), 'MMM dd, yyyy')}</p>
                        </div>
                        <p className="text-sm font-medium text-green-600">${payment.amount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Process Salary Payment
                  </button>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    View Full Payment History
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a staff member to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};