import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { ModalController } from "ionic-angular";
import { RewardModalPage } from "../../pages/reward-modal/reward-modal";

/*
  Generated class for the RewardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RewardServiceProvider {

  constructor(private storage: Storage,
              private modalCtrl: ModalController) {
  }

  rewards:  any[] = [];
  list:     any[] = [.50, .75, 1.00, 1.25, 1.50, 1.75, 2.00, .25, .50, .75]

  rewardsCheck(email, userData){
    
    return new Promise((resolve, reject) => {
      userData.logins += 1;
      if ((userData.logins == 2) || (userData.logins % 10 == 0)) {
        let newReward = this.rewardChance(email, userData.rewardCount);
        userData.rewardCount = newReward;
      }
      resolve(userData);
    });
  }

  rewardChance(email, count){
    if (count) {
      let chance = Math.floor((Math.random() * 100) + 1);
      if(chance > 50){
        count++;
        this.generateReward(email, count);
      }
    } else {
      count++;
      this.generateReward(email, count);
    }
    return count;
  }

  generateReward(email, count){
    let idx = Math.floor((Math.random() * 10));
    let rewarded = this.list[idx];
    let rewardObj = {
      rewardId: `REW-${count}`,
      amount: rewarded
    }
    let emailRewardsStr = `${email}-rewards`;

    this.storage.get(emailRewardsStr)
    .then(result => {
      if (result)
        this.rewards = result;
      this.rewards.push(rewardObj);
      this.storage.set(emailRewardsStr, this.rewards)
      .then(res => this.displayReward(rewarded));
    });
  }

  displayReward(amount){
    let theModal = this.modalCtrl.create(RewardModalPage, { 'rewardParm': amount });
    theModal.present();
  }
}
