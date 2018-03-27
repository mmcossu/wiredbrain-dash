import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {

  userEmail:  string;
  userInfo:     any[] = [];
  rewardInfo:   any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserServiceProvider) {
  }
  
  ngOnInit(){
    this.userEmail = this.userService.email;
    
    this.userService.storageControl('get', this.userEmail)
    .then(
      userData => this.userInfo = userData
    );
    
    this.userService.storageControl('get', `${this.userEmail}-rewards`)
    .then(rewardData => {
      this.rewardInfo = rewardData;
    });
  }

  ionViewCanEnter(){
    return this.userService.hasLoggedIn || false;
  }

  
}
