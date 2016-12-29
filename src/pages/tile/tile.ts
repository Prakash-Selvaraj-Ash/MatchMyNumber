import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Tile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'tile',
  templateUrl: 'tile.html'
})

@Injectable()
export class TileComponent {

  @Input() isRed: boolean;
  @Input() isTouched : boolean;
  @Input() isRotate : boolean;
  @Input() isBlue: boolean;
  @Input() isGreen: boolean;
  @Input() numberValue: number;
  @Input() tileIndex: number;
  @Output() mouseUp: EventEmitter<{}> = new EventEmitter();
  @Output() mouseMove: EventEmitter<{}> = new EventEmitter();
  @Output() mousePress: EventEmitter<{}> = new EventEmitter();
    
    

  mousePressed(event, numberVal : number, index: number){
      this.mousePress.next({ "event": event, "val": numberVal, "tileIndex": this.tileIndex });
  }

  mouseMoving(event, numberVal: number, index: number) {
      this.mouseMove.next({ "event": event, "val": numberVal, "tileIndex": this.tileIndex });
  }

  fireMouseUp(event) {
      this.mouseUp.next({"event" : event});
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TilePage');
  }

}
