import { ImagePickerSamplePage } from './../pages/image-picker-sample/image-picker-sample';
import { GeolocationSamplePage } from './../pages/geolocation-sample/geolocation-sample';
import { SessionHelper } from './../helpers/session-helper';
import { UserDataSource } from './../database/user-datasource';
import { SiswaDatasource } from './../database/siswa-datasource';
import { StorageMode } from '../helpers/type-helpers';
import { LoginPage } from './../pages/login/login';
import { SiswaListPage } from './../pages/siswa-list/siswa-list';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SampleListPage } from '../pages/sample-list/sample-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any }>;

  public dataMode: StorageMode = StorageMode.LOCAL

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Component Samples', component: SampleListPage },
      { title: 'Sekolah Ku SQLite', component: SiswaListPage },
      { title: 'Sekolah Ku HTTP', component: SiswaListPage },
      { title: 'Geolocation Sample', component: GeolocationSamplePage },
      { title: 'Image Picker', component: ImagePickerSamplePage },
      { title: "Logout", component: LoginPage }
    ];
  }

  private initRootPage() {
    if (SessionHelper.getInstance().isLoggedIn()) {
      this.rootPage = HomePage
    } else {
      this.rootPage = LoginPage
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.initDatabase()
      this.initRootPage()
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#488aff")
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.title == "Sekolah Ku SQLite") {
      this.dataMode = StorageMode.LOCAL
    } else if (page.title == "Sekolah Ku HTTP") {
      this.dataMode = StorageMode.WEB_SERVICE
    } else if(page.title == "Logout") {
      SessionHelper.getInstance().clearSession()
    }

    this.nav.setRoot(page.component)
  }

  private initDatabase() {
    let siswaDb = new SiswaDatasource()
    let userDb = new UserDataSource()

    siswaDb.onPrepareTable()
    userDb.onPrepareTable()
  }
}
