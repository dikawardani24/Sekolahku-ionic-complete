import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImagePickerSamplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-picker-sample',
  templateUrl: 'image-picker-sample.html',
})
export class ImagePickerSamplePage {
  imageUri: string = "./assets/icon/ic_person.png"
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private imgPicker: ImagePicker) {

  }

  pickImage() {
    this.imgPicker.getPictures({
      maximumImagesCount: 1,
      outputType: 1
    }).then((results) => {
      this.imageUri = 'data:image/jpeg;base64,' + results[0]
      console.log(JSON.stringify(results));
      // console.error(this.imageUri);
    }, (error) => {
      console.error(JSON.stringify(error));
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagePickerSamplePage');
  }

}
