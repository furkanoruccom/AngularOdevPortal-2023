import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ders } from 'src/models/Ders';
import { Odev } from 'src/models/Odev';

@Injectable({
  providedIn: 'root'
})
export class FsApiService {
  OturumKontrol() {
    throw new Error("Method not implemented.");
  }

  constructor(
    private afs: AngularFirestore
  ) { }

  //#region Ders
  DersGetir() {
    return this.afs.collection("dersler").snapshotChanges();
  }
  DersByIdGetir(id: string) {
    return this.afs.collection("dersler").doc(id).valueChanges();
  }
  DersEkle(Ders: Ders) {
    delete Ders.id // burdasın
    return this.afs.collection("dersler").add(Ders);
  }
  DersDuzenle(Ders: Ders) {
    return this.afs.collection("dersler").doc(Ders.id).update(Ders);
  }
  DersSil(id: string) {
    return this.afs.collection("dersler").doc(id).delete();
  }

  //#region Odev
  OdevGetir() {
    return this.afs.collection("odevler").snapshotChanges();
  }
  OdevByIdGetir(id: string) {
    return this.afs.collection("odevler", q => q.where("dersId", "==", id)).snapshotChanges();
  }
  OdevEkle(Odev: Odev) {
    delete Odev.id
    return this.afs.collection("odevler").add(Odev);
  }
  OdevDuzenle(Odev: Odev) {
    return this.afs.collection("odevler").doc(Odev.id).update(Odev);
  }
  OdevSil(id: string) {
    return this.afs.collection("odevler").doc(id).delete();
  }

  //Odev Detay
  DetayByOdevId(OdevId: string){
    return this.afs.collection("odevler", q => q.where("id", "==", OdevId)).snapshotChanges();
  }



}
