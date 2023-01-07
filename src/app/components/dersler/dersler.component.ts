import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Ders } from 'src/models/Ders';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/service/auth.service';





@Component({
  selector: 'app-dersler',
  templateUrl: './dersler.component.html',
  styleUrls: ['./dersler.component.scss']
})
export class DerslerComponent implements OnInit {
  dersler!: Ders[];
  dersKayit!: Ders;
  modal!: Modal;
  modalBaslik: string = "";
  secDers!: Ders;


  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    dersadi: new FormControl(),
    derskredi: new FormControl(),
    dersdetail: new FormControl(),
  });


  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService
  ) { }

  ngOnInit(): void {

    this.DersGetir();

        //Sayfa Güvenligini burdda kontrol ediyoruz
        if (this.authService.OturumKontrol() == false) {
          location.href = "/giris";
        }
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ders Ekle";
    this.modal.show();
  }
  Duzenle(ders: Ders, el: HTMLElement) {
    this.frm.patchValue(ders);
    this.modalBaslik = "Ders Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ders: Ders, el: HTMLElement) {
    this.secDers = ders;
    this.modalBaslik = "Ders Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  dersEkleDuzenle() {
    var ders: Ders = this.frm.value
    var tarih = new Date();

    if (!ders.id) {
      ders.kayittarihi = tarih.getTime().toString();
      ders.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.DersEkle(ders).then(e => {
        this.DersGetir();
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
      ders.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.DersDuzenle(ders).then(e => {
        this.DersGetir();
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


  DersSil() {
    this.afs.DersSil(this.secDers.id!).then(e => {
      this.DersGetir();
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


  DersGetir() {
    this.afs.DersGetir().subscribe((data: any) => {
      this.dersler = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          dersadi: e.payload.doc.data().dersadi,
          derskredi: e.payload.doc.data().derskredi,
          detail: e.payload.doc.data().detail,
          ...e.payload.doc.data()

        } as Ders
      });
    })
  }

}
