import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from './shared/guards/is-auth.guard';

const routes: Routes = [
  {
    path: "auth", loadChildren: () => import("../app/auth/auth.module").then(x => x.AuthModule),
  },
  {
    path: "home",canActivate:[IsAuthGuard],loadChildren: () => import("../app/home/home.module").then(x => x.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
