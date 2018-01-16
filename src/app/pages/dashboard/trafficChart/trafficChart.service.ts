import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { RestServicesService } from '../../../service/rest.service/rest-services.service';
@Injectable()
export class TrafficChartService {
    totalPowerGeneration = [];
    public testObj = [];
    
    public color = [];
    constructor(private _baConfig: BaThemeConfigProvider, public restService: RestServicesService) {

        let dashboardColors = this._baConfig.get().colors.dashboard;
        this.color = [dashboardColors.white, dashboardColors.gossip]
    }

    

    getTrafficData(site, startDate, endDate): Promise < any > {
        return new Promise((resolve, reject) => {
            
            var colorIndex = 0;
            this.restService.getFarmStats(site.token, startDate, endDate).subscribe(response => {
                    const resultObject = response.json();
                    resolve({
                        value: Number(resultObject.powerGenerated).toFixed(2),
                        siteToken: resultObject.siteToken,
                        color: this.color[site.colorIndex],
                        highlight: colorHelper.shade(this.color[site.colorIndex], 15),
                        label: site.name,
                        percentage: 0,
                        order: 1,
                        sl: site.sl
                    });
                },
                error => {
                    resolve({value: 0,
                        siteToken: site.token,
                        color: this.color[site.colorIndex],
                        highlight: colorHelper.shade(this.color[site.colorIndex], 15),
                        label: site.name,
                        percentage: 0,
                        order: 1,
                        sl: site.sl});
                });
        });
    }
}
