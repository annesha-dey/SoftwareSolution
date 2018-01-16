import { Injectable } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import * as moment from 'moment';

@Injectable()
export class SmartTablesService {



    constructor(public restService: RestServicesService) {

    }

    getData(): Promise < any > {
        return new Promise((resolve, reject) => {
            var smartTableData = [];
            this.restService.getAllDeviceList().subscribe(response => {
                    const resultObject = response.json();
                    const deviceObject = resultObject.results;
                    for (let i = 0; i < deviceObject.length; i++) {
                        const date = moment(deviceObject[i].device.createdDate).format('HH:mm:ss  MMM YYYY ');
                        smartTableData.push({
                            assetId: deviceObject[i].device.assignment.assetId,
                            assetName: deviceObject[i].device.assignment.assetName,
                            assetType: deviceObject[i].device.assetCategoryId,
                            siteName: deviceObject[i].siteName,
                            createdDate: date,
                            image: deviceObject[i].device.assignment.assetImageUrl
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
