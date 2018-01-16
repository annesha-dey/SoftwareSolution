import { Injectable } from '@angular/core';

import { BaThemeConfigProvider } from '../../../../theme';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
@Injectable()
export class ChartistJsService {

    constructor(public restService: RestServicesService) {

    }

    getAssetData(token, startDate, endDate): Promise < any > {
        return new Promise((resolve, reject) => {
            this.restService.getAssetData(token, startDate, endDate).subscribe(response => {
                    const resultObject = response.json();
                    resolve(resultObject);
                },
                error => {
                    resolve({
                      capacityFactor : 0,
                      energyOutput : 0,
                    });
                });
        });
    }

    getAssetMessageData(token, startDate, endDate): Promise < any > {
        return new Promise((resolve, reject) => {
            this.restService.getAssetMessageData(token, startDate, endDate).subscribe(response => {
                    const resultObject = response.json();
                    var result = {
                        warning: 0,
                        critical: 0,
                    };
                    for (var alert1 of resultObject.results) {
                        if (alert1.level === 'Warning') {
                            result.warning++;
                        } else if (alert1.level === 'Critical') {
                            result.critical++;
                        }
                    }
                    resolve(result);
                },
                error => {
                    resolve({
                        warning: 0,
                        critical: 0,
                    });
                });
        });
    }

    getTurbineVibrationData(token, startDate, endDate, measurements): Promise < any > {
      return new Promise((resolve, reject) => {
        this.restService.getWindTurbineMeasurementData(token, startDate, endDate, measurements).subscribe(response => {
          const resultObject = response.json();

          let result = {
            'vibration_gearbox': [],
            'vibration_generator': [],
            'vibration_bearing': [],
            'vibration_nachelle': [],
            'generatedPower': [],
          };
          for (let i = 0; i < resultObject.length; i++) {
              const powerValue = [];
              const dateTime = [];
              let measurement = [];

              for (const entry of resultObject[i].entries) {
                  const dateString = entry.measurementDate;
                  const newDate = new Date(dateString);
                  const vbrGearboxObj = [newDate.getTime(), entry.value];
                  measurement.push(vbrGearboxObj);
              }

              if (resultObject[i].measurementId === 'vibration_gearbox') {
                result.vibration_gearbox = measurement;
              } else if (resultObject[i].measurementId === 'vibration_generator') {
                result.vibration_generator = measurement;
              } else if (resultObject[i].measurementId === 'vibration_bearing') {
                result.vibration_bearing = measurement;
              } else if (resultObject[i].measurementId === 'vibration_nachelle') {
                result.vibration_nachelle = measurement;
              } else if (resultObject[i].measurementId === 'generatedPower') {
                result.generatedPower = measurement;
              }

          }
          resolve(result);
      },
      error => {
        resolve();
      });
      });
  }
}
