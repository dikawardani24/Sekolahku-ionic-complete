import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";

/**
 * Generated class for the GeolocationSamplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-geolocation-sample',
  templateUrl: 'geolocation-sample.html',
})
export class GeolocationSamplePage {

  latitude: number = 0
  longitude: number = 0

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoLoc: Geolocation, private alertCtrl: AlertController) {
  }

  private showAlert(pesan: string) {
    let alert = this.alertCtrl.create({
      title: "Uupsss...",
      message: pesan,
      buttons: [{text: "Okay"}]
    })

    alert.present()
  }

  showCurrrentLocation() {
    this.geoLoc.getCurrentPosition().then(position =>  {
      let coordinate = position.coords;

      this.latitude = coordinate.latitude
      this.longitude = coordinate.longitude

    }).catch(error =>  {
      console.error(JSON.stringify(error));
      this.showAlert("I don't know where you are...")
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeolocationSamplePage');
  }


}
