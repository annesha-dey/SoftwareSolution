import {Injectable} from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';

@Injectable()
export class MapsService {


    constructor(public restService: RestServicesService) {

    }

    getData(sites): Promise < any > {
        return new Promise((resolve, reject) => {
            var locationAssetData = []
            var requestCount = 0;
            for (var index = 0; index < sites.length; index++) {
                this.restService.getTestMap(sites[index].token).subscribe(response => {
                        const resultObject = response.json();
                        // console.log('result is' + JSON.stringify(resultObject.results));
                        for (var asset of resultObject.results) {

                            if (asset.assetModuleId === 'wt_devices') {

                                var measurementData = "";
                                if (asset.state && asset.state.latestMeasurements) {
                                    for (var measurements of asset.state.latestMeasurements) {
                                        measurementData = measurementData + measurements.name + ": <b>" + measurements.value + "</b><br/>"
                                    }
                                }

                                locationAssetData.push({
                                    hardwareId: asset.deviceHardwareId,
                                    id: asset.assetId,
                                    name: asset.assetName,
                                    token: asset.token,
                                    latitude: asset.associatedLocation.latitude,
                                    longitude: asset.associatedLocation.longitude,
                                    assetImageUrl: asset.assetImageUrl,
                                    measurements: measurementData
                                });


                            }

                        }
                        requestCount++;
                        if (requestCount == sites.length) {
                            requestCount = 0;
                            resolve(locationAssetData);
                        }
                    },
                    error => {
                        requestCount++;
                        if (requestCount == sites.length) {
                            requestCount = 0;
                            resolve(locationAssetData);
                        }
                    });
            }
        });
    }
}