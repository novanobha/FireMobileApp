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

  /**
   * getAllHydrant method: Sends an HTTP GET request to server requesting the last recorded status of the hydrant along with the location of the hydrant
   * The server responds with an array of JSON objects where each object contains the location of the hydrant, the sensor values and status (normal/faulty)
   */
  getAllHydrant() {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      try {
        //Retrieve authentication token from storage
        let token = await this.getAuthToken();

        //Append authentication header to request 
        headers = headers.append("Authorization", `Bearer ${token}`);
        
        //Send an HTTP GET request to the server
        //The function returns an observable which is resolved with data on success 
        //The observable is rejected with err if there was an error from the server
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

  /**
   * getAllTrucls method: Sends an HTTP GET request to server requesting information of all the firetrucks
   * The server responds with an array of JSON objects where each object represents a firetruck and contains the location of the truck and the list of firemen in the truck
   */
  getAllTrucks() {
    return new Promise(async (resolve, reject) => {
      let headers = new HttpHeaders();
      try {
        //Retrieve authentication token from local storage
        let token = await this.getAuthToken();

        //Append authentication header to request 
        headers = headers.append("Authorization", `Bearer ${token}`);

        //Send an HTTP GET request to the server
        //The function returns an observable which is resolved with data on success 
        //The observable is rejected with err if there was an error from the server
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
