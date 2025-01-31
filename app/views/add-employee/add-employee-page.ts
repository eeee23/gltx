import { NavigatedData, Page } from '@nativescript/core';
import { AddEmployeeViewModel } from './add-employee-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new AddEmployeeViewModel(page.navigationContext);
}