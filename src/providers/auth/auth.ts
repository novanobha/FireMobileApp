import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  ip: String = `http://10.25.144.103:8080`;
  url: String = `${this.ip}/api`;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }
  async login(cred: any) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      debugger
      this.http.post(`${this.url}/login`, cred, { headers: headers }).subscribe((data: any) => {
        if (data.success) {
          this.storage.set("AuthToken", data.token);
          resolve(true);
        } else {
          reject(data.err);
        }
      },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });

  }
}
