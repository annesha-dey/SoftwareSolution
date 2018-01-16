import { Injectable } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';

@Injectable()
export class SmartTablesService {



    constructor(public restService: RestServicesService) {

    }

    getData(): Promise < any > {
        return new Promise((resolve, reject) => {
            var smartTableData = [];
            this.restService.getAllAssetsList().subscribe(response => {
                    const resultObject = response.json();
                    for (const asset of resultObject.results) {
                        let assetLat = asset.latitude;
                        let assetLng = asset.longitude;
                        if (asset.latitude === undefined) {
                            assetLat = '';
                        }
                        if (asset.longitude === undefined) {
                            assetLng = '';
                        }
                        smartTableData.push({
                            id: asset.id,
                            name: asset.name,
                            type: asset.categoryName,
                            assetCategoryId: asset.assetCategoryId,
                            parameters: '<div class="wide">' + "Lat: " + assetLat + '</div><div class="wide">' + "Lng: " + assetLng + '</div>',
                            image: asset.imageUrl
                        });
                    }
            
                    /*const resultObject = response.json();
                    const deviceObject = resultObject.results;
                    for (let i = 0; i < deviceObject.length; i++) {
                        const date = moment(deviceObject[i].device.createdDate).format('HH:mm:ss  MMM YYYY ');
                        smartTableData.push({
                            hardwareId: deviceObject[i].device.hardwareId,
                            assetId: deviceObject[i].device.assignment.assetId,
                            assetName: deviceObject[i].device.assetName,
                            siteName: deviceObject[i].siteName,
                            createdDate: date,
                            image: deviceObject[i].device.assetImageUrl
                        });
                    }*/
                    resolve(smartTableData);
                },
                error => {
                    resolve(smartTableData);
                });


        });
    }
}
