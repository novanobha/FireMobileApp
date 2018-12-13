import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";

import { UtilalertProvider } from "../../providers/utilalert/utilalert";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MarkerIcon,
  GoogleMapsAnimation,
  MyLocation
} from "@ionic-native/google-maps";

import { HydrantModalPage } from "../../modals/hydrant-modal/hydrant-modal";
import { FiretruckmodalPage } from "../../modals/firetruckmodal/firetruckmodal";

import { HydrantProvider } from "../../providers/hydrant/hydrant";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-map",
  templateUrl: "map.html"
})
export class MapPage {
  mapReady: boolean = false;
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private util: UtilalertProvider,
    private hydrant: HydrantProvider,
    private modal: ModalController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MapPage");
    this.loadMap();
  }

  /**
   * Function to generate the map
   */
  async loadMap() {
    this.map = GoogleMaps.create("map_canvas", {
      preferences: {
        zoom: {
          maxZoom: 16,
          minZoom: 8
        }
      },
      camera: {
        target: [
          {
            lat: 25.311984,
            lng: 55.490568
          }
        ]
      }
    });

    try {
      //Wait for map to be ready
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.mapReady = true;
      //Add markers for firetrucks and hydrants once map is ready
      this.addMarkers();
    } catch (err) {
      console.log(err);
      this.util.showAlertBasic(
        "Error",
        "An error occured while loading the map! Try Again Later."
      );
    }
  }

  /**
   * Function to load markers on the map
   */
  async addMarkers() {
    if (this.mapReady) {
      //Clear all previous map markers
      this.map.clear();

      try {
        //Request hydrant and truck information
        let hydrants: any = await this.hydrant.getAllHydrant();
        let trucks: any = await this.hydrant.getAllTrucks();

        //Set icon configuration for marker
        let hydrantIcon: MarkerIcon = {
          url: "assets/icon/fire-hydrant.png",
          size: {
            width: 32,
            height: 32
          }
        };
        let truckIcon: MarkerIcon = {
          url: "assets/icon/truck-lighting.png",
          size: {
            width: 32,
            height: 32
          }
        };

        //Add markers for each hydrant
        hydrants.forEach(element => {
          this.map
            .addMarker({
              position: {
                lat: element.lat,
                lng: element.lng
              },
              icon: hydrantIcon,
              title: element.name
            })
            .then(
              marker => {
                console.log(marker);
                //Add on click listener for marker which opens a modal with details about the hydrant
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(data => {
                  console.log(element);
                  this.modal
                    .create(HydrantModalPage, {
                      temperature: element.temperature,
                      name: element.name,
                      pressure: element.pressure,
                      condition: element.condition
                    })
                    .present();
                });
              },
              err => {
                console.log(err);
              }
            );
        });

        //Add markers for each firetruck
        trucks.forEach(element => {
          this.map
            .addMarker({
              position: {
                lat: element.lat,
                lng: element.lng
              },
              icon: truckIcon,
              title: element.name
            })
            .then(
              marker => {
                console.log(marker);
                //Add on click listener for marker which opens a modal with details about the firetruck
                marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(data => {
                  console.log(element);
                  this.modal
                    .create(FiretruckmodalPage, {
                      name: element.name,
                      firemen: element.firemen
                    })
                    .present();
                });
              },
              err => {
                console.log(err);
              }
            );
        });
      } catch (err) {
        console.log(err);
        this.util.showAlertBasic(
          "Error",
          "There was an error retrieving hydrant and firetruck location from server! Try Again Later!"
        );
      }
    }
  }
}
