import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TileComponent } from '../pages/tile/tile'
import { GamePage } from '../pages/game/game';
import { StatsPage } from '../pages/stats/stats';

@NgModule({
  declarations: [
    MyApp,
    TileComponent,
    HomePage,
    GamePage,
    StatsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TileComponent,
    HomePage,
    GamePage,
    StatsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
