import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  // ingredients: Ingredient[] = [
  // new Ingredient('Apples', 5),
  // new Ingredient('Tomatoes', 10),
  // ];

  constructor(private slService: ShoppingListService) {}

  // We should do all tasks which require a bit more heavy lifting
  // or, in general, as a good practice, all initializations in
  // ngOnInit
  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    // Since we are receiving a shallow copy from our ingredients
    // service, we need to listen to an even to tell us
    // that the data has been change, to update our ingredients here
    // in the component in order to reflect this changes in the UI
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    // Since we are using observables subject now, we need to perform
    // a unsubscribe to the subject when the component got destroyed
    this.igChangeSub.unsubscribe();
  }
  // onIngredientAdded(ingredient: Ingredient) {
  // this.ingredients.push(ingredient);
  // }
}
