import { Observable } from '@nativescript/core';
import { IEmployee, Employee } from '../models/employee';
import { IGroup, Group } from '../models/group';

export class DataService extends Observable {
  private employees: Map<string, Employee> = new Map();
  private groups: Map<string, Group> = new Map();

  constructor() {
    super();
    this.initializeGroups();
  }

  private initializeGroups() {
    this.addGroup({
      id: '1',
      name: '管理层',
      description: '公司管理团队'
    });
    this.addGroup({
      id: '2',
      name: '技术部',
      description: '技术研发团队'
    });
    this.addGroup({
      id: '3',
      name: '运营部',
      description: '运营支持团队'
    });
  }

  addEmployee(data: IEmployee): void {
    const employee = new Employee(data);
    this.employees.set(employee.id, employee);
    this.notifyPropertyChange('employees', this.getEmployees());
  }

  removeEmployee(id: string): void {
    this.employees.delete(id);
    this.notifyPropertyChange('employees', this.getEmployees());
  }

  getEmployees(): Employee[] {
    return Array.from(this.employees.values());
  }

  addGroup(data: IGroup): void {
    const group = new Group(data);
    this.groups.set(group.id, group);
    this.notifyPropertyChange('groups', this.getGroups());
  }

  getGroups(): Group[] {
    return Array.from(this.groups.values());
  }

  getEmployeesByGroup(groupId: string): Employee[] {
    return this.getEmployees().filter(emp => emp.groupId === groupId);
  }
}