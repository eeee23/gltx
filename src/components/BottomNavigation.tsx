import React from 'react';
import { useStore } from '../store';
import { FiUsers, FiUserPlus, FiGrid } from 'react-icons/fi';

export const BottomNavigation = () => {
  const { setSelectedGroup, setAddModalOpen } = useStore();

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
          >
            <FiUserPlus className="h-6 w-6" />
            <span className="text-sm">添加员工</span>
          </button>
        </div>
      </div>
    </nav>
  );
};