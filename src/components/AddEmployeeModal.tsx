import React, { useState } from 'react';
import { useStore } from '../store';

export const AddEmployeeModal = () => {
  const { groups, setAddModalOpen, addEmployee } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    sfz: '',
    bz: '',
  });

  const extractInfo = (text: string) => {
    // 提取姓名
    const nameMatch = text.match(/(?:姓名[：:]\s*)([\u4e00-\u9fa5a-zA-Z]+)/);
    // 提取电话
    const phoneMatch = text.match(/(?:电话[：:]\s*)([0-9-+()（）]{5,})/);
    //提取身份证
    const sfzMatch = text.match(/\b(\d{17}[\dXx])\b/);
    console.log('Name Match:', nameMatch);
    console.log('Phone Match:', phoneMatch);
    console.log('SFZ Match:', sfzMatch);
    setFormData(prev => ({
      ...prev,
      name: nameMatch?.[1] || prev.name,
      phone: phoneMatch?.[1] || prev.phone,
      sfz: sfzMatch?.[0] || prev.sfz,
    }));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text');
    extractInfo(text);
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee(formData);
    setAddModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">添加员工</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            粘贴员工信息（自动识别）
          </label>
          <textarea
            className="w-full h-32 p-2 border rounded-md focus:border-blue-500 focus:ring-blue-500"
            placeholder="直接粘贴包含员工信息的文本，例如：
姓名：张三
电话：13800138000"
            onPaste={handlePaste}
          ></textarea>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">姓名</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">电话</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
         <div>
            <label className="block text-sm font-medium text-gray-700">身份证号码</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.sfz}
              onChange={e => setFormData({ ...formData, sfz: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">备注</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.bz}
              onChange={e => setFormData({ ...formData, bz: e.target.value })}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};