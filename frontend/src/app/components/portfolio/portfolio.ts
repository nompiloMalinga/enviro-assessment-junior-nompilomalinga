import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Investor } from '../../models/investor';
import { InvestorService } from '../../service/investor-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule, FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatOption, MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatTableModule, MatIconModule, MatInputModule, FormsModule, MatPaginator, MatOption,MatFormFieldModule,MatSelectModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Investor>([]);

  investorForm!: FormGroup;

  showLoadInvestor = false;
  showPortfolio = false;
  showAllInvestors = false;

  investorId!: number;
  investors: Investor[] = [];

  investor?: Investor;
  displayedColumns: string[] = [
    'id',
    'productType',
    'balance'
  ];

  displayedColumnsInvestors: string[] = [
    'id',
    'name',
    'surname',
    'age',
    'products'
  ];


  constructor(private investorservice: InvestorService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.investorForm = this.fb.group({
      name: ['', Validators.required,Validators.minLength(2),Validators.pattern('^[a-zA-Z ]*$')],
      surname: ['', Validators.required,Validators.minLength(2),Validators.pattern('^[a-zA-Z ]*$')],
      age: ['', Validators.required,Validators.min(1), Validators.max(120)],
      products: this.fb.array([])
    });

    this.addProduct();
    this.loadAllInvestors()
  }

  createProduct(): FormGroup {
    return this.fb.group({
      productType: ['', Validators.required],
      balance: [0, Validators.required]
    });
  }

  get products(): FormArray {
    return this.investorForm.get('products') as FormArray;
  }

  addProduct(): void {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  saveInvestor() {
    this.investorservice.loadInvestors(this.investorForm.value)
      .subscribe({
        next: (response) => {
          alert('Investor loaded successfully');
          this.investorForm.reset();
          this.products.clear();
          this.addProduct();
        },
        error: (err) => alert(err.message)
      });
  }

  loadPortfolio() {
    this.investorservice.getInvestorPortfolio(this.investorId)
      .subscribe({
        next: (response) => {
          this.investor = response;
        },
        error: (err) => alert(err.message)
      });
  }

  loadAllInvestors() {
    this.investorservice.getAllInvestors().subscribe({
      next: (data) => {
        this.investors=data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    });
  }

  toggleLoadInvestor(): void {
    this.showLoadInvestor = !this.showLoadInvestor;
    this.showPortfolio = false;
    this.showAllInvestors = false;
  }

  togglePortfolio(): void {
    this.showPortfolio = !this.showPortfolio;
    this.showLoadInvestor = false;
    this.showAllInvestors = false;
  }

  toggleAllInvestors(): void {
    this.showAllInvestors = !this.showAllInvestors;
    this.showLoadInvestor = false;
    this.showPortfolio = false;
  }

}
