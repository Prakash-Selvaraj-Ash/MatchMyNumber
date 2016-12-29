import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChampionModel } from '../../models/champion.model';

/*
  Generated class for the Stats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {


  /**
   * Declarations
   */
  public score: number;
  public withScore: boolean = false;
  public noScores: boolean = false;
  public champion;
  public champions: ChampionModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.score = parseInt(this.navParams.get('score'));
    if(this.score){
      this.withScore = true;
    }
    var highScores = localStorage.getItem('highScores');
    if (highScores) {
      var champions = JSON.parse(highScores);
      champions.sort(function (a, b) { return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0); });
      this.champions = champions;
    }
    else{
      this.noScores = true;
    }
  }

  saveChampion() {
    var highScores = JSON.parse(localStorage.getItem('highScores'));
    var champObj = new ChampionModel();
    champObj.name = this.champion;
    champObj.score = this.score;

    if (highScores) {
      if (highScores.length >= 5) {
        highScores.sort(function (a, b) { return (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0); });
        highScores[4].name = champObj.name;
        highScores[4].score = champObj.score;
      }
      else {
        highScores.push(champObj);
      }
    }
    else {
      highScores = [];
      highScores.push(champObj);
    }
    localStorage.setItem('highScores', JSON.stringify(highScores));
    this.navCtrl.pop();
  }

}
