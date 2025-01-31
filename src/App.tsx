import React from 'react';
import { EmployeeList } from './components/EmployeeList';
import { BottomNavigation } from './components/BottomNavigation';
import { AddEmployeeModal } from './components/AddEmployeeModal';
import { useStore } from './store';

function App() {
  const { isAddModalOpen } = useStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">员工管理系统</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <EmployeeList />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Modals */}
      {isAddModalOpen && <AddEmployeeModal />}
    </div>
  );
}

export default App;