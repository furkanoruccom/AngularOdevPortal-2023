import { Component, OnInit } from '@angular/core';
import { FsApiService } from 'src/service/fs-api.service';
import { Ders } from 'src/models/Ders';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Odev } from 'src/models/Odev';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-odev-detay',
  templateUrl: './odev-detay.component.html',
  styleUrls: ['./odev-detay.component.scss']
})
export class OdevDetayComponent implements OnInit {
  odevDetay: Odev = new Odev();
  OdevId!: string;
  

  constructor(
    public afs: FsApiService,
    public route: ActivatedRoute
  ) { }


  ngOnInit() {
    
    // this.OdevId = this.route.snapshot.params['id'];
    this.route.params.subscribe((p: any) => {
        this.OdevId = p.id;
    });
    this.OdevListele();



  }
  
  OdevListele() {
    this.afs.DetayByOdevId(this.OdevId).subscribe(d =>{
      d.forEach((e: any) => {
        this.odevDetay = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Odev)
        } as Odev;
      });
    });
    
  }
}


