declare global {
    interface Window { map: any; }
}

import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MapsService } from './map.service';
import { Router } from '@angular/router';


import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'leaflet-maps',
  templateUrl: './leafletMaps.html',
  styleUrls: ['./leafletMaps.scss']
})
export class LeafletMaps implements AfterViewInit {

    public assetLocation: any;
    public map: any;
    public markerClusters: any;

    constructor(private _elementRef: ElementRef,
        protected service: MapsService, private router: Router, private _sanitizer: DomSanitizer) {

        var sites = JSON.parse(sessionStorage.getItem('Sites'));
        if(sites.length == 0){
            alert("Error getting sites !");
        }

        this.service.getData(sites).then((data) => {

            this.assetLocation = data;
            console.log(data);
            let myURL = 'assets/img/theme/vendor/leaflet/marker-icon.png';


            this.markerClusters = L.markerClusterGroup();

            for (let i = 0; i < this.assetLocation.length; ++i) {

                const name = this.assetLocation[i].name;
                var token = this.assetLocation[i].token;
                var imageURL = this.assetLocation[i].assetImageUrl;
                var measurements = this.assetLocation[i].measurements;

                var myIcon = L.divIcon({
                  // className: 'leaflet-div-icon',
                  className : 'leaflet-div-icon leaflet-marker-icon leaflet-zoom-animated leaflet-clickable leaflet-marker-draggable',
                  iconUrl: imageURL,
                  html: '<img src= ' + imageURL + ' style="width: 100%;height: 100%; border-radius: 60%;"><br><p style="color:black; font-size: 8px; font-weight:bold; text-align:center; padding-top:2px;">' + name +'</p>',
                });

                let popup = name +
                    '<br/> ' + measurements + '<br/><b>' +
                    '<button  onclick="map.namespace.publicFunc(\'' + token+ '\', \'' + name + '\', \'' + imageURL + '\')">Turbine Details</button>';


                window.map = window.map || {};
                window.map.namespace = window.map.namespace || {};
                window.map.namespace.publicFunc = this.mapButton.bind(this);

                const m = L.marker([this.assetLocation[i].latitude, this.assetLocation[i].longitude], {
                        icon: myIcon
                    }).bindPopup(popup);
               
                this.markerClusters.addLayer(m);
            }
            
            this.map.addLayer(this.markerClusters);
        });


    }

    onclick() {
        alert('hovered');
        // this.router.navigate(['/']);
    }


    ngAfterViewInit() {
        let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');
        this.map = L.map(el).setView([38.526, -90.667], 3);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
            subdomains: ['a', 'b', 'c']
        }).addTo(this.map);

    }

    mapButton(token: string, name: string, url: string): void {
        //alert(id + name);
//         alert(url);
        this.router.navigate(['/pages/charts', {
            id: token,
            name: name,
            imageUrl: url
            
        }]);
    }
}
