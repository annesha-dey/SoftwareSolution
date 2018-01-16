import { Component, AfterViewInit, Input, Output, EventEmitter  } from '@angular/core';
import { TrafficChartService } from './trafficChart.service';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { Globals } from '../../../service/globals';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss']
})

// TODO: move chart.js to it's own component
export class TrafficChart implements AfterViewInit {

    public doughnutData: Array < Object > ;
    @Input() doughNut: Array < Object > ;
    @Output() messageEvent = new EventEmitter < string > ();

    public totalPowerGeneration = [];
    selected: any;
    totalPower: any;

//    {
//      'sl': 1,
//      'token': '937de3e3-204e-43f9-9dd6-26a44c142122',
//      'color': 'white',
//      'name': 'Wind Farm 1'
//  }, {
//      'sl': 2,
//      'token': '29e19648-0fe3-4c38-a3d2-21592e5e41a8',
//      'color': 'green',
//      'name': 'Wind Farm 2'
//  }
    sites = [];
     constructor(private trafficChartService: TrafficChartService, public globals: Globals) {
        
    }

    ngAfterViewInit() {

        this.sites = JSON.parse(sessionStorage.getItem('Sites'));
        if(this.sites.length > 0){
            this.updateDashBoard();
            this.selected =  this.sites[0].token;
        } else {
            alert("Error getting sites !");
        }

        

    }

    private _loadDoughnutCharts() {
        let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
        new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
            segmentShowStroke: false,
            percentageInnerCutout: 64,
            responsive: true,
        });
    }

    select(item) {
        this.selected = item.siteToken;
       //  alert(JSON.stringify(item));
        this.messageEvent.emit(JSON.stringify(item));

    }

    isActive(item) {
        return this.selected === item.siteToken;
    }

    updateDashBoard(){
        var startDate = new Date();
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        var formattedStartDate = moment(startDate).format(this.globals.DATE_FORMAT);
        

        const endDate = new Date();
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(999);
        var formattedEndDate = moment(endDate).format(this.globals.DATE_FORMAT);
        
        formattedStartDate = encodeURIComponent(formattedStartDate);
        formattedEndDate = encodeURIComponent(formattedEndDate);

        
        
        for (var index = 0; index < this.sites.length; index++) {
            this.sites[index].colorIndex = index;
            this.trafficChartService.getTrafficData(this.sites[index], formattedStartDate, formattedEndDate).then((data) => {
                this.totalPowerGeneration.push(data);
                if (this.totalPowerGeneration.length == 2) {
                    let totalPower = 0;
                    for (var i = 0; i < this.totalPowerGeneration.length; i++) {
                        totalPower = totalPower + Number(this.totalPowerGeneration[i].value);
                    }

                    this.totalPower = (totalPower/1000).toFixed(2) + " MWh";
                    for (var i = 0; i < this.totalPowerGeneration.length; i++) {

                        let percent = 0;
                        if (totalPower) {
                            percent = Number(this.totalPowerGeneration[i].value) / totalPower * 100;
                        }
                        this.totalPowerGeneration[i].percentage = Number(percent).toFixed(2);
                    }

                    this.doughnutData = this.totalPowerGeneration;
                    this._loadDoughnutCharts();

                }
            });


        }
    }
}
