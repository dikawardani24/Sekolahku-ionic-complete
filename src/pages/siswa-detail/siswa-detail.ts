import { Siswa } from './../../models/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SiswaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-siswa-detail',
  templateUrl: 'siswa-detail.html',
})
export class SiswaDetailPage {
  siswa: Siswa = new Siswa()

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.catchData()
  }

  private catchData() {
    let receivedData = this.navParams.get("siswa")

    console.log(JSON.stringify(receivedData));
    
    if (receivedData != undefined) {
      this.siswa = receivedData
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SiswaDetailPage');
  }

}
