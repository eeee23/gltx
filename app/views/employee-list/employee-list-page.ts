import { NavigatedData, Page } from '@nativescript/core';
import { EmployeeListViewModel } from './employee-list-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new EmployeeListViewModel();
}

export function onAddTap(args) {
    const viewModel = args.object.page.bindingContext;
    viewModel.navigateToAddEmployee();
}