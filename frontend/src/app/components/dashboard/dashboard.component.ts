import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  listProduct: Product[]=[]; 
  listPokemon: Pokemon[] = [];

  constructor(private _productService: ProductService, private http: HttpClient, private _pokemonService: PokemonService){}

  ngOnInit(): void {
    this.getProducts();
    this.getPokemon();
  }

  getPokemon(){
    this._pokemonService.getPokemons().subscribe(data=>{

      

      this.listPokemon=data;
    })
  }


getProducts(){
  this._productService.getProducts().subscribe(data=>{
    this.listProduct=data;
  })
}



}


