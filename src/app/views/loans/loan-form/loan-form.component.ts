import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-loan-form',
    templateUrl: './loan-form.component.html'
})
export class LoanFormComponent implements OnInit {
    public itemForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<LoanFormComponent>,
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
            phone: [item.phone || ''],
            address: [item.address || ''],
            balance: [item.balance || ''],
            totalLoan: [item.totalLoan || ''],
            interestRate: [item.interestRate || ''],
            duration: [item.duration || ''],
            isActive: [item.isActive || false]
        })
    }

    submit() {
        this.dialogRef.close(this.itemForm.value)
    }
}
