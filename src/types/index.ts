export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contactInfo: {
    phone: string;
    email: string;
    emergencyContact: {
      name: string;
      phone: string;
      relation: string;
    };
  };
  admissionDate: string;
  dischargeDate?: string;
  room: string;
  bed: string;
  medicalHistory: string[];
  allergies: string[];
  currentConditions: string[];
  medications: Medication[];
  dietPlan: string;
  careNotes: CareNote[];
  paymentHistory: Payment[];
  totalDues: number;
  status: 'Active' | 'Discharged';
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes: string;
  prescribedBy: string;
}

export interface CareNote {
  id: string;
  date: string;
  note: string;
  author: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  joiningDate: string;
  salary: number;
  status: 'Active' | 'Inactive';
  paymentHistory: SalaryPayment[];
  contactInfo: {
    phone: string;
    email: string;
  };
}

export interface SalaryPayment {
  id: string;
  date: string;
  amount: number;
  month: string;
  year: number;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  type: 'Room Charges' | 'Medicine' | 'Services' | 'Other';
  description: string;
  paymentMethod: 'Cash' | 'Card' | 'Bank Transfer';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicine' | 'Equipment' | 'Supplies';
  currentStock: number;
  minStock: number;
  unit: string;
  expiryDate?: string;
  supplier: {
    name: string;
    contact: string;
  };
  lastRestocked: string;
}

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  totalStaff: number;
  activeStaff: number;
  pendingDues: number;
  upcomingDischarges: number;
  lowStockItems: number;
  monthlyRevenue: number;
}