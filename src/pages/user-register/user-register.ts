import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserDataSource } from '../../database/user-datasource';

/**
 * Generated class for the UserRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {
  registerFormGroup: FormGroup
  username: string = ""
  password: string = ""
  confirmPassword: string = ""

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    this.initValidation()
  }

  private initValidation() {
    this.registerFormGroup = new FormGroup({
      usernameFCtrl: new FormControl('', Validators.required),
      passwordFCtrl: new FormControl('', Validators.required),
      confirmPasswordFCtrl: new FormControl('', Validators.required)
    })
  }

  private tampilToast(pesan: string) {
    let toast = this.toastCtrl.create({
      message: pesan,
      duration: 3000,
      cssClass: "change-toast"
    })

    toast.present()
  }

  private collectInputFor(user: User) {
    user.username = this.username
    user.password = this.password
  }

  private simpanNewUser() {
    let newUser = new User()
    this.collectInputFor(newUser)

    let datasource = new UserDataSource()
    let self = this

    datasource.save(newUser).then(result => {
      console.log("Save user result : "+JSON.stringify(result));
      self.tampilToast("Data user berhasil disimpan")
      self.navCtrl.pop()
    }).catch(error => {
      console.error("Error save user : "+JSON.stringify(error));
      self.tampilToast("Data user gagal disimpan")
    })
  }

  register() {
    let isPasswordMatched = this.password == this.confirmPassword

    if (!isPasswordMatched) {
      this.tampilToast("Password yang anda ketik tidak sama")
      return
    }

    let datasource = new UserDataSource()
    let self = this

    datasource.findByUsername(this.username).then(result => {
      console.log("Find by username result : "+JSON.stringify(result));
      if (result == null) {
        this.simpanNewUser()
      } else {
        self.tampilToast("Username is allready taken, please use another one")
      }
    }).catch(error => {
      console.error("Error find by username : "+JSON.stringify(error));
      self.tampilToast("Upps, something goes wrong")
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

}
