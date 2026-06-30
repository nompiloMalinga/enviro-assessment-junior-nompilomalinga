import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WithdrawalService } from '../../service/withdrawal-service';
import { Withdrawal } from '../../models/withdrawal';
@Component({
  selector: 'app-withdrawal-history',
  imports: [CommonModule,MatCardModule,MatTableModule,MatPaginatorModule],
  templateUrl: './withdrawal-history.html',
  styleUrl: './withdrawal-history.css',
})
export class WithdrawalHistory implements OnInit {

  dataSource = new MatTableDataSource<Withdrawal>([]);

  displayedColumns: string[] = [
    'productId',
    'amount',
    'withdrawalDate',
    'status'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private withdrawalService: WithdrawalService){}

  ngOnInit(): void {
    this.loadHistory();
  
  }


  loadHistory() {
    this.withdrawalService.getWithdrawalHistory().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    });
  }

}
