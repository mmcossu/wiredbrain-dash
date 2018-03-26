import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//firebase libraries
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserServiceProvider } from '../providers/user-service/user-service';
//storage
import { IonicStorageModule } from "@ionic/storage";

//firebase configs
export const firebaseConfig = {
  apiKey: "AIzaSyDOYOPyxoj-Am3ACZ4RXP6z9VVd5P_N1Lw",
  authDomain: "wiredbrain-mmc.firebaseapp.com",
  databaseURL: "https://wiredbrain-mmc.firebaseio.com",
  storageBucket: "wiredbrain-mmc.appspot.com",
  messagingSenderId: '85616389058'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //firebase
    AngularFireModule.initializeApp(firebaseConfig) ,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}
