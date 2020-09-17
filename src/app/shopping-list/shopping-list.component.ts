import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    private subscription: Subscription;
    constructor(private shoppingListService: ShoppingListService) { }
    ngOnInit(): void {
      this.ingredients = this.shoppingListService.getIngredients();
      this.subscription = this.shoppingListService.ingredientChanged.subscribe((items: Ingredient[]) =>{
        this.ingredients = items;
      });
    }

    onIngredientAdded(ingredient: Ingredient): void {
      this.ingredients.push(ingredient);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    onEditItem(i: number): void {
      this.shoppingListService.startedEditing.next(i);
    }
}
