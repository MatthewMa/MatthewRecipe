import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Western Dishes', 'Western style dishes.',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',
      [
        new Ingredient('potato', 5),
        new Ingredient('tomato', 3),
        new Ingredient('onion', 2),
        new Ingredient('pork', 3)
      ]),
    new Recipe('Potato Bean', 'Potato with beans.',
      'https://www.inspiredtaste.net/wp-content/uploads/2018/12/Sauteed-Zucchini-Recipe-1-1200-1024x683.jpg',
      [
        new Ingredient('potato', 4),
        new Ingredient('red bean', 2),
        new Ingredient('leek', 2),
        new Ingredient('chicken', 3)
      ])
  ];
  recipeChanged = new Subject<Recipe[]>();
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  getRecipeById(id: number): any {
    return this.recipes.slice()[id];
  }
  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
