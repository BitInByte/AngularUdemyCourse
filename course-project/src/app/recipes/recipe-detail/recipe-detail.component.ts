import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // This will only work for the first time we load the component
    // Since it will always be on the screen, since it is a children,
    // we need to react to the event of changing dynamically
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      // We add the plus, to convert it from a string to an number
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    // Since we are already in the component with an id,
    // we just only need to attach the /edit in the path
    this.router.navigate(['edit'], { relativeTo: this.route });
    // This could be another solution to
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
}
