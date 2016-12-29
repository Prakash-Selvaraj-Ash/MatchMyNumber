import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NumberModel } from '../../models/number.model';
import { StatsPage } from '../stats/stats';
import { Counter } from '../../services/counter'


/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [Counter]
})
export class GamePage {

  /**
   * Declarations
   */

  numbers: NumberModel[] = [];
  target: number;
  output: number;
  score: number;
  travelledNumbers: number[] = [];
  lifeCycleListener: Function;
  timeOut: number;
  interval: number;
  isGameInterrupted: boolean;
  isNewGame: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private counter: Counter) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ionViewDidEnter(){
    this.createNewGame();
        
        document.addEventListener('pause', () => {
            this.onPaused();
        });

        document.addEventListener('resume', () => {
            this.onResumed();
        });

        this.counter.timeOutChange.subscribe(value => {
            this.isNewGame = this.isGameInterrupted = this.counter.timeOut <= 0;
            this.timeOut = this.counter.timeOut;
        });
  }

  createNewGame(){
        this.output = this.score = 0;
        this.numbers = [];
        for (var index = 0; index < 16; index++) {
            var curNumber = {
                "numberValue": this.generateRandom(3),
                "color": this.generateRandom(3)
            };
            var tileNumber = new NumberModel();
            tileNumber.numberIndex = index;
            tileNumber.numberValue = curNumber.numberValue;
            tileNumber.color = curNumber.color;
            tileNumber.isTouched = false;
            tileNumber.isRotate = true;
            this.numbers.push(tileNumber);
        }
        this.target = this.generateTarget(this.generateRandom(15), -1, 1);
        this.timeOut = this.counter.timeOut = 31;
    }

    continueGame(){
        this.isGameInterrupted = false;
        this.counter.isPaused = false;
    }

    gotoStats(score){
        var highScores = localStorage.getItem('highScores');
        this.isGameInterrupted = false;
        if(highScores){
            var hScores = JSON.parse(highScores);
            var hScore = hScores.filter((sc => sc.score < score));
            if(hScore && hScore.length > 0 || hScores.length < 5){
                this.navCtrl.push(StatsPage, { score: score });        
            }
        }
        else {
            if(score && score > 0){
                this.navCtrl.push(StatsPage, { score: score });
            }
            else{
                this.navCtrl.push(StatsPage);
            }
        }
    }

    onPaused() {
        this.isGameInterrupted = this.counter.isPaused = true;
        this.score = 0;
        localStorage.setItem("currentTime", this.timeOut.toString());
        console.log("paused");
    }

    onResumed() {
       this.isNewGame = this.timeOut <= 0;
    }

    generateTarget(currStartNum: number, targetVal: number, iterate: number) {
        var target = 0;
        for (var index = 0; index < iterate; index++) {
            targetVal = this.numbers[currStartNum].color == 1 ?
                -this.numbers[currStartNum].numberValue :
                this.numbers[currStartNum].numberValue;

            currStartNum = this.getNextPosition(currStartNum);
            var color = this.numbers[currStartNum].color;
            target = this.getOutput(color, targetVal, this.numbers[currStartNum].numberValue);
        }
        return target;
    }

    getOutput(color: number, targetVal: number, currNum: number) {
        if (color == 1)
            return targetVal - currNum;
        else if (color == 2)
            return targetVal + currNum;
        else
            return targetVal * currNum;
    }

    rejectOutput(color: number, targetVal: number, currNum: number) {
        if (color == 2)
            return targetVal - currNum;
        else if (color == 1)
            return targetVal + currNum;
        else
            return targetVal / currNum;
    }

    getNextPosition(currStartNum: number) {
        var nextTarget = -1;
        switch (currStartNum) {
            case 0:
                nextTarget = this.generateRandom(2);
                if (nextTarget == 1) currStartNum = currStartNum + 1;
                else currStartNum = currStartNum + 4;
                break;
            case 4:
            case 8:
                nextTarget = this.generateRandom(3);
                if (nextTarget == 1) currStartNum = currStartNum + 1;
                else if (nextTarget == 2) currStartNum = currStartNum + 4;
                else currStartNum = currStartNum - 4;
                break;
            case 12:
                nextTarget = this.generateRandom(2);
                if (nextTarget == 1) currStartNum = currStartNum + 1;
                else currStartNum = currStartNum - 4;
                break;
            case 3:
                nextTarget = this.generateRandom(2);
                if (nextTarget == 1) currStartNum = currStartNum - 1;
                else currStartNum = currStartNum + 4;
                break;
            case 7:
            case 11:
                nextTarget = this.generateRandom(3);
                if (nextTarget == 1) currStartNum = currStartNum - 1;
                else if (nextTarget == 2) currStartNum = currStartNum + 4;
                else currStartNum = currStartNum - 4;
                break;
            case 15:
                nextTarget = this.generateRandom(2);
                if (nextTarget == 1) currStartNum = currStartNum - 1;
                else currStartNum = currStartNum - 4;
                break;
            default:
                break;
        }
        return currStartNum;
    }

    generateRandom(maxVal: number) {
        return Math.floor((Math.random() * maxVal) + 1);
    }

    handleMousePress(mouseObj) {
        var index = mouseObj.tileIndex;
        this.numbers[index].isTouched = true;
        this.output = this.numbers[index].color == 1 ? -this.numbers[index].numberValue : this.numbers[index].numberValue;
        this.travelledNumbers.push(index);
    }

    handleMouseUp(mouseObj) {
        var numbersTouched = this.numbers.filter(num => num.isTouched == true);
        var success = this.target === this.output;
        if (numbersTouched.length == 1) {
            this.output = 0;
            this.travelledNumbers = [];
            numbersTouched[0].isTouched = false;
            return;
        }
        for (var index = 0; index < numbersTouched.length; index++) {
            var element = numbersTouched[index];
            var curNumber = {
                "numberValue": this.generateRandom(3),
                "color": this.generateRandom(3)
            };
            if (success) {
                element.numberValue = curNumber.numberValue;
                element.color = curNumber.color;
                element.isRotate = !element.isRotate;
            }
            element.isTouched = false;
        }
        if (success) {
            this.score = this.score + numbersTouched.length * 20;
            this.counter.timeOut = this.counter.timeOut + numbersTouched.length;
            var targetCount = this.score / 100;
            targetCount = targetCount < 5 ? targetCount : 4;
            targetCount = targetCount > 0 ? targetCount : 1;
            this.target = success ? this.generateTarget(this.generateRandom(15), -1, targetCount) : this.target;
        }
        this.output = 0;
        this.travelledNumbers = [];
    }

    handleMouseMove(mouseObj) {
        var numb: NumberModel;
        var event = mouseObj.event;
        var element = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
        var currEleIndex = element.getAttribute("tileIndex");
        var touchingData = this.numbers.filter(num => num.numberIndex.toString() === currEleIndex)[0];
        if (touchingData) {
            var travelledNumbersLength = this.travelledNumbers.length;
            var currIndex = parseInt(currEleIndex);
            if (travelledNumbersLength > 1) {
                var index = this.travelledNumbers[travelledNumbersLength - 2];
                if (index == currIndex) {
                    var removedData = this.numbers.filter(num => num.numberIndex == this.travelledNumbers[travelledNumbersLength - 1])[0];
                    removedData.isTouched = false;
                    this.travelledNumbers.pop();
                    this.output = this.rejectOutput(removedData.color, this.output, removedData.numberValue);
                }
            }

            if (this.travelledNumbers.indexOf(currIndex) >= 0) {
                return
            };

            if (travelledNumbersLength > 0) {
                var index = this.travelledNumbers[travelledNumbersLength - 1];
                if (!(index == currIndex - 1 || index == currIndex + 1 || index == currIndex + 4 || index == currIndex - 4)) return;
                this.travelledNumbers.push(currIndex);
            }
            touchingData.isTouched = true;
            this.output = this.getOutput(touchingData.color, this.output, touchingData.numberValue);
        }
    }

}
