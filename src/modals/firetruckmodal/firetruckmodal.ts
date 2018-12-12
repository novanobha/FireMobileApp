import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the FiretruckmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-firetruckmodal",
  templateUrl: "firetruckmodal.html"
})
export class FiretruckmodalPage {
  firemen = [];
  name: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController
  ) {
    this.firemen = navParams.get("firemen");
    this.name = navParams.get("name");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FiretruckmodalPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
