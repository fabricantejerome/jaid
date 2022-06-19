import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
    public itemForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<UserFormComponent>,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.buildItemForm(this.data.payload)
    }

    buildItemForm(item) {
        this.itemForm = this.fb.group({
            name: [item.name || '', Validators.required],
            age: [item.age || ''],
            email: [item.email || ''],
            company: [item.company || ''],
            phone: [item.phone || ''],
            address: [item.address || ''],
            balance: [item.balance || ''],
            isActive: [item.isActive || false]
        })
    }

    submit() {
        this.dialogRef.close(this.itemForm.value)
    }
}
