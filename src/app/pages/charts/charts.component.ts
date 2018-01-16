import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MqttService } from '../../service/mqtt.service/mqtt.service';
import * as moment from 'moment';
@Component({
  selector: 'maps',
  templateUrl: './charts.html',
  styleUrls: ['./charts.scss'],
})
export class Charts implements OnInit {

    public turbine_notifications: Array < Object > ;
    public turbineID = "11";
    public turbineName = "";
    public imageURL = "";

    constructor(private mqtt: MqttService, private router: Router, private route: ActivatedRoute) {
        this.turbine_notifications = [];

    }

    ngOnInit() {

        this.route.params.subscribe(
            (params => {
                this.turbineID = params.id;
                this.turbineName = params.name;
                this.imageURL = params.imageUrl;

            }));

        this.mqtt.getEmitter()
            .subscribe(item => this.onEventHandler(item));
    }

    onEventHandler(item: any) {        

       if (item.name === 'measurements' && item.data.assetModuleId === 'wt_devices') {			
            if (this.turbineID === item.data.deviceAssignmentToken) {   
				  var result = JSON.stringify(item.data.measurements).slice(1, -1);
				 const date = moment(item.data.eventDate).format('HH:mm:ss  MMM YYYY ');
				 const recDate = moment(item.data.receivedDate).format('HH:mm:ss  MMM YYYY ');

				 let data = {
				  measurements : result,
				  eventDate : date,
				  receivedDate: recDate,
				 };
				  //  if (this.turbineID === item.data.hardwareId) {
						this.turbine_notifications.unshift(data);
				 //   }
			}
	   }

    }



}
