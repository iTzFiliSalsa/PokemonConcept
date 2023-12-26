import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestGuard } from './shared/guards/test.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule),
    canActivate: [TestGuard]
  },
  {
    path: 'actions',
    loadChildren: () => import("./pages/actions/actions.module").then(m => m.ActionsModule)
  },
  {
    path: 'concept',
    loadChildren: () => import("./pages/concept/concept.module").then(m => m.ConceptModule)
  },
  {
    path: 'menu',
    loadChildren: () => import("./pages/menu/menu.module").then(m => m.MenuModule)
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'menu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
