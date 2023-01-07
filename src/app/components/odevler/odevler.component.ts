import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Ders } from 'src/models/Ders';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Odev } from 'src/models/Odev';
import { AuthService } from 'src/service/auth.service';





@Component({
  selector: 'app-odevler',
  templateUrl: './odevler.component.html',
  styleUrls: ['./odevler.component.scss']
})
export class OdevlerComponent implements OnInit {
  odevler!: Odev[];
  dersler!: Ders[];
  odevKayit!: Odev;
  modal!: Modal;
  modalBaslik: string = "";
  secOdev!: Odev;
  dersId: string = "";


  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    odevadi: new FormControl(),
    detail: new FormControl(),
    dersId: new FormControl(),
  });
  route: any;


  constructor(
    public formBuilder: FormBuilder,
    private afs: FsApiService,
    private authService: AuthService,
    private toastr: HotToastService



  ) { }

  ngOnInit(): void {
    if (this.dersId != "") {
      this.route.params.subscribe((p: any) => {
        if (p.katId) {
          this.dersId = p.dersId;
          this.DersGetir();
        }
      });
    }
    //Sayfa Güvenligini burdda kontrol ediyoruz
    if (this.authService.OturumKontrol() == false) {
      location.href = "/giris";
    }
    this.OdevGetir();
    this.DersGetir();
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Odev Ekle";
    this.modal.show();
  }
  Duzenle(odev: Odev, el: HTMLElement) {
    this.frm.patchValue(odev);
    this.modalBaslik = "Odev Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(odev: Odev, el: HTMLElement) {
    this.secOdev = odev;
    this.modalBaslik = "Ders Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  odevEkleDuzenle() {
    var odev: Odev = this.frm.value
    var tarih = new Date();
    if (!odev.id) {
      odev.kayittarihi = tarih.getTime().toString();
      odev.duzenlenmetarihi = tarih.getTime().toString();
      odev.personelId = "1";
      this.afs.OdevEkle(odev).then(e => {
        this.OdevGetir();
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
      odev.duzenlenmetarihi = tarih.getTime().toString();
      this.afs.OdevDuzenle(odev).then(e => {
        odev.personelId = "1";
        this.OdevGetir();
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


  OdevSil() {
    this.afs.OdevSil(this.secOdev.id!).then(e => {
      this.OdevGetir();
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

  // DersListeleReady() {
  //   this.afs.OdevByIdGetir(this.dersId).subscribe(d => {
  //     this.odevler = d;
  //   });
  // }


  DersSec(dersId: string) {
    this.dersId = dersId;
    this.OdevGetir();
    
  }



  OdevGetir() {
    if (this.dersId != "" && this.dersId != "Tüm Dersler") {
      this.afs.OdevByIdGetir(this.dersId).subscribe((data: any) => {
        this.odevler = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            odevadi: e.payload.doc.data().odevadi,
            detail: e.payload.doc.data().detail,
            ...e.payload.doc.data()

          } as Ders 
        });
      })
    }
    else {
      this.afs.OdevGetir().subscribe((data: any) => {
        this.odevler = data.map((e: any) => {
          return {
            id: e.payload.doc.id,
            odevadi: e.payload.doc.data().odevadi,
            detail: e.payload.doc.data().detail,
            ...e.payload.doc.data()

          } as Ders
        });
      })
    }

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
