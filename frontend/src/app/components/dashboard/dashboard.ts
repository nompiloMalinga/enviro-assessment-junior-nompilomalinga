import { Component } from '@angular/core';
import { Portfolio } from "../portfolio/portfolio";
import { WithdrawalHistory } from "../withdrawal-history/withdrawal-history";
import { WithdrawalForm } from "../withdrawal-form/withdrawal-form";
import { MatCardTitle, MatCardModule } from "@angular/material/card";
import { CsvReport } from "../csv-report/csv-report";

@Component({
  selector: 'app-dashboard',
  imports: [Portfolio, WithdrawalHistory, WithdrawalForm, MatCardTitle, MatCardModule, CsvReport],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
  activeView: 'portfolio' | 'withdrawal' | 'history' | 'csv-report' = 'portfolio';

}
