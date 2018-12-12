import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

/*
  Generated class for the HydrantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HydrantProvider {
  ip: String = `http://192.168.1.220:8080`;
  url: String = `${this.ip}/api`;
  constructor(public http: HttpClient, private storage: Storage) {
    console.log("Hello HydrantProvider Provider");
  }

  getAuthToken() {
    return new Promise(async (resolve, reject) => {
      try {
        let token = await this.storage.get("AuthToken");
        console.log(token);
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }
  getAllHydrant() {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      try {
        let token = await this.getAuthToken();
        headers = headers.append("Authorization", `Bearer ${token}`);
        this.http
          .get(`${this.url}/listAllHydrant`, { headers: headers })
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              reject(err);
            }
          );
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  getAllTrucks() {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      try {
        let token = await this.getAuthToken();
        headers = headers.append("Authorization", `Bearer ${token}`);
        this.http
          .get(`${this.url}/listAllTrucks`, { headers: headers })
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              reject(err);
            }
          );
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
}
