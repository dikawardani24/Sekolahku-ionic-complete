import { UserRegisterPage } from './../user-register/user-register';
import { SessionHelper } from './../../helpers/session-helper';
import { User } from './../../models/user';
import { UserDataSource } from './../../database/user-datasource';
import { SiswaListPage } from './../siswa-list/siswa-list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, AlertButton } from 'ionic-angular';
import { LoginType } from '../../helpers/type-helpers';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  /* 
    This variable is for determine which function will be hitted when 
    login button is pressed. 
   */
  private type: LoginType = LoginType.WITH_USER_SQLITE

  /* 
    This variable for grouping validation that LoginPage has
   */
  loginFormGroup: FormGroup

  /* 
    This variable as a holder input of username
   */
  username: string = ""
  /* 
    This variable as a holder input of password
   */
  password: string = ""

  /**
   * This constructor is only being called by ionic app.
   * We only modify the parameters of the constructor and things to do 
   * before the object of this class is initialized.
   * @param navCtrl ask ionic to inject NavController object.
   * @param navParams ask ionic to inject NavParams object.
   * @param alertCtrl ask ionic to inject AlertController object
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.initValidation()
  }

  /**
   * This function is meant to initialized the validation setting
   * that LoginPage should have.
   */
  private initValidation() {
    this.loginFormGroup = new FormGroup({
      usernameFCtrl: new FormControl('', Validators.required),
      passwordFCtrl: new FormControl('', Validators.required)
    })
  }

  /**
   * This function is a helper of creating alert
   * @param title the title to be shown on the alert
   * @param message the message to be shown on the alert
   * @param buttons the buttons to be shown on the alert. This one can be ignored.
   */
  private showAlert(title: string, message: string, buttons?: AlertButton[]) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    })

    alert.present()
  }

  /**
   * This function is for moving page from LoginPage to UserRegisterPage and 
   * also clear the username input and password input
   */
  startRegisterPage() {
    this.username = ""
    this.password = ""
    this.navCtrl.push(UserRegisterPage)
  }

  /**
   * This function will called when the value of variable type == DUMMY.
   * Which mean you can login to the app using 'admin' as username and 
   * password
   */
  dummyLogin() {
    let granted: boolean = this.username == "admin" && this.password == "admin"
    if (granted) {
      this.navCtrl.setRoot(SiswaListPage)
    } else {
      this.showAlert("Uppss...", "Username / Password Salah !!!")
    }
  }

  withUserHttpLogin() {

  }

  /**
   * This function will called when the value of variable type == WITH_USER.
   * Which mean you can login to the app your username and password allready
   * stored in database.
   */
  withUserSQliteLogin() {
    let datasource = new UserDataSource()
    let self = this

    datasource.findByUsernameAndPassword(this.username, this.password).then(result => {
      console.log("Data user : "+JSON.stringify(result));
      
      if (result != null) {
        SessionHelper.getInstance().saveSession(result)
        self.navCtrl.setRoot(SiswaListPage, null, {
          animate: true,
          direction: "forward",
          duration: 500
        })
      } else {
        self.showAlert("Uppss...", "Username / Password Salah !!!")
      }
    }).catch(error => {
      this.showAlert("Uppss...", "Something went wrong, try again later")
      console.error("Error Login : "+JSON.stringify(error));
      
    })
  }

  login() {
    if (this.type == LoginType.WITH_USER_HTTP) {
      this.withUserHttpLogin()
    } else if(this.type == LoginType.WITH_USER_SQLITE) {
      this.withUserSQliteLogin()
    } else {
      this.dummyLogin()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
