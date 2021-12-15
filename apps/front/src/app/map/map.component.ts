import { Component, OnInit } from '@angular/core';
import 'leaflet';
import { circle, latLng, polygon, tileLayer, marker } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { BikePosition, ManageStationDto } from '@open-bike/lib';
import { SocketService } from '../socket/socket.service';
import { Socket } from 'ngx-socket-io';
declare let L : any;
@Component({
  selector: 'open-bike-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/678111-map-marker-512.png',
      shadowUrl: './node_modules/leaflet/dist/images/marker-shadow.png'
    })
  };

  bikeIcon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/60/60693.png',
      shadowUrl: './node_modules/leaflet/dist/images/marker-shadow.png'
    })
  }
  bikes: { marker: any; bike: BikePosition}[] = []

  constructor(private http: HttpClient, private socket: Socket) { }
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }
  ngOnInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    this.http.get<ManageStationDto[]>('/api/station').subscribe((res) => {
      for(let station of res) {
        const marker = L.marker([station.lon, station.lat], this.icon).addTo(map);
        marker.bindPopup(`${station.name}<br />${station.bikes?.length} vélos`).openPopup()
      }
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.socket.on('update', (bikes: BikePosition[]) => {
      console.log(bikes)
      for(let bike of this.bikes) {
        bike.marker.remove()
      }
      this.bikes = []
      for(let bike of bikes) {
          const marker = L.marker([bike.position.lat, bike.position.lon], this.bikeIcon).addTo(map)
          this.bikes.push({ marker, bike })
      }
    })
  }

}
