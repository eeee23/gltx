import { Observable } from '@nativescript/core';

export interface IGroup {
  id: string;
  name: string;
  description: string;
}

export class Group extends Observable implements IGroup {
  id: string;
  name: string;
  description: string;

  constructor(data: IGroup) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
  }
}