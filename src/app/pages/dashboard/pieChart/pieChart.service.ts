import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.resource_utilization',
        stats: '572',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'dashboard.availability',
        stats: '8900 Hrs',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'dashboard.active_devices',
        stats: '620',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'dashboard.avg_windspeed',
        stats: '32',
        icon: 'refresh',
      }
    ];
  }
}
