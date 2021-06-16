import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  // An empty path is part of any route, so, we need to add pathMatch
  // to tell Angular that this should be entire match instead of part
  // it will override the default of prefix and check only if the
  // full path matches
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      // All this children will be loaded attached to
      // the recipes path since they are relative path
      { path: '', component: RecipeStartComponent },
      // We need to be extremely careful with the order.
      // new should come first, otherwise, it will be treated
      // as an id instead of /new
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        // Resolver here to fetch data from a server
        // before it gets rendered
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        // Resolver here to fetch data from a server
        // before it gets rendered
        resolve: [RecipesResolverService],
      },
    ],
  }, // /recipes it will concat with the root path
  { path: 'shopping-list', component: ShoppingListComponent },
];

// This module will bundle the routes together
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  // This will export the routes to be used in other
  // modules that imports this module
  exports: [RouterModule],
})
export class AppRoutingModule {}
