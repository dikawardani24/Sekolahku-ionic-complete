import { HTTP } from '@ionic-native/http';
import { SiswaResponse } from './../../api/siswa-response';
import { MyApp } from './../../app/app.component';
import { SiswaDatasource } from './../../database/siswa-datasource';
import { Siswa } from './../../models/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Form } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageMode } from '../../helpers/type-helpers';

/**
 * Generated class for the SiswaFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-siswa-form',
  templateUrl: 'siswa-form.html',
})
export class SiswaFormPage {
  pageTitle = ""
  educations: string[] = ["TK", "SD", "SMP", "SMA", "D3", "S1", "S2", "S3"]
  siswa: Siswa = new Siswa()
  siswaFg: FormGroup

  loveMembaca: boolean = false
  loveMenulis: boolean = false
  loveMenggambar: boolean = false

  constructor(private myApp: MyApp, private http: HTTP, 
    public navCtrl: NavController, public navParams: NavParams, 
    private toastCtrl: ToastController) {
    this.initValidation()
    this.catchDataSiswa()
  }

  private setLastSelectedHobiesOf(siswa: Siswa) {
    let lastSelectedHobi = siswa.hobies

    if (lastSelectedHobi.indexOf("Membaca") >= 0) {
      this.loveMembaca = true
    }

    if (lastSelectedHobi.indexOf("Menulis") >= 0) {
      this.loveMenulis = true
    }

    if (lastSelectedHobi.indexOf("Menggambar") >= 0) {
      this.loveMenggambar = true
    }
  }

  private catchDataSiswa() {
    let receivedData = this.navParams.get("siswa")

    if (receivedData != undefined) {
      this.pageTitle = "Update Data Siswa"
      this.siswa = receivedData
      this.setLastSelectedHobiesOf(this.siswa)
    } else {
      this.pageTitle = "Tambah Data Siswa"
    }
  }

  private initValidation() {
    let namaFc = new FormControl()

    this.siswaFg = new FormGroup({
      tglLahirFc: new FormControl(this.siswa.tglLahir, Validators.required),
      alamatFc: new FormControl(this.siswa.alamat, Validators.required),
      genderFc: new FormControl(this.siswa.gender, Validators.required),
      jenjangFc: new FormControl(this.siswa.jenjang, Validators.required),
      hobiesFc: new FormControl(this.siswa.hobies, Validators.nullValidator),

      namaDepanFc: new FormControl(this.siswa.namaBelakang, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
      ])),

      namaBelakangFc: new FormControl(this.siswa.namaBelakang, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
      ])),

      noHpFc: new FormControl(this.siswa.noHp, Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(13),
        Validators.pattern("([(+]*[0-9]+[()+. -]*)")
      ])),

      emailFc: new FormControl(this.siswa.email, Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
      ])),

    })
  }

  showToast(pesan: string) {
    let toast = this.toastCtrl.create({
      message: pesan,
      duration: 2000,
      position: 'bottom',
      closeButtonText: "X",
      showCloseButton: true
    })

    toast.present()
  }

  private getSelectedHobies(): string {
    let selectedHobies: string[] = []

    if (this.loveMembaca) {
      selectedHobies.push("Membaca")
    }

    if (this.loveMenulis) {
      selectedHobies.push("Menulis")
    }

    if (this.loveMenggambar) {
      selectedHobies.push("Menggambar")
    }

    return selectedHobies.join(", ")
  }

  private saveToSqlite() {
    let datasource = new SiswaDatasource()
    let self = this

    this.siswa.hobies = this.getSelectedHobies()
    datasource.save(this.siswa).then((result) => {
      console.log("Insert result : " + JSON.stringify(result));
      self.showToast("Data siswa berhasil disimpan")
      self.navCtrl.pop()
    }).catch((error) => {
      console.error("Insert error : " + JSON.stringify(error));
      self.showToast("Data siswa gagal disimpan")
    })
  }

  private updateToSqlite() {
    let datasource = new SiswaDatasource()
    let self = this

    this.siswa.hobies = this.getSelectedHobies()
    datasource.update(this.siswa).then((result) => {
      console.log("Update result : " + JSON.stringify(result));
      self.showToast("Data siswa berhasil diperbaharui")
      self.navCtrl.pop()
    }).catch((error) => {
      console.error("Update error : " + JSON.stringify(error));
      self.showToast("Data siswa gagal diperbaharui")
    })
  }

  private saveToHttp() {
    let response = new SiswaResponse(this.http)
    let self = this

    this.siswa.hobies = this.getSelectedHobies()
    response.save(this.siswa).then((result) => {
      console.log("Insert http result : " + JSON.stringify(result));

      if (result.success) {
        self.showToast("Data siswa berhasil disimpan")
        self.navCtrl.pop()
      } else {
        self.showToast("Data siswa gagal disimpan")
      }
      
    }).catch((error) => {
      console.error("Insert http error : " + JSON.stringify(error));
      this.showToast("Upps, something went wrong")
    })
  }

  private updateToHttp() {
    let response = new SiswaResponse(this.http)
    let self = this

    this.siswa.hobies = this.getSelectedHobies()
    response.update(this.siswa).then((result) => {
      console.log("Update http result : " + JSON.stringify(result));

      if (result.success) {
        self.showToast("Data siswa berhasil disimpan")
        self.navCtrl.pop()
      } else {
        self.showToast("Data siswa gagal disimpan")
      }
      
    }).catch((error) => {
      console.error("Update http error : " + JSON.stringify(error));
      this.showToast("Upps, something went wrong")
    })
  }

  private saveNewData() {
    if (this.myApp.dataMode == StorageMode.LOCAL) {
      this.saveToSqlite()
    } else {
      this.saveToHttp()
    }
  }

  private updateData() {
    if (this.myApp.dataMode == StorageMode.LOCAL) {
      this.updateToSqlite()
    } else {
      this.updateToHttp()
    }
  }

  simpan() {
    if (this.siswa.id > 0) {
      this.updateData()
    } else {
      this.saveNewData()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaFormPage');
  }

}
