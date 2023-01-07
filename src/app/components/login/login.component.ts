import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/service/auth.service';
import { FsApiService } from 'src/service/fs-api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSingIn = false;
  constructor(
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService,
  ) { }

  ngOnInit(): void {



  }


  async kullaniciKayit(email: string, password: string) {
    if (email != "" || password != "") {

      await this.authService.kullaniciKayit(email, password)
      if (this.authService.isLogged)
        this.isSingIn = true;
      this.toastr.success('Başarılı Bir Şekilde Kayıt Olundu', {
        duration: 2000,
        style: {
          border: '1px solid #00ff22',
          padding: '16px',
          color: '#00ff22',
        },
        iconTheme: {
          primary: '#00ff22',
          secondary: '#FFFAEE',
        },
      });
    }
    else{
      this.toastr.error('Alanlar Boş Bırakılamaz', {
        duration: 2000,
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: '#00ff22',
          secondary: '#FFFAEE',
        },
      });
    }
  }

  async KullaniciGiris(email: string, password: string) {
    if (email != "" || password != "") {
      await this.authService.KullaniciGiris(email, password)
      if (this.authService.isLogged)
        localStorage.setItem('user', email);
      console.log(this.authService.OturumKontrol());
      this.toastr.success('Başarılı Bir Şekilde Giriş Yapıldı', {
        duration: 2000,
        style: {
          border: '1px solid #00ff22',
          padding: '16px',
          color: '#00ff22',
        },
        iconTheme: {
          primary: '#00ff22',
          secondary: '#FFFAEE',
        },
      });
    }
    else {
      this.toastr.error('Mail Veya Şifre Yanlış', {
        duration: 2000,
        style: {
          border: '1px solid red',
          padding: '16px',
          color: 'red',
        },
        iconTheme: {
          primary: '#00ff22',
          secondary: '#FFFAEE',
        },
      });
    }
  }


  async autState() {
    await this.authService.authState
    if (this.authService.isLogged)
      this.isSingIn = true;
    console.log("Giriş Başarılı");
  }



}
