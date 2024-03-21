import { Routes } from '@angular/router';
import { RecipesearchComponent } from './pages/recipesearch/recipesearch.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'recipes', component: RecipesearchComponent },
  { path: 'recipes/:id', component: RecipeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];
