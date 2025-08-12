import React, { useState } from 'react';
import { ArrowLeft, Edit, Save, X, Plus, Calendar, User, Phone, Mail, MapPin, AlertCircle, Pill, FileText, DollarSign, Activity } from 'lucide-react';
import { Patient } from '../../types';
import { format } from 'date-fns';

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
  onUpdate: (patient: Patient) => void;
}

export const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(patient);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSave = () => {
    onUpdate(editedPatient);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'medical', label: 'Medical History', icon: FileText },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'care', label: 'Care Notes', icon: Activity },
    { id: 'billing', label: 'Billing', icon: DollarSign }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Patients
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-gray-600">Patient ID: {patient.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Patient
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {patient.status}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            Room {patient.room}, Bed {patient.bed}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            {patient.age} years old
          </div>
          {patient.totalDues > 0 && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-2" />
              ${patient.totalDues} dues pending
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'overview' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Overview</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Personal Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{patient.name} ({patient.gender})</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{patient.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{patient.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">
                      Admitted: {format(new Date(patient.admissionDate), 'MMMM dd, yyyy')}
                    </span>
                  </div>
                  {patient.dischargeDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-orange-400 mr-3" />
                      <span className="text-sm text-orange-600">
                        Discharge: {format(new Date(patient.dischargeDate), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Emergency Contact</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{patient.contactInfo.emergencyContact.name}</p>
                    <p className="text-sm text-gray-600">{patient.contactInfo.emergencyContact.relation}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-900">{patient.contactInfo.emergencyContact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-3">Diet Plan</h4>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{patient.dietPlan}</p>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Medical History</h4>
                <div className="space-y-2">
                  {patient.medicalHistory.map((condition, index) => (
                    <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm text-blue-800">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Current Conditions</h4>
                <div className="space-y-2">
                  {patient.currentConditions.map((condition, index) => (
                    <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-green-800">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-3">Allergies</h4>
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    <AlertCircle className="inline h-3 w-3 mr-1" />
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h3>
            <div className="space-y-4">
              {patient.medications.map((medication) => (
                <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-md font-medium text-gray-900">{medication.name}</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Dosage:</strong> {medication.dosage}</p>
                      <p><strong>Frequency:</strong> {medication.frequency}</p>
                    </div>
                    <div>
                      <p><strong>Started:</strong> {format(new Date(medication.startDate), 'MMM dd, yyyy')}</p>
                      <p><strong>Prescribed by:</strong> {medication.prescribedBy}</p>
                    </div>
                  </div>
                  {medication.notes && (
                    <div className="mt-3 p-2 bg-gray-50 rounded">
                      <p className="text-sm text-gray-700">{medication.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Notes</h3>
            <div className="space-y-4">
              {patient.careNotes.map((note) => (
                <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-gray-900">{note.author}</p>
                    <p className="text-xs text-gray-500">{format(new Date(note.date), 'MMM dd, yyyy')}</p>
                  </div>
                  <p className="text-sm text-gray-700">{note.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Payments</h3>
            {patient.totalDues > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="text-md font-medium text-red-800 mb-2">Outstanding Dues</h4>
                <p className="text-2xl font-bold text-red-600">${patient.totalDues}</p>
              </div>
            )}
            <h4 className="text-md font-medium text-gray-700 mb-3">Payment History</h4>
            <div className="space-y-3">
              {patient.paymentHistory.map((payment) => (
                <div key={payment.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(payment.date), 'MMM dd, yyyy')} • {payment.paymentMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">${payment.amount}</p>
                    <p className="text-xs text-gray-500">{payment.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};