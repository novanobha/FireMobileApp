import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { HydrantProvider } from "../../providers/hydrant/hydrant";
/**
 * Generated class for the FiretrucksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-firetrucks",
  templateUrl: "firetrucks.html"
})
export class FiretrucksPage {
  firetrucks: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private hydrant: HydrantProvider
  ) {
    this.deferred();
  }

  async deferred() {
    this.firetrucks = await this.hydrant.getAllTrucks();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FiretrucksPage");
  }
}
