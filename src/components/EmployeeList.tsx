import React from 'react';
import { useStore } from '../store';
import { FiCopy, FiTrash2 } from 'react-icons/fi';

export const EmployeeList = () => {
  const { employees, groups, selectedGroupId, removeEmployee } = useStore();

  const filteredEmployees = selectedGroupId
    ? employees.filter(emp => emp.groupId === selectedGroupId)
    : employees;

  const copyEmployeeInfo = (employee: any) => {
    const info = `
姓名: ${employee.name}
电话: ${employee.phone}
身份证号: ${employee.sfz}
备注: ${employee.bz}
    `.trim();
    navigator.clipboard.writeText(info);
    alert('员工信息已复制到剪贴板');
  };

  return (
    <div>
      {/* Employee List */}
      <div className="space-y-4">
        {filteredEmployees.map(employee => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-gray-600">电话：{employee.phone}</p>
                <p className="text-gray-600">身份证号：{employee.sfz}</p>
                <p className="text-gray-600">备注：{employee.bz}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyEmployeeInfo(employee)}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="复制信息"
                >
                  <FiCopy />
                </button>
                <button
                  onClick={() => removeEmployee(employee.id)}
                  className="p-2 hover:bg-gray-100 rounded text-red-500"
                  title="删除员工"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};