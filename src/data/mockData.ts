import { Patient, Staff, InventoryItem, DashboardStats } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Eleanor Martinez',
    age: 78,
    gender: 'Female',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'eleanor.martinez@email.com',
      emergencyContact: {
        name: 'Maria Martinez',
        phone: '(555) 987-6543',
        relation: 'Daughter'
      }
    },
    admissionDate: '2024-01-15',
    room: 'A-101',
    bed: 'A',
    medicalHistory: ['Hypertension', 'Diabetes Type 2', 'Arthritis'],
    allergies: ['Penicillin', 'Shellfish'],
    currentConditions: ['Stable diabetes', 'Mild cognitive impairment'],
    medications: [
      {
        id: 'm1',
        name: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2024-01-15',
        notes: 'For diabetes management',
        prescribedBy: 'Dr. Johnson'
      },
      {
        id: 'm2',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2024-01-15',
        notes: 'Blood pressure control',
        prescribedBy: 'Dr. Johnson'
      }
    ],
    dietPlan: 'Diabetic diet - Low sugar, high fiber. Regular meals at 8 AM, 12 PM, 6 PM.',
    careNotes: [
      {
        id: 'c1',
        date: '2024-12-28',
        note: 'Patient had a good day. Participated in morning activities.',
        author: 'Nurse Sarah'
      },
      {
        id: 'c2',
        date: '2024-12-27',
        note: 'Blood sugar levels stable. No complaints.',
        author: 'Nurse Mike'
      }
    ],
    paymentHistory: [
      {
        id: 'p1',
        date: '2024-12-01',
        amount: 2500,
        type: 'Room Charges',
        description: 'December monthly charges',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'p2',
        date: '2024-11-15',
        amount: 150,
        type: 'Medicine',
        description: 'Medication refill',
        paymentMethod: 'Card'
      }
    ],
    totalDues: 300,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Robert Chen',
    age: 82,
    gender: 'Male',
    contactInfo: {
      phone: '(555) 234-5678',
      email: 'robert.chen@email.com',
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '(555) 876-5432',
        relation: 'Son'
      }
    },
    admissionDate: '2024-02-20',
    dischargeDate: '2025-01-15',
    room: 'B-205',
    bed: 'B',
    medicalHistory: ['Heart disease', 'Stroke'],
    allergies: ['Aspirin'],
    currentConditions: ['Recovering from stroke', 'Mild depression'],
    medications: [
      {
        id: 'm3',
        name: 'Clopidogrel',
        dosage: '75mg',
        frequency: 'Once daily',
        startDate: '2024-02-20',
        notes: 'Blood thinner for stroke prevention',
        prescribedBy: 'Dr. Williams'
      }
    ],
    dietPlan: 'Heart-healthy diet - Low sodium, low fat.',
    careNotes: [
      {
        id: 'c3',
        date: '2024-12-28',
        note: 'Physical therapy session completed. Good progress.',
        author: 'PT Rachel'
      }
    ],
    paymentHistory: [
      {
        id: 'p3',
        date: '2024-12-01',
        amount: 2800,
        type: 'Room Charges',
        description: 'December monthly charges with therapy',
        paymentMethod: 'Cash'
      }
    ],
    totalDues: 0,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Dorothy Williams',
    age: 85,
    gender: 'Female',
    contactInfo: {
      phone: '(555) 345-6789',
      email: 'dorothy.williams@email.com',
      emergencyContact: {
        name: 'James Williams',
        phone: '(555) 765-4321',
        relation: 'Nephew'
      }
    },
    admissionDate: '2024-03-10',
    room: 'A-103',
    bed: 'A',
    medicalHistory: ['Dementia', 'Osteoporosis'],
    allergies: ['Latex'],
    currentConditions: ['Moderate dementia', 'Fall risk'],
    medications: [
      {
        id: 'm4',
        name: 'Donepezil',
        dosage: '5mg',
        frequency: 'Once daily',
        startDate: '2024-03-10',
        notes: 'For dementia symptoms',
        prescribedBy: 'Dr. Martinez'
      }
    ],
    dietPlan: 'Regular diet with calcium supplements.',
    careNotes: [
      {
        id: 'c4',
        date: '2024-12-28',
        note: 'Patient confused today. Needs extra supervision.',
        author: 'Nurse Jennifer'
      }
    ],
    paymentHistory: [
      {
        id: 'p4',
        date: '2024-11-30',
        amount: 2200,
        type: 'Room Charges',
        description: 'November monthly charges',
        paymentMethod: 'Bank Transfer'
      }
    ],
    totalDues: 450,
    status: 'Active'
  }
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Head Nurse',
    joiningDate: '2023-01-15',
    salary: 65000,
    status: 'Active',
    contactInfo: {
      phone: '(555) 111-2222',
      email: 'sarah.johnson@aspenfoundation.com'
    },
    paymentHistory: [
      {
        id: 'sp1',
        date: '2024-12-01',
        amount: 5416.67,
        month: 'December',
        year: 2024
      },
      {
        id: 'sp2',
        date: '2024-11-01',
        amount: 5416.67,
        month: 'November',
        year: 2024
      }
    ]
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    role: 'Registered Nurse',
    joiningDate: '2023-05-20',
    salary: 55000,
    status: 'Active',
    contactInfo: {
      phone: '(555) 333-4444',
      email: 'mike.rodriguez@aspenfoundation.com'
    },
    paymentHistory: [
      {
        id: 'sp3',
        date: '2024-12-01',
        amount: 4583.33,
        month: 'December',
        year: 2024
      }
    ]
  },
  {
    id: '3',
    name: 'Jennifer Lee',
    role: 'Care Assistant',
    joiningDate: '2023-08-10',
    salary: 42000,
    status: 'Active',
    contactInfo: {
      phone: '(555) 555-6666',
      email: 'jennifer.lee@aspenfoundation.com'
    },
    paymentHistory: [
      {
        id: 'sp4',
        date: '2024-12-01',
        amount: 3500,
        month: 'December',
        year: 2024
      }
    ]
  },
  {
    id: '4',
    name: 'Rachel Martinez',
    role: 'Physical Therapist',
    joiningDate: '2023-03-05',
    salary: 70000,
    status: 'Active',
    contactInfo: {
      phone: '(555) 777-8888',
      email: 'rachel.martinez@aspenfoundation.com'
    },
    paymentHistory: [
      {
        id: 'sp5',
        date: '2024-12-01',
        amount: 5833.33,
        month: 'December',
        year: 2024
      }
    ]
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Metformin 500mg',
    category: 'Medicine',
    currentStock: 120,
    minStock: 50,
    unit: 'tablets',
    expiryDate: '2025-08-15',
    supplier: {
      name: 'MedSupply Corp',
      contact: '(555) 999-0000'
    },
    lastRestocked: '2024-12-01'
  },
  {
    id: '2',
    name: 'Blood Pressure Monitor',
    category: 'Equipment',
    currentStock: 3,
    minStock: 2,
    unit: 'units',
    supplier: {
      name: 'Medical Equipment Plus',
      contact: '(555) 888-7777'
    },
    lastRestocked: '2024-11-15'
  },
  {
    id: '3',
    name: 'Disposable Gloves',
    category: 'Supplies',
    currentStock: 25,
    minStock: 100,
    unit: 'boxes',
    supplier: {
      name: 'Healthcare Supplies Inc',
      contact: '(555) 666-5555'
    },
    lastRestocked: '2024-12-10'
  },
  {
    id: '4',
    name: 'Lisinopril 10mg',
    category: 'Medicine',
    currentStock: 80,
    minStock: 30,
    unit: 'tablets',
    expiryDate: '2025-06-20',
    supplier: {
      name: 'Pharma Direct',
      contact: '(555) 444-3333'
    },
    lastRestocked: '2024-11-28'
  },
  {
    id: '5',
    name: 'Wheelchairs',
    category: 'Equipment',
    currentStock: 8,
    minStock: 5,
    unit: 'units',
    supplier: {
      name: 'Mobility Solutions',
      contact: '(555) 222-1111'
    },
    lastRestocked: '2024-10-15'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalPatients: 3,
  activePatients: 3,
  totalStaff: 4,
  activeStaff: 4,
  pendingDues: 750,
  upcomingDischarges: 1,
  lowStockItems: 1,
  monthlyRevenue: 12500
};