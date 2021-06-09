// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  // Instead of using EventEmitter, we should use Observables
  // subjects to deal with cross component events, they are
  // better in performance and allow us to use pipes
  // Since this is not decorated with @Output and not part of a
  // component, since we use it for cross component
  // communication through a service, we should use Observables
  // subjects instead
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // Since we are passing a shallow copy of our array, the component
    // have no way to know when the data changed and with that, the
    // array doesn't change. To deal with this, we can emit an event
    // which will inform the component that the data has changed
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // Instead of adding a single ingredient with a map here
    // which would fires a lot of events, we call the
    // addIngredientsToShoppingList instead which will only
    // fire one event
    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
