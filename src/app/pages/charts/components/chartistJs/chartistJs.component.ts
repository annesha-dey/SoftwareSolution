import { ajax } from 'rxjs/observable/dom/ajax';
import { BaChartistChart } from '../../../../theme/components/baChartistChart';
import { BaPowerChart } from '../../../../theme/components/baPowerChart';
import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BaThemeConfigProvider } from '../../../../theme';
import { MqttService } from '../../../../service/mqtt.service/mqtt.service';

import { Globals } from '../../../../service/globals';

import * as moment from 'moment';
import { ChartistJsService } from './chartistJs.service';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
@Component({
  selector: 'chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
})

export class ChartistJs implements OnInit, AfterViewInit {
    @Input() token: string;
    @Input() turbineName: string;
    @Input() capacityFactor: string;
    @Input() powerGenerated: string;
    @Input() noOfWarnings: string;
    @Input() noOfCriticalEvents: string;
    vibrationData: any;
    powerData: any;
    simpleLineOptions: any;
    simpleLineData: any;
    selectedDate: any;


    public turbine_notifications: Array < Object > ;

    powerOptions: Object;
    powerChart: any;
    vibrationOptions: Object;
    vibrationChart: any;
    vbrGearbox = [];
    vbrGenerator = [];
    vbrBearing = [];
    vbrNachelle = [];
    powerGenarationData = [];
    isFutureDate: boolean = true;

    powerMeasurements: any;

    vibrationMeasurements = {
        'vibration_gearbox': [],
        'vibration_generator': [],
        'vibration_bearing': [],
        'vibration_nachelle': [],
        'generatedPower': [],
    };
    @ViewChild('chartParentDiv') chartParentDiv;

    public assetDetails: any;
    constructor(private _chartistJsService: ChartistJsService, private _baConfig: BaThemeConfigProvider,
        private mqtt: MqttService, public restService: RestServicesService, public globals: Globals) {

        this.turbine_notifications = [];


        this.vibrationOptions = {
            title: {
                text: 'Turbine Vibration',
            },
            series: [{
                name: 'Gear box',
                data: [],
                allowPointSelect: true,
                    }, {
                name: 'Generator',
                data: [],
                allowPointSelect: true,
                    }, {
                name: 'Main box',
                data: [],
                allowPointSelect: true,
                    }, {
                name: 'Nachelle',
                data: [],
                allowPointSelect: true,
                    }],
            chart: {
                zoomType: 'x',
                alignTicks: true,
                animation: true,
                aspectRatio: false,
                backgroundColor: '#A7F2FE',
            },
            credits: {
                enabled: false,
            },
            legend: {
                enabled: true,
            },
            xAxis: {
                reversed: false,
                gridLineWidth: 1,
                type: 'datetime',
                gridLineColor: '#e0e0e0',
                minPadding: 0,
                title: {
                    text: 'Hours',
                },
            },
            yAxis: {
                gridLineColor: '#e0e0e0',
                title: {
                    text: 'Vibration',
                },
                labels: {
                    enabled: true,
                    style: {
                        color: 'black',
                    },
                },
            },
            tooltip: {
                backgroundColor: '#FCFFC5',
            },
            responsive: true,
            maintainAspectRatio: false,
        };

        this.powerOptions = {
            title: {
                text: 'Power Generation',
            },
            series: [{
                name: 'Power',
                data: [],
                allowPointSelect: true,
            }],
            chart: {
                zoomType: 'x',
                backgroundColor: '#A7F2FE',
                alignTicks: true,
                animation: true,
                aspectRatio: false,
            },
            credits: {
                enabled: false,
            },
            legend: {
                enabled: true,
            },
            xAxis: {
                reversed: false,
                gridLineWidth: 1,
                type: 'datetime',
                gridLineColor: '#e0e0e0',
                labels: {
                    enabled: true,
                },
                minPadding: 0,
                title: {
                    text: 'Hours',
                },
            },
            yAxis: {
                gridLineColor: '#e0e0e0',
                title: {
                    text: 'Power',
                },
                labels: {
                    enabled: true,
                    style: {
                        color: 'black',
                    },
                },

            },
            plotOptions: {
                series: {
                    zones: [{
                        value: 50, // Values up to 35 (not including) ...
                        color: 'blue',
                  }, {
                        value: 75, // Values up to 45 (not including) ...
                        color: 'orange',
                  }, {
                        color: 'red', // Above 45
                  }],
                },
            },

            tooltip: {
                backgroundColor: '#FCFFC5',
            },
            responsive: true,
            maintainAspectRatio: false,
        };
    }

    ngOnInit() {

        this.mqtt.getEmitter()
            .subscribe(item => this.onEventHandler(item));

        const date = new Date();
        this.selectedDate = date;
        const dateTime = moment(date).format(this.globals.DATE_FORMAT);
        // alert(this.selectedTime);
        this.getUpdatedData(dateTime);

    }

    ngAfterViewInit() {
        this.setGraphWidthToParent();
    }

    onEventHandler(item: any) {
        if (item.name === 'measurements' && item.data.assetModuleId === 'wt_devices') {
            if (this.token === item.data.deviceAssignmentToken) {
                this.turbine_notifications.unshift(item.data);
                const power = item.data.measurements.generatedPower;

                const myDate = new Date(item.data.eventDate);
                const result = myDate.getTime();

                this.powerChart.series[0].addPoint([result, power]);

                const vbGearbox = Number((item.data.measurements.vibration_gearbox).toFixed(2));
                this.vibrationChart.series[0].addPoint([result, vbGearbox]);

                const vbGenerator = Number((item.data.measurements.vibration_generator).toFixed(2));
                this.vibrationChart.series[1].addPoint([result, vbGearbox]);

                const vbMainbox = Number((item.data.measurements.vibration_bearing).toFixed(2));
                this.vibrationChart.series[2].addPoint([result, vbMainbox]);

                const vbNachelle = Number((item.data.measurements.vibration_nachelle).toFixed(2));
                this.vibrationChart.series[3].addPoint([result, vbNachelle]);
            }
        }
    }

    savePowerChart(chart) {
        this.powerChart = chart;
    }

    saveVibrationChart(chart) {
        this.vibrationChart = chart;
    }

    onResize(event) {
        this.setGraphWidthToParent();
    }

    setGraphWidthToParent() {
        this.powerChart.setSize(this.chartParentDiv.nativeElement.offsetWidth * 0.85, 340);
        this.vibrationChart.setSize(this.chartParentDiv.nativeElement.offsetWidth * 0.85, 340);
    }

    private getMeYesterday() {
        this.isFutureDate = false;
        this.selectedDate = new Date(Number(this.selectedDate) - 24 * 60 * 60 * 1000);
        return this.selectedDate;
    }

    getPreviousDateStats() {
        this.getMeYesterday();
        this.getUpdatedData(this.selectedDate);
    }

    private getMeNextday() {
        this.selectedDate = new Date(Number(this.selectedDate) + 24 * 60 * 60 * 1000);
        const currentTime = new Date().getTime();
        const timeInMilliSecs = new Date(Number(this.selectedDate) + 24 * 60 * 60 * 1000).getTime();

        if (timeInMilliSecs > currentTime) {
            this.isFutureDate = true;
            return this.selectedDate;
        } else {
            this.isFutureDate = false;
            return this.selectedDate;
        }

    }

    getNextDateStats() {
        this.getMeNextday();
        this.getUpdatedData(this.selectedDate);
    }

    getUpdatedData(date) {
        var startDate = new Date(date);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        var formattedStartDate = moment(startDate).format(this.globals.DATE_FORMAT);


        var endDate = new Date(date);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(999);

        var formattedEndDate = moment(endDate).format(this.globals.DATE_FORMAT);
        // alert(formattedStartDate);
        // alert(formattedEndDate);
        formattedStartDate = encodeURIComponent(formattedStartDate);
        formattedEndDate = encodeURIComponent(formattedEndDate);


        var measurements = encodeURIComponent("vibration_generator,vibration_gearbox,vibration_bearing,vibration_nachelle,generatedPower");
        this.getTurbineStats(formattedStartDate, formattedEndDate, measurements);

        this._chartistJsService.getAssetData(this.token, formattedStartDate, formattedEndDate).then((data) => {

            this.capacityFactor = Number(data.capacityFactor).toFixed(2);
            this.powerGenerated = Number(data.energyOutput).toFixed(2);
        });

        this._chartistJsService.getAssetMessageData(this.token, formattedStartDate, formattedEndDate).then((data) => {
            this.noOfWarnings = data.warning;
            this.noOfCriticalEvents = data.critical;
        });
    }

    getTurbineStats(formattedStartDate, formattedEndDate, measurements) {
        this._chartistJsService.getTurbineVibrationData(this.token, formattedStartDate,
            formattedEndDate, measurements).then((data) => {
            this.vibrationMeasurements.vibration_gearbox = data.vibration_gearbox;
            this.vibrationMeasurements.vibration_generator = data.vibration_generator;
            this.vibrationMeasurements.vibration_bearing = data.vibration_bearing;
            this.vibrationMeasurements.vibration_nachelle = data.vibration_nachelle;
            this.vibrationMeasurements.generatedPower = data.generatedPower;

            this.vibrationChart.series[0].setData(this.vibrationMeasurements.vibration_gearbox);
            this.vibrationChart.series[1].setData(this.vibrationMeasurements.vibration_generator);
            this.vibrationChart.series[2].setData(this.vibrationMeasurements.vibration_bearing);
            this.vibrationChart.series[3].setData(this.vibrationMeasurements.vibration_nachelle);
            this.powerChart.series[0].setData(this.vibrationMeasurements.generatedPower);
        });
    }

}