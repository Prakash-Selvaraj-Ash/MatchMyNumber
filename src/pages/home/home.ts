import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { GamePage } from '../game/game';

import { StatsPage } from '../stats/stats';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  handleNewGame(mouseObj){
      this.navCtrl.push(GamePage);
  }

  handleStats(mouseObj){
      this.navCtrl.push(StatsPage);
  }
}
