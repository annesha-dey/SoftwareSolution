import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DashboardService} from './dashboard.service';
import {BaThemeConfigProvider, colorHelper} from '../../theme';
import { MqttService } from '../../service/mqtt.service/mqtt.service';
import { Globals } from '../../service/globals';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
    public totalPowerGeneration = [];
    public pieChartData = [];

    constructor(private mqtt: MqttService, private _dashboardService: DashboardService, private _baConfig: BaThemeConfigProvider, public globals: Globals) {

        const sites = JSON.parse(sessionStorage.getItem('Sites'));
        if(sites.length > 0){
            this.updateDashBoard(sites[0].token);
        } else {
            alert("Error getting sites !");
        }
    }


    ngOnInit() {
        this.mqtt.getEmitter()
            .subscribe(item => this.onEventHandler(item));
    }

    onEventHandler(item: any) {
        //console.log("in dashboard onEventHandler...");
        if (item.name === "measurements" && item.data.assetModuleId === 'wf_devices') {
            this.pieChartData[3].stats = item.data.measurements.wind_speed;
            this.pieChartData[4].stats = item.data.measurements.temperature + " °C";
        }
    }

    receiveMessage($event) {
        let site = JSON.parse($event);
        this.updateDashBoard(site.siteToken);
    }

    updateDashBoard(token) {
        var startDate = new Date();
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        var formattedStartDate = moment(startDate).format(this.globals.DATE_FORMAT);

        var endDate = new Date();
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(999);
        var formattedEndDate = moment(endDate).format(this.globals.DATE_FORMAT);

        formattedStartDate = encodeURIComponent(formattedStartDate);
        formattedEndDate = encodeURIComponent(formattedEndDate);

        var lastHourDate = new Date();
        lastHourDate.setHours(lastHourDate.getHours() - 1);
        var formattedLastHourDate = moment(lastHourDate).format(this.globals.DATE_FORMAT);
        formattedLastHourDate = encodeURIComponent(formattedLastHourDate);
        
        this.pieChartData = this._dashboardService.getPieData(token, formattedStartDate, formattedEndDate, formattedLastHourDate);

    }


}