import { Observable, Frame, Dialogs } from '@nativescript/core';
import { DataService } from '../../services/data-service';

export class AddEmployeeViewModel extends Observable {
    private dataService: DataService;
    public name: string = "";
    public position: string = "";
    public department: string = "";
    public email: string = "";
    public phone: string = "";
    public groups: any[];
    public selectedGroupIndex: number;

    constructor(navigationContext: any) {
        super();
        this.dataService = new DataService();
        this.groups = this.dataService.getGroups();
        
        if (navigationContext?.selectedGroupId) {
            this.selectedGroupIndex = this.groups.findIndex(
                g => g.id === navigationContext.selectedGroupId
            );
        }
    }

    onSave() {
        if (!this.name || !this.position || !this.department) {
            Dialogs.alert("请填写必要信息");
            return;
        }

        const selectedGroup = this.groups[this.selectedGroupIndex];
        
        this.dataService.addEmployee({
            id: Date.now().toString(),
            name: this.name,
            position: this.position,
            department: this.department,
            email: this.email,
            phone: this.phone,
            groupId: selectedGroup?.id || null
        });

        Frame.topmost().goBack();
    }
}