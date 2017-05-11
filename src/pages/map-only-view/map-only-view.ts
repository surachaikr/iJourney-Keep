import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";

/**
 * Generated class for the MapOnlyViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map-only-view',
  templateUrl: 'map-only-view.html',
})
export class MapOnlyViewPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: google.maps.Map;
  public marker: google.maps.Marker;
  public position: google.maps.LatLng;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapOnlyViewPage');
    if (this.navParams.get("locationPos")) {
      this.position = this.navParams.get("locationPos");
      this.loadMap();
      this.setMarker(this.position);
    } else {
      this.navCtrl.pop();
    }
  }

  loadMap() {
    try {
      let mapOptions = {
        center: this.position,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    } catch (err) {
      console.log("Load map error: ", err);
    }
  }

  setMarker(position: google.maps.LatLng) {
    if (this.marker) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
      draggable: false,
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

  setCenterLocation() {
    this.map.setCenter(this.position)
  }
}
