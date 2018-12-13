import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AuthProvider } from "../../providers/auth/auth";
import { UtilalertProvider } from "../../providers/utilalert/utilalert";
import { HomePage } from "../home/home";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  cred = { username: null, password: null };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private util: UtilalertProvider,
    private auth: AuthProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  /**
   * Function called when user submits credentials
   */
  async login() {
    this.util.showLoader("Logging In");
    try {
      let data: any = await this.auth.login(this.cred);
      this.util.dismissLoader();
      if (data) {
        //If user is logged in successfully, set homepage as root page
        this.navCtrl.setRoot(HomePage);
      } else {
        this.util.showAlertBasic("Error", `${data}! Try Again!`);
      }
    } catch (err) {
      console.log(err);
      this.util.dismissLoader();
      this.util.showAlertBasic(
        "Error",
        "There was an error logging you in. Try again later."
      );
    }
  }
}
