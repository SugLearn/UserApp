import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { CanDeactivateGuard } from './guard/can-deactivate.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path:'user', component: UserComponent , canDeactivate: [CanDeactivateGuard]},
  { path:'user/:id', component: UserComponent, canDeactivate: [CanDeactivateGuard]},
  { path:'user-detail/:id', component: UserDetailComponent},
  { path:'user-list', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
