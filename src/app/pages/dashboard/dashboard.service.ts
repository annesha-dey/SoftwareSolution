import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../theme';
import { RestServicesService } from '../../service/rest.service/rest-services.service';

@Injectable()
export class DashboardService {

    public testObj = [];
    public pieData = [];
    public AssetCount = 0;
    constructor(private _baConfig: BaThemeConfigProvider, public restService: RestServicesService) {
        
    }

    getPieData(token, startDate, endDate, lastHourDate) {
        let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
        this.pieData = [{
                color: pieColor,
                description: 'Asset Utilization',
                stats: '0' + ' %',
                display: true,
}, {
                color: pieColor,
                description: 'Active Assets',
                stats: '0',
                icon: 'face',
                display: true,
}, {
                color: pieColor,
                description: 'Total Energy Generated',
                stats: '0 MWh',
                icon: 'face',
                display: true,
}, {
                color: pieColor,
                description: 'Wind Speed',
                stats: '0 m/s',
                icon: 'refresh',
                display: true,
}
, {
                color: pieColor,
                description: 'Temperature',
                stats: '0 °C',
                icon: 'refresh',
                display: true,
}];

        this.restService.getSiteAssets(token).subscribe(response => {
                const resultObject = response.json();
                let activeAssetCount = 0;
                let assetCount = 0;
                assetCount = resultObject.numResults;
            
                //console.log('Total assetsssssssss', assetCount);
            
                this.restService.getActiveAssets(token, lastHourDate).subscribe(response => {
                        const resultObject = response.json();
                        let activeAssetCount = 0;

                        activeAssetCount = resultObject.numResults;
                        this.pieData[1] = {
                            color: pieColor,
                            description: 'Active Assets',
                            stats: activeAssetCount,
                            icon: 'face',
                            display: true,
                        };
                    
                        
                        let percentageActive = 0;
                        if(assetCount){
                            percentageActive = (activeAssetCount / assetCount) * 100;
                        }
                        this.pieData[0] = {
                            color: pieColor,
                            description: 'Asset Utilization',
                            stats: Number(percentageActive).toFixed(2) + ' %',
                            display: true,
                        };

                    },
                    error => {});

            },
            error => {});



        this.restService.getFarmStats(token, startDate, endDate).subscribe(response => {
                const resultObject = response.json();

                console.log(resultObject);
                let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
                this.pieData[2] = {
                    color: pieColor,
                    description: 'Total Energy Generated',
                    stats: (Number(resultObject.powerGenerated)/1000).toFixed(2) + ' MWh',
                    icon: 'face',
                    display: true,
                };
            
                this.pieData[3] = {
                    color: pieColor,
                    description: 'Wind Speed',
                    stats: (Number(resultObject.wind_speed).toFixed(0)) + ' m/s',
                    icon: 'face',
                    display: true,
                };
            
                this.pieData[4] = {
                    color: pieColor,
                    description: 'Temperature',
                    stats: (Number(resultObject.temperature).toFixed(0)) + ' °C',
                    icon: 'face',
                    display: true,
                };
            },
            error => {});


        return this.pieData;
    }


}
