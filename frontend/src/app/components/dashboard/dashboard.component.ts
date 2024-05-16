import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  listProduct: Product[]=[]; 

  constructor(private _productService: ProductService, private http: HttpClient){}

  ngOnInit(): void {
    this.getProducts();
  }

getProducts(){
  this._productService.getProducts().subscribe(data=>{
    this.listProduct=data;
  })
}


}


