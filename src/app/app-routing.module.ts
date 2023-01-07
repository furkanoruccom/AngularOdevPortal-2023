import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DerslerComponent } from './components/dersler/dersler.component';
import { OdevDetayComponent } from './components/odev-detay/odev-detay.component';
import { OdevlerComponent } from './components/odevler/odevler.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from 'src/service/auth.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: "dersler",
    component: DerslerComponent,
  },
  { path: "odevler", component: OdevlerComponent },
  { path: "odevDetay/:id", component: OdevDetayComponent },
  { path: "giris", component: LoginComponent },

  
  {
    path: "anasayfa",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
