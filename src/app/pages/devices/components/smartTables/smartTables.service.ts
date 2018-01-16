import { Injectable } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import * as moment from 'moment';
@Injectable()
export class SmartTablesService {
  
  constructor(public restService: RestServicesService) {

  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      let smartTableData = [];
      this.restService.getAllDeviceList().subscribe(response => {
        const resultObject = response.json();
        const deviceObject = resultObject.results;
        for (let i = 0; i < deviceObject.length; i++) {
          const date = moment(deviceObject[i].device.createdDate).format('HH:mm:ss  MMM YYYY ');
          smartTableData.push({ hardwareId : deviceObject[i].device.hardwareId,
            deviceId: deviceObject[i].device.assignment.assetId,
            deviceName: deviceObject[i].device.assetName,
            siteName: deviceObject[i].siteName,
            createdDate:  date,
            assetName: deviceObject[i].device.assignment.assetName,
            image: deviceObject[i].device.assetImageUrl
          });
        }
        resolve(smartTableData);
      },
      error => {
        resolve(smartTableData);
      });

    });
  }
}
