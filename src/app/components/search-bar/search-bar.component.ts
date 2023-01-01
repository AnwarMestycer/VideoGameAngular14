import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
private _cart: Cart = {items: []};
itemsQuantity = 0;
@Input()
get cart():Cart{
  return this._cart;
}
set cart(cart: Cart){
  this._cart = cart;
  this.itemsQuantity = cart.items
  .map((item) => item.quantity)
  .reduce((prev, current) => prev + current, 0)
}
  constructor(private router:Router, private cartService:CartService) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm){
    this.router.navigate(['search', form.value.search])
  }

  getTotal(items : Array<CartItem>): number{
    return this.cartService.getTotal(items);
  }
  clearCart(){
    return this.cartService.clearCart();
  }

}
