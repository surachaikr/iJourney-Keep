import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";

/**
 * Generated class for the MapViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: google.maps.Map;
  public marker: google.maps.Marker;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapViewPage');
    this.loadMap();

    if (this.navParams.get("locationPos")) {
      this.setMarker(this.navParams.get("locationPos"));
    } else {
      this.setCurrentLocation();
    }
  }

  loadMap() {
    try {
      let mapOptions = {
        center: new google.maps.LatLng(13.8344713, 100.5246173),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    } catch (err) {
      console.log("Load map error: ", err);
    }
  }

  setCurrentLocation() {
    let currentPosition: google.maps.LatLng;
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("plugin: ", JSON.stringify(resp));
      currentPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.map.setCenter(currentPosition);
      this.setMarker(currentPosition);
    }, (err) => {
      console.log("Get current position error: ", err);
      currentPosition = new google.maps.LatLng(13.8344713, 100.5246173);
      this.map.setCenter(currentPosition);
      this.setMarker(currentPosition);
    });
  }

  setMarker(position: google.maps.LatLng) {
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.map.setCenter(position);
    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      draggable: true,
    });

    let me = this;
    this.marker.addListener("click", () => {
      let content: string = `
        <h4>Position info:</h4>
        <p>lat: ${me.marker.getPosition().lat()}</p>
        <p>lng: ${me.marker.getPosition().lng()}</p>
        `;
      let infoWindow = new google.maps.InfoWindow({
        content: content,
      });
      infoWindow.open(me.map, me.marker);
    });
  }

  saveLocation() {
    if (this.marker) {
      this.viewCtrl.dismiss({ locationPos: this.marker.getPosition() });
    }
  }

  close() {
    this.navCtrl.pop();
  }
}
