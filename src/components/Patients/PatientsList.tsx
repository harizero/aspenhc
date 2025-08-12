import React, { useState } from 'react';
import { Search, Eye, Edit, Calendar, MapPin } from 'lucide-react';
import { mockPatients } from '../../data/mockData';
import { Patient } from '../../types';
import { format } from 'date-fns';

interface PatientsListProps {
  onPatientSelect: (patient: Patient) => void;
}

export const PatientsList: React.FC<PatientsListProps> = ({ onPatientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients] = useState(mockPatients);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Management</h2>
        <p className="text-gray-600">Manage patient records and medical information</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name, room, or medication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.age} years old • {patient.gender}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  Room {patient.room}, Bed {patient.bed}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Admitted: {format(new Date(patient.admissionDate), 'MMM dd, yyyy')}
                </div>
                {patient.dischargeDate && (
                  <div className="flex items-center text-sm text-orange-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Discharge: {format(new Date(patient.dischargeDate), 'MMM dd, yyyy')}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Current Conditions:</p>
                <p className="text-sm text-gray-600">{patient.currentConditions.join(', ')}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Active Medications:</p>
                <p className="text-sm text-gray-600">{patient.medications.length} medications</p>
              </div>

              {patient.totalDues > 0 && (
                <div className="mb-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Outstanding Dues</p>
                  <p className="text-lg font-bold text-red-600">${patient.totalDues}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => onPatientSelect(patient)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No patients found matching your search.</p>
        </div>
      )}
    </div>
  );
};