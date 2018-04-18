import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import * as firebase from 'firebase/app';
// import { FCM } from "@ionic-native/fcm";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  menuData = [
    {title:'Our Menu', pic:'assets/imgs/menu.jpeg', pushPage: 'MenuPage'},
    {title:'Accounts', pic:'assets/imgs/account.jpeg', pushPage: 'AccountPage'},
    {title:'About Us', pic:'assets/imgs/about.jpeg', pushPage: 'AboutPage'},
    {title:'Locations', pic:'assets/imgs/location.jpeg', pushPage: 'LocationsPage'},
  ];

  loginPage:  string;
  loggedIn:   boolean;
  userEmail:  string;
  
  constructor(public navCtrl: NavController, 
              private ngFireAuth: AngularFireAuth, 
              private userService: UserServiceProvider){
              // private fcm: FCM) {
  }

  ngOnInit(){
    this.loginPage = 'LoginPage';
    if (this.userService.hasLoggedIn) {
      this.loggedIn = true;
      this.userEmail = this.userService.email;
    }
    //this.ngFireAuth.auth.onAuthStateChanged(user => this.loggedIn = user ? user.email : '' );
    // this.initFcm();
  }

  signOut(){
    this.userService.logOut();
    this.loggedIn = false;
  }

  pushCheckPage(page){
    this.navCtrl.push(page)
    .then(result => {
      if(!result)
        this.userService.displayAlert('Sorry','You must first register an account');
    });
  }

  // initFcm(){
  //   this.fcm.onNotification().subscribe(data => {
  //     console.log('Sent', data);
  //     this.userService.displayAlert('Sent', data);
  //   });
  // }

}
