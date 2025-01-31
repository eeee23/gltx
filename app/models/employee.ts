import { Observable } from '@nativescript/core';

export interface IEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  groupId: string;
}

export class Employee extends Observable implements IEmployee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  groupId: string;

  constructor(data: IEmployee) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.position = data.position;
    this.department = data.department;
    this.email = data.email;
    this.phone = data.phone;
    this.groupId = data.groupId;
  }

  toString(): string {
    return `Name: ${this.name}\nPosition: ${this.position}\nDepartment: ${this.department}\nEmail: ${this.email}\nPhone: ${this.phone}`;
  }
}