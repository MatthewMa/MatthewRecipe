import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangedSubscription: Subscription;
  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangedSubscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  newRecipe(): void {
    this.router.navigate(['/recipes/new']);
  }

  ngOnDestroy(): void {
    this.recipeChangedSubscription.unsubscribe();
  }
}
