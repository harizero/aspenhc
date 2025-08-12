import React, { useState } from 'react';
import { Login } from './components/Auth/Login';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { Dashboard } from './components/Dashboard/Dashboard';
import { PatientsList } from './components/Patients/PatientsList';
import { PatientDetail } from './components/Patients/PatientDetail';
import { StaffManagement } from './components/Staff/StaffManagement';
import { BillingManagement } from './components/Billing/BillingManagement';
import { InventoryManagement } from './components/Inventory/InventoryManagement';
import { ReportsManagement } from './components/Reports/ReportsManagement';
import { Patient } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setSelectedPatient(null);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedPatient(null);
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView('patient-detail');
  };

  const handlePatientUpdate = (patient: Patient) => {
    // In a real application, this would update the database
    console.log('Updating patient:', patient);
  };

  const handleBackToPatients = () => {
    setSelectedPatient(null);
    setCurrentView('patients');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      <div className="flex">
        <Navigation currentView={currentView} onViewChange={handleViewChange} />
        <main className="flex-1">
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'patients' && (
            <PatientsList onPatientSelect={handlePatientSelect} />
          )}
          {currentView === 'patient-detail' && selectedPatient && (
            <PatientDetail
              patient={selectedPatient}
              onBack={handleBackToPatients}
              onUpdate={handlePatientUpdate}
            />
          )}
          {currentView === 'staff' && <StaffManagement />}
          {currentView === 'billing' && <BillingManagement />}
          {currentView === 'inventory' && <InventoryManagement />}
          {currentView === 'reports' && <ReportsManagement />}
        </main>
      </div>
    </div>
  );
}

export default App;