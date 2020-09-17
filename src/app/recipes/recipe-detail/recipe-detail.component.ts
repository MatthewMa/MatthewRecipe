import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;
  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute,
              private recipeService: RecipeService, private router: Router) { }
  ngOnInit(): void {
    // this.recipe = this.recipeService.getRecipeById(this.route.snapshot.params.id);
    this.route.params.subscribe((params: Params) => {
      this.recipeId = + params.id;
      this.recipe = this.recipeService.getRecipeById(+params.id);
    });
  }

  toShoppingList(): void {
    this.shoppingListService.addIngredientsFromRecipe(this.recipe.ingredients);
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
