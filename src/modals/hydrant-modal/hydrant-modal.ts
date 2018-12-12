import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the HydrantModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-hydrant-modal",
  templateUrl: "hydrant-modal.html"
})
export class HydrantModalPage {
  name: string;
  temperature: number;
  pressure: number;
  condition: string;
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.temperature = this.navParams.get("temperature");
    this.pressure = this.navParams.get("pressure");
    this.name = this.navParams.get("name");
    this.condition = this.navParams.get("condition");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HydrantModalPage");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
