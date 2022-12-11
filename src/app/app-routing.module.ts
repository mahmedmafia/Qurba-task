import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "auth", loadChildren: () => import("../app/auth/auth.module").then(x => x.AuthModule),
  },
  {
    path: "home", loadChildren: () => import("../app/home/home.module").then(x => x.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
