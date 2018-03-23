import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  menuData = [
    {title:'Our Menu', pic:'../../assets/imgs/menu.jpeg', pushPage: 'MenuPage'},
    {title:'Accounts', pic:'../../assets/imgs/account.jpeg', pushPage: 'AccountPage'},
    {title:'About Us', pic:'../../assets/imgs/about.jpeg', pushPage: 'AboutPage'},
    {title:'Locations', pic:'../../assets/imgs/location.jpeg', pushPage: 'LocationPage'},
  ];

  loginPage:any;
  loggedIn:any;
  
  constructor(public navCtrl: NavController, private ngFireAuth: AngularFireAuth) {
    this.loginPage = 'LoginPage';
    this.ngFireAuth.auth.onAuthStateChanged(user => this.loggedIn = user.email);
  }

}
