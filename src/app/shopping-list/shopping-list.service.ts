import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomato', 10)
  ];
  getIngredients(): any{
    return this.ingredients.slice();
  }
  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredientsFromRecipe(ingredientsFromRecipe: Ingredient[]): void {
    ingredientsFromRecipe.forEach((item) => {
      if (this.ingredients.some((ingredient) => ingredient.name.toLowerCase() === item.name.toLowerCase())){
        this.ingredients.find((ingredient) => ingredient.name.toLowerCase() === item.name.toLowerCase()).amount += item.amount;
      } else {
        this.ingredients.push(item);
      }
    });
    // this.ingredients = this.ingredients.concat(ingredientsFromRecipe);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
