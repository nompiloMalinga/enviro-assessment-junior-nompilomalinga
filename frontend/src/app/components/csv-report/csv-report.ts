import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatCardContent, MatCardTitle, MatCard } from '@angular/material/card';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatSelectModule, MatOption, MatSelect } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { WithdrawalService } from '../../service/withdrawal-service';
import { InvestorService } from '../../service/investor-service';
import { Investor } from '../../models/investor';
import { MatInputModule } from "@angular/material/input";


@Component({
  selector: 'app-csv-report',
  imports: [MatIcon, MatOption, MatSelect, MatFormField, MatInputModule, MatCardContent, MatCardTitle, MatCard,FormsModule],
  templateUrl: './csv-report.html',
  styleUrl: './csv-report.css',
})
export class CsvReport implements OnInit {

  investors: Investor[] = [];
  selectedInvestorId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private investorService: InvestorService,
    private withdrawalService: WithdrawalService
  ) {}

  ngOnInit(): void {
    this.loadInvestors()
  }


  loadInvestors(): void {
    this.investorService.getAllInvestors().subscribe({
      next: (data) => this.investors = data,
      error: (err) => this.errorMessage = err.message
    });
  }

  downloadCsv(): void {

    

    if (!this.selectedInvestorId) {
      this.errorMessage = 'Please select an investor first.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = ''

    this.withdrawalService.exportCSV(this.selectedInvestorId).subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `withdrawals-${this.selectedInvestorId}.csv`;

        link.click();

        window.URL.revokeObjectURL(url);

      },

      error: (err) => {
        this.errorMessage = err.message;
      }

    });

  }
  
  
}
