import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  ip: String = `http://192.168.1.220:8080`;
  url: String = `${this.ip}/api`;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log("Hello AuthProvider Provider");
  }

  /**
   * login method: The function sends an http request to the server. 
   * If the user is authenticated, the server sends a token to the client which is stored in local storage which is used for all future requests. 
   * If the user is not authenticated then an error message is sent to the user.
   * @param cred Login Credentials provided by user
   */
  async login(cred: any) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      //Append Content type header to the request
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      //Send the http POST request
      //The function returns an observable which is resolved with data if the user is authenticated 
      //and rejected with an err if there was an error 
      this.http.post(`${this.url}/login`, cred, { headers: headers }).subscribe(
        (data: any) => {
          if (data.success) {
            this.storage.set("AuthToken", data.token);
            resolve(true);
          } else {
            reject(data.err);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
