//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';

import { Storage } from "@ionic/storage";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

/*
  Generated class for the UserServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class UserServiceProvider {

  dbUsers : FirebaseListObservable<any>;
  hasLoggedIn:boolean;

  constructor(private ngFireAuth: AngularFireAuth, 
              private alertCtrl: AlertController,
              private storage: Storage,
              private ngFbeDb: AngularFireDatabase) {
    
    this.dbUsers = this.ngFbeDb.list('/users');
  }

  displayAlert(title, subtitle?){
    this.alertCtrl.create({title:title, subTitle:subtitle, buttons: ['OK']}).present();
  }

  logIn(email, password){
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(fbResult => { 
      this.storageControl('get', email)
      .then(result => {
        if(result){
          this.updateUser(email, result)
          .then(updated => console.log(email, updated));
        } else {
          this.saveNewUser(email)   //new user in local storage
          .then(resNew => this.displayAlert(email, 'New account created for this user'));
        }
      });
      this.hasLoggedIn = true;
      return fbResult;
    })
    .catch(error => {
      this.hasLoggedIn = false;
      this.displayAlert('Error', error);
      return error;
    });
  }

  logOut(){
    //this.storageControl('delete');
    let email = this.ngFireAuth.auth.currentUser.email;
    this.ngFireAuth.auth.signOut()
    .then(res => this.displayAlert('Signed Out', email))
    .catch(err => this.displayAlert('Error', err));
  }

  storageControl(action, key?, value?){
    switch (action) {
      case 'get': return this.storage.get(key);
      case 'set': return this.storage.set(key, value);
      case 'delete': 
        if (key) {
          this.displayAlert(key, 'About to delete these data');
          this.storage.remove(key); 
        } else {
          this.displayAlert('Warning', 'About to delete all user data');
          this.storage.clear();
        } 
          break;
      default: return;
    }
  }

  saveNewUser(email){
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleString(),
      id: '',
    }
    //db write identity
    this.dbUsers.push({
      username: email,
      creation: userObj.creation,
      logins: userObj.logins,
      rewardCount: userObj.rewardCount,
      lastLogin: userObj.lastLogin
    })
    //local write data
    .then(result => {
      userObj.id = result.key
      return this.storageControl('set', email, userObj);
    });
    return this.storageControl('get', email);
  }

  updateUser(email, userData){
    let updateData = {
      creation: userData.creation,
      logins: userData.logins + 1,
      rewardCount: userData.rewardCount,
      lastLogin: new Date().toLocaleString(),
      id: userData.id
    }
    //db update record
    this.dbUsers.update(updateData.id, {
      logins: updateData.logins,
      rewardCount: updateData.rewardCount,
      lastLogin: updateData.lastLogin,
    });
    //local update record
    return this.storageControl('set', email, updateData);
  }

}