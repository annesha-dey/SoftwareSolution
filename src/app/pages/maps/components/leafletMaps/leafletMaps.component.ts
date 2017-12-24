import { Component, ElementRef } from '@angular/core';
import { MapsService } from './map.service';
import { Router } from '@angular/router';


import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'leaflet-maps',
  templateUrl: './leafletMaps.html',
  styleUrls: ['./leafletMaps.scss']
})

export class LeafletMaps {

public markers: any;
public map: any;

    constructor(private _elementRef:ElementRef, protected service: MapsService, private router: Router) {

      this.service.getData().then((data) => {
            this.markers = data;
            console.log(data);
            let myURL = 'assets/img/theme/vendor/leaflet/';
            let myIcon = L.icon({
            iconUrl: myURL + 'marker-shadow.png',
            iconRetinaUrl: myURL + 'map-marker-icon.png',
            iconSize: [29, 24],
            iconAnchor: [9, 21],
            popupAnchor: [0, -14]
          });

          let markerClusters = L.markerClusterGroup();

          for ( let i = 0; i < this.markers.length; ++i ){
            let popup = this.markers[i].name +
                        '<br/>' + this.markers[i].city +
                        '<br/><b>Altitude:</b> ' + Math.round( this.markers[i].alt * 0.3048 ) + ' m' +
                        '<br/><b>Timezone:</b> ' + this.markers[i].tz + '<br/><b>' +
                        '<a href="http://www.google.com">Visit Google</a>';
                      //  this.safeLink ;

            let m = L.marker( [this.markers[i].lat, this.markers[i].lng], {icon: myIcon} )
                            .bindPopup( popup ).on('mouseover',this.onClick);

            markerClusters.addLayer( m );
            this.map.addLayer( markerClusters );
       }
      });
     }
     public onClick(e) {
         alert('hovered');
         this.router.navigate(['/']);
     }


    ngAfterViewInit() {
      let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');
      this.map = L.map(el).setView([38.526, -90.667], 2);
      L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      subdomains: ['a', 'b', 'c']
    }).addTo( this.map );

  }
}
