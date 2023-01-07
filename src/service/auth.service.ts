
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, createUserWithEmailAndPassword } from '@firebase/auth';
import { from, switchMap } from 'rxjs';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken:string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})  
export class AuthService {
  isLogged: boolean = false;
  aktifUye: any = null;



  constructor(
    public firebaseAuth: AngularFireAuth,
    ) { }

  get authState() {
    return this.firebaseAuth.authState;
  }




  async KullaniciGiris(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {  
      this.isLogged = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      location.href = "/odevler";
    })
    
  }
  async kullaniciKayit(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLogged = true;
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }


  OturumKontrol() {
    if (localStorage.getItem("user")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("user")) {
      this.aktifUye = localStorage.getItem("user") || "";
      // var admin = localStorage.getItem("admin") || "0";
      // this.aktifUye.admin = parseInt(admin);
    }
  }
  OturumKapat() {
    localStorage.clear();
    this.firebaseAuth.signOut();
    location.href = "/";
  }




  
}
function authState(auth: any) {
  throw new Error('Function not implemented.');
}

