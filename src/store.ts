import create from 'zustand';

export interface Employee {
  id: string;
  name: string;
  phone: string;
  groupId: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
}

interface Store {
  employees: Employee[];
  groups: Group[];
  selectedGroupId: string | null;
  isAddModalOpen: boolean;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  removeEmployee: (id: string) => void;
  setSelectedGroup: (groupId: string | null) => void;
  setAddModalOpen: (isOpen: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  employees: [],
  groups: [
    { id: '1', name: '管理层', description: '公司管理团队' },
    { id: '2', name: '技术部', description: '技术研发团队' },
    { id: '3', name: '运营部', description: '运营支持团队' },
  ],
  selectedGroupId: null,
  isAddModalOpen: false,

  addEmployee: (employee) =>
    set((state) => ({
      employees: [
        ...state.employees,
        { ...employee, id: Date.now().toString() },
      ],
    })),

  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),

  setSelectedGroup: (groupId) =>
    set({ selectedGroupId: groupId }),

  setAddModalOpen: (isOpen) =>
    set({ isAddModalOpen: isOpen }),
}));