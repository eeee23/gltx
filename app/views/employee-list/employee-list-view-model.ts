import { Observable, Frame, Dialogs } from '@nativescript/core';
import { DataService } from '../../services/data-service';
import * as utils from '@nativescript/core/utils';

export class EmployeeListViewModel extends Observable {
    private dataService: DataService;
    public employees: any[];
    public groups: any[];
    private selectedGroupId: string = null;

    constructor() {
        super();
        this.dataService = new DataService();
        this.employees = this.dataService.getEmployees();
        this.groups = this.dataService.getGroups();
    }

    onGroupSelect(args) {
        const group = this.groups[args.index];
        this.selectedGroupId = group.id;
        this.employees = this.dataService.getEmployeesByGroup(group.id);
        this.notifyPropertyChange('employees', this.employees);
    }

    onEmployeeTap(args) {
        const employee = this.employees[args.index];
        Dialogs.action({
            message: "选择操作",
            cancelButtonText: "取消",
            actions: ["复制信息", "删除员工"]
        }).then(result => {
            if (result === "复制信息") {
                utils.clipboard.setText(employee.toString());
                Dialogs.alert("员工信息已复制到剪贴板");
            } else if (result === "删除员工") {
                this.dataService.removeEmployee(employee.id);
                this.employees = this.dataService.getEmployees();
                this.notifyPropertyChange('employees', this.employees);
            }
        });
    }

    navigateToAddEmployee() {
        Frame.topmost().navigate({
            moduleName: "views/add-employee/add-employee-page",
            context: {
                selectedGroupId: this.selectedGroupId
            }
        });
    }

    onAllEmployees() {
        this.selectedGroupId = null;
        this.employees = this.dataService.getEmployees();
        this.notifyPropertyChange('employees', this.employees);
    }

    onAddTap() {
        this.navigateToAddEmployee();
    }

    onManageGroups() {
        // For now just show the groups
        this.selectedGroupId = null;
        this.employees = this.dataService.getEmployees();
        this.notifyPropertyChange('employees', this.employees);
    }
}