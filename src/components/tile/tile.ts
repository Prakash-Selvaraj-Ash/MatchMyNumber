import { Component, Input, Output, EventEmitter, Injectable  } from '@angular/core';

/*
  Generated class for the Tile directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Component({
  selector: 'tile', // Attribute selector,
  styleUrls: ['tile.css'],
  templateUrl: 'tile.html',
})
@Injectable()
export class Tile {

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
  constructor() {
    console.log('Hello Tile Directive');
  }

}
