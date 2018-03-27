import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { empty } from 'rxjs/Observer';
import { HomePage } from "../home/home";
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the LoginPage page.
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  regPage:any;
  login = { email:'', password:'' };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserServiceProvider) {
    this.regPage = 'RegisterPage';
  }

  signIn(){
    if (!this.login.email || !this.login.password) {
      this.userService.displayAlert('Error', 'Empty email or password');
    } else {
      this.userService.logIn(this.login.email, this.login.password)
      .then(svcRes => {
        if(this.userService.hasLoggedIn){
          this.navCtrl.setRoot(HomePage);
          this.navCtrl.popToRoot();
        } else {
          this.login = { email:'', password:'' };
        }
      })
    }
  }

}
