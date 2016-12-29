import {Injectable, EventEmitter} from '@angular/core';
@Injectable()
export class Counter {
    timeOut: number;
    isPaused: boolean;
    timeOutChange = new EventEmitter();
    constructor() {
        this.timeOut = 30;
        
        var self = this;
        setInterval(function () {
            if(self.isPaused || self.timeOut <= 0) return;
            self.timeOut--;
            self.timeOutChange.next(self.timeOut);
        }, 1000);
    }
}