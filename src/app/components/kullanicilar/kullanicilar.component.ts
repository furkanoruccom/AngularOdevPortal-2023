import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Ders } from 'src/models/Ders';
import { Kullanicilar } from 'src/models/Kullanicilar';
import { AuthService } from 'src/service/auth.service';
import { FsApiService } from 'src/service/fs-api.service';

@Component({
  selector: 'app-kullanicilar',
  templateUrl: './kullanicilar.component.html',
  styleUrls: ['./kullanicilar.component.scss']
})
export class KullanicilarComponent implements OnInit {
  kullanicilar!: Kullanicilar[];
  modal!: Modal;
  modalBaslik: string = "";
  secKullanici!: Kullanicilar;


  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    mail: new FormControl(),
    password: new FormControl(),
  });
  route: any;
  isSingIn =  false;


  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService



  ) { }

  ngOnInit(): void {

    //Sayfa Güvenligini burdda kontrol ediyoruz
    if (this.authService.OturumKontrol() == false) {
      location.href = "/giris";
    }
    this.KullaniciGetir();

  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Odev Ekle";
    this.modal.show();
  }
  Duzenle(kullanici: Kullanicilar, el: HTMLElement) {
    this.frm.patchValue(kullanici);
    this.modalBaslik = "kullanici Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(odev: Kullanicilar, el: HTMLElement) {
    this.secKullanici = odev;
    this.modalBaslik = "Ders Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  async kullaniciEkleDuzenle() {

    var Kullanici: Kullanicilar = this.frm.value

    if (Kullanici.mail != "" || Kullanici.password != "") {

      await this.authService.kullaniciKayit(Kullanici.mail, Kullanici.password)
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
    else {
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



    if (!Kullanici.id) {

      this.afs.KullaniciEkle(Kullanici).then(e => {
        this.modal.toggle();
        this.toastr.success('Başarılı Bir Şekilde Eklendi', {
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
      });
    }
    else {
      // Kullanici.duzenlenmetarihi = tarih.getTime().toString();

      this.afs.KullaniciDuzenle(Kullanici).then(e => {

        this.modal.toggle();
        this.toastr.success('Başarılı Bir Şekilde Güncellendi', {
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
      });
    }
  }

  KullaniciGetir() {

    this.afs.KullaniciGetir().subscribe((data: any) => {
      this.kullanicilar = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data().odevadi,
          ...e.payload.doc.data()

        } as Kullanicilar
      });
    })


  }



  KullaniciSil() {
    this.afs.KullaniciSil(this.secKullanici.id!).then(e => {

      this.modal.toggle();
      this.toastr.success('Başarılı Bir Şekilde Silin', {
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
    });
  }



}
