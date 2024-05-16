import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { AddTokenInterceptor } from '../../utils/add-token.interceptor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  constructor(private _productService: ProductService, private http: HttpClient){}

  ngOnInit(): void{
    console.log("Holaaaaaaaaaaaaaa");
    this.getProducts();

    // this.AddTokenInterceptor();
  }

  // AddTokenInterceptor(){
  //   this._productService.AddTokenInterceptor().subscribe(data => {

      
      
  //   })
  

  getProducts(){
    this._productService.getProducts().subscribe(data => {

        
      
    })
  }


}


