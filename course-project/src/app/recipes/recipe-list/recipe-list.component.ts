import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  // recipes: Recipe[] = [
  // new Recipe(
  // 'A Test Recipe',
  // 'This is simply a test',
  // 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
  // ),
  // new Recipe(
  // 'Another Test Recipe',
  // 'This is simply a test',
  // 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'
  // ),
  // ];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Get a copy of our recipes from the service
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  // this.recipeWasSelected.emit(recipe);
  // }
}
