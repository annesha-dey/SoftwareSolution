import { Injectable } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';

@Injectable()
export class SmartTablesService {

  smartTableData = [];

  constructor(public restService: RestServicesService) {
    this.restService.getAllAssetsList().subscribe(response => {
      const resultObject = response.json();
      // console.log('result is' + JSON.stringify(resultObject.results));

      for (const asset of resultObject.results) {
        this.smartTableData.push({ id : asset.id,
          name: asset.name,
          type: asset.type,
          assetCategoryId: asset.assetCategoryId,
          parameters: 'Lat:' + asset.latitude +  '  Lng:' + asset.latitude + '  Elevation:' + asset.elevation,
          image: asset.imageUrl });
    }
    },
    error => {

    });
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.smartTableData);
      }, 1000);
    });
  }
}
