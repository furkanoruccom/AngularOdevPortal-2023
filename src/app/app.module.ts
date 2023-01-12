import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DerslerComponent } from './components/dersler/dersler.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';
import { OdevlerComponent } from './components/odevler/odevler.component';
import { OdevDetayComponent } from './components/odev-detay/odev-detay.component';
import { LoginComponent } from './components/login/login.component';
import { getAuth } from '@firebase/auth';
import { RouteReuseStrategy } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { HomeComponent } from './components/home/home.component';
import { KullanicilarComponent } from './components/kullanicilar/kullanicilar.component';


@NgModule({
  declarations: [
    AppComponent,
    DerslerComponent,  
    OdevlerComponent,
    OdevDetayComponent,
    LoginComponent,
    HomeComponent,
    KullanicilarComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
  
    


  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideAuth(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function provideFirestore(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function provideStorage(arg0: () => any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

function getFirestore(): any {
  throw new Error('Function not implemented.');
}

