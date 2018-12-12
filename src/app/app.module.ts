import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { IonicStorageModule } from "@ionic/storage";
import { HttpClientModule } from "@angular/common/http";

/**
 * Pages
 */
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { LoginPage } from "../pages/login/login";
import { MapPage } from "../pages/map/map";
import { FiretrucksPage } from "../pages/firetrucks/firetrucks";
import { AlertsPage } from "../pages/alerts/alerts";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

/**
 * Modals
 */
import { HydrantModalPage } from "../modals/hydrant-modal/hydrant-modal";
import { FiretruckmodalPage } from "../modals/firetruckmodal/firetruckmodal";

/**
 * Provider
 */
import { AuthProvider } from "../providers/auth/auth";
import { HydrantProvider } from "../providers/hydrant/hydrant";
import { UtilalertProvider } from "../providers/utilalert/utilalert";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    HydrantModalPage,
    FiretruckmodalPage,
    FiretrucksPage,
    MapPage,
    AlertsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    HydrantModalPage,
    FiretruckmodalPage,
    FiretrucksPage,
    MapPage,
    AlertsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    HydrantProvider,
    UtilalertProvider
  ]
})
export class AppModule {}
