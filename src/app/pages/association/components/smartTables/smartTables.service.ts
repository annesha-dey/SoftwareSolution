import { Injectable } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';

@Injectable()
export class SmartTablesService {


    constructor(public restService: RestServicesService) {

    }

    getData(): Promise < any > {
        return new Promise((resolve, reject) => {
            var smartTableData = [];
            this.restService.getAssociationList().subscribe(response => {
                    const resultObject = response.json();
                    const deviceObject = resultObject.results;

                    for (const asset of resultObject.results) {
                        smartTableData.push({
                            siteName: asset.siteName,
                            hardwareId: asset.device.hardwareId,
                            assetId: asset.device.assignment.assetId,
                            assetName: asset.device.assignment.assetName,
                            assignmentToken: asset.device.assignment.token,
                            assignmentType: asset.device.assignment.assignmentType,
                            // assetModuleId: asset.assignment.assetModuleId,
                            // assignmentAssetId: asset.assignment.assetId,
                            assignmentAssetName: asset.device.assignment.assetName,
                            assignmentImage: asset.device.assignment.assetImageUrl,
                            image: asset.device.assetImageUrl
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
