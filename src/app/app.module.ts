import { ImagePickerSamplePage } from './../pages/image-picker-sample/image-picker-sample';
import { GeolocationSamplePage } from './../pages/geolocation-sample/geolocation-sample';
import { UserRegisterPage } from './../pages/user-register/user-register';
import { LoginPage } from './../pages/login/login';
import { SiswaDetailPageModule } from './../pages/siswa-detail/siswa-detail.module';
import { SiswaDetailPage } from './../pages/siswa-detail/siswa-detail';
import { SiswaFormPageModule } from './../pages/siswa-form/siswa-form.module';
import { SiswaFormPage } from './../pages/siswa-form/siswa-form';
import { SiswaListPageModule } from './../pages/siswa-list/siswa-list.module';
import { SQLite } from '@ionic-native/sqlite';
import { HTTP } from '@ionic-native/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { Geolocation } from '@ionic-native/geolocation';

import { SelectSamplePage } from './../pages/select-sample/select-sample';
import { ButtonSamplePage } from './../pages/button-sample/button-sample';
import { InputSamplePage } from './../pages/input-sample/input-sample';
import { LabelSamplePage } from './../pages/label-sample/label-sample';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SampleListPage } from '../pages/sample-list/sample-list';
import { RangeSamplePage } from '../pages/range-sample/range-sample';
import { SiswaListPage } from '../pages/siswa-list/siswa-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,

    SampleListPage,
    LabelSamplePage, 
    InputSamplePage, 
    ButtonSamplePage, 
    SelectSamplePage, 
    RangeSamplePage,

    LoginPage,
    UserRegisterPage,

    GeolocationSamplePage,
    ImagePickerSamplePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    SiswaListPageModule,
    SiswaFormPageModule,
    SiswaDetailPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    SampleListPage,
    LabelSamplePage,
    InputSamplePage, 
    ButtonSamplePage,
    SelectSamplePage,
    RangeSamplePage, 

    SiswaListPage,
    SiswaFormPage,
    SiswaDetailPage,

    LoginPage,
    UserRegisterPage,

    GeolocationSamplePage,
    ImagePickerSamplePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    SQLite,
    HTTP,
    Geolocation,
    ImagePicker
  ]
})
export class AppModule {}
