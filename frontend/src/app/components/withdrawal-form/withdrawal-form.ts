import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WithdrawalService } from '../../service/withdrawal-service';
import { creatWithdrawal } from '../../models/withdrawal';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Investor, Products } from '../../models/investor';
import { InvestorService } from '../../service/investor-service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-withdrawal-form',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatInputModule, FormsModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './withdrawal-form.html',
  styleUrl: './withdrawal-form.css',
})
export class WithdrawalForm implements OnInit {

  loading = false;
  errorMessage = '';
  successMessage = '';

  withdrawalForm!: FormGroup;
  investors: Investor[] = [];
  products: Products[] = [];

  constructor(private withdrawalService: WithdrawalService, private fb: FormBuilder, private investorService: InvestorService) { }

  ngOnInit(): void {
    this.withdrawalForm = this.fb.group({
      investorId: ['', Validators.required],
      productId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.loadInvestors();

    this.withdrawalForm.get('investorId')?.valueChanges.subscribe(id => {
      this.onInvestorChange(id);
    });
  }

  onSubmit() {
    if (this.withdrawalForm.invalid) {
      this.withdrawalForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const withdrawal: creatWithdrawal = {
      investorId: Number(this.withdrawalForm.value.investorId),
      productId: Number(this.withdrawalForm.value.productId),
      amount: Number(this.withdrawalForm.value.amount)
    };

    this.withdrawalService.processWithdrawal(withdrawal).subscribe({

      next: () => {
        this.loading = false;
        this.successMessage = 'Withdrawal processed successfully.';
        this.withdrawalForm.reset();
      },

      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message;
      }

    });

  }

  loadInvestors() {
    this.investorService.getAllInvestors().subscribe({
      next: (data) => {
        this.investors = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  onInvestorChange(investorId: number) {

    const investor = this.investors.find(
      investor => investor.id === Number(investorId)
    );

    this.products = investor?.products ?? [];

    this.withdrawalForm.patchValue({
      productId: ''
    });

  }

  

}


