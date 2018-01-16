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
            this.restService.getAllSiteList().subscribe(response => {
                    const resultObject = response.json();

                    for (const site of resultObject.results) {
                        const date = moment(site.createdDate).format('HH:mm:ss  MMM YYYY ');
                        smartTableData.push({
                            name: site.name,
                            token: site.token,
                            createdDate: date,
                            description: site.description,
                            type: site.map.type,
                            location: "Lat:" + site.map.metadata.centerLatitude + " Lng:" + site.map.metadata.centerLongitude,
                            rated_power: '<div class="wide">' + "Area: " + site.metadata.Area + '</div><div class="wide">' + "Net output: " +
                                site.metadata.Annual_Net_Output + '</div><div class="wide">' + "Capacity factor: " + site.metadata.Capacity_Factor + '</div>',
                            image: site.imageUrl
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
