import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  regData = {
    email:'', passWrd1: '', passWrd2: ''
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController, 
              private ngFireAuth: AngularFireAuth,
              private userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  displayAlert(title, subtitle){
     this.alertCtrl.create({title:title, subTitle: subtitle, buttons: ['OK']}).present();
  }

  registerAccount(){
    if (this.regData.passWrd1 != this.regData.passWrd2) {
      this.displayAlert('Error', 'Passwords not matching, try again!');
      this.regData.passWrd1 = '';
      this.regData.passWrd2 = '';
    } else {
      this.ngFireAuth.auth.createUserWithEmailAndPassword(this.regData.email, this.regData.passWrd1)
      .then(result => this.registrationSuccess(result))
      .catch(err => this.displayAlert('Error', err));
    }
  }

  registrationSuccess(result){
    this.displayAlert('Account created', 'Account created for the email address: ' + result.email);
    // this.ngFireAuth.auth.signInWithEmailAndPassword(this.regData.email, this.regData.passWrd1)
    this.userService.logIn(this.regData.email, this.regData.passWrd1)
    .then(result => {
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    })
    //.catch(err => this.displayAlert('Error', err));
  }
}
