import { SiswaResponse } from './../../api/siswa-response';
import { MyApp } from './../../app/app.component';
import { SiswaDatasource } from './../../database/siswa-datasource';
import { SiswaDetailPage } from './../siswa-detail/siswa-detail';
import { SiswaFormPage } from './../siswa-form/siswa-form';
import { Siswa } from './../../models/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { StorageMode } from '../../helpers/type-helpers';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the SiswaListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-siswa-list',
  templateUrl: 'siswa-list.html',
})
export class SiswaListPage {
  siswaList: Siswa[] = []
  titlePage: string = ""

  constructor(private myApp: MyApp, private http: HTTP, 
    public navCtrl: NavController, public navParams: NavParams,
    private toastCtrl: ToastController, private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController) {
    this.titlePage = (myApp.dataMode == StorageMode.LOCAL) ? "Sekolah Ku (SQLite)" : "Sekolah Ku (Web Service)"
  }

  private showToast(pesan: string) {
    let toast = this.toastCtrl.create({
      message: pesan,
      duration: 2000,
      position: "bottom",
      showCloseButton: true,
      closeButtonText: "X"
    })

    toast.present()
  }

  private showLoading(pesan: string): Loading {
    let loading = this.loadingCtrl.create({
      content: pesan,
      dismissOnPageChange: true
    })

    loading.present()
    return loading
  }

  private deleteFromSqlite(selectedSiswa: Siswa) {
    let fullname = selectedSiswa.namaDepan + " " + selectedSiswa.namaBelakang
    let datasource = new SiswaDatasource()

    datasource.delete(selectedSiswa).then(result => {
      let positionOfSelectedSiswa = this.siswaList.indexOf(selectedSiswa)
      this.siswaList.splice(positionOfSelectedSiswa, 1)
      this.showToast(fullname + " berhasil dihapus")
      console.log("Delete result : " + JSON.stringify(result));

    }).catch(error => {
      this.showToast(fullname + " gagal dihapus")
      console.error("Delete error : " + JSON.stringify(error));

    })
  }

  private deleteFromHttp(selectedSiswa: Siswa) {
    let response = new SiswaResponse(this.http)
    let self = this

    response.delete(selectedSiswa).then((result) => {
      console.log("Delete http result : " + JSON.stringify(result));

      if (result.success) {
        self.showToast("Data siswa berhasil dihapus")
        let positionOfSelectedSiswa = this.siswaList.indexOf(selectedSiswa)
        this.siswaList.splice(positionOfSelectedSiswa, 1)
      } else {
        self.showToast("Data siswa gagal dihapus")
      }

    }).catch((error) => {
      console.error("Delete http error : " + JSON.stringify(error));
      this.showToast("Upps, something went wrong")
    })
  }

  private delete(selectedSiswa: Siswa) {
    if (this.myApp.dataMode == StorageMode.LOCAL) {
      this.deleteFromSqlite(selectedSiswa)
    } else {
      this.deleteFromHttp(selectedSiswa)
    }
  }

  showConfirmationDelete(selectedSiswa: Siswa) {
    let fullname = selectedSiswa.namaDepan + " " + selectedSiswa.namaBelakang
    let alert = this.alertCtrl.create({
      title: "Hapus Data Siswa",
      message: "Yakin hapus data siswa dengan nama <strong>" + fullname + "</strong>?",
      buttons: [
        { text: "Ya", handler: evt => this.delete(selectedSiswa) },
        { text: "Tidak" }
      ]
    })

    alert.present()
  }

  startAddSiswaPage() {
    this.navCtrl.push(SiswaFormPage)
  }

  startUpdateSiswaPage(selectedSiswa: Siswa) {
    this.navCtrl.push(SiswaFormPage, {
      siswa: selectedSiswa
    })
  }

  startDetailSiswaPage(selectedSiswa: Siswa) {
    this.navCtrl.push(SiswaDetailPage, {
      siswa: selectedSiswa
    })
  }

  private loadDataSqlite() {
    let datasource = new SiswaDatasource()

    datasource.findAll().then((result: Siswa[]) => {
      this.siswaList = result
    }).catch(error => {
      console.error("Error load data siswa : " + JSON.stringify(error));
    })
  }

  private loadDataHttp() {
    let response = new SiswaResponse(this.http)

    let loading = this.showLoading("Loading data siswa, please wait...")

    response.getAll().then(result => {
      console.log("GET ALL RESPONSE : " + result.success);

      loading.dismiss()
      if (result.success) {
        this.siswaList = result.data
      } else {
        this.siswaList = []
      }
    }).catch(error => {
      loading.dismiss()
      console.error("Error load data siswa : " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
      this.showToast("Uppss, couldn't load data siswa")
    })
  }

  private loadDataSiswa() {
    if (this.myApp.dataMode == StorageMode.LOCAL) {
      this.loadDataSqlite()
    } else {
      this.loadDataHttp()
    }
  }

  ionViewWillEnter() {
    this.loadDataSiswa()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaListPage');
  }

}
