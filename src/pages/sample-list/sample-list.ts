import { RangeSamplePage } from './../range-sample/range-sample';
import { SelectSamplePage } from './../select-sample/select-sample';
import { ButtonSamplePage } from './../button-sample/button-sample';
import { InputSamplePage } from './../input-sample/input-sample';
import { LabelSamplePage } from './../label-sample/label-sample';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'sample-list.html'
})
export class SampleListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  private openPage(page) {
    this.navCtrl.push(page)
  }

  openLabelSample() {
    this.openPage(LabelSamplePage)
  }

  openInputSample() {
    this.openPage(InputSamplePage)
  }

  openButtonSample() {
    this.openPage(ButtonSamplePage)
  }

  openSelectSample() {
    this.openPage(SelectSamplePage)
  }

  openRangeSample() {
    this.openPage(RangeSamplePage)
  }
}
