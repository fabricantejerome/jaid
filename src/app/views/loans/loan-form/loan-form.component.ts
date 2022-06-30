import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Loan } from '../interfaces/loan';

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
        this.buildItemForm(this.data.payload);
    }

    buildItemForm(item) {
        this.itemForm = this.fb.group({
            id: [item.id || ''],
            name: [item.name || '', Validators.required],
            email: [item.email || ''],
            mobile: [item.mobile || ''],
            address: [item.address || ''],
            amount: [item.amount || ''],
            interestRate: [item.interestRate || ''],
            totalLoan: [item.totalLoan || ''],
            duration: [item.duration || ''],
            loanDate: [item.loanDate || ''],
            isApproved: [item.isApproved || false]
        })
    }

    applyTotalLoan() {
        const totalLoan = parseFloat(this.itemForm.controls['amount'].value) + 
            (this.itemForm.controls['amount'].value * this.itemForm.controls['interestRate'].value);
            
        this.itemForm.controls['totalLoan'].setValue(totalLoan);
    }

    submit() {
        let loan: Loan;

        loan = {
            id: this.itemForm.get('id').value,
            name: this.itemForm.get('name').value,
            address: this.itemForm.get('address').value,
            amount: parseFloat(this.itemForm.get('amount').value),
            duration: this.itemForm.get('duration').value,
            email: this.itemForm.get('email').value,
            interestRate: parseFloat(this.itemForm.get('interestRate').value),
            loanDate: formatDate(this.itemForm.get('loanDate').value, "yyyy-MM-dd", "en-US").toString(),
            mobile: this.itemForm.get('mobile').value,
            totalLoan: this.itemForm.get('totalLoan').value,
            isApproved: this.itemForm.get('isApproved').value
        }

        this.dialogRef.close(loan);
    }
}
