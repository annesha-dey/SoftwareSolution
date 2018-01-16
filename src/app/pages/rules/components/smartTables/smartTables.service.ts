import { Injectable } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';

@Injectable()
export class SmartTablesService {

    constructor(public restService: RestServicesService) {


      }

      getData(): Promise<any> {
        return new Promise((resolve, reject) => {
         const rulesData = [];
          this.restService.getRule().subscribe(response => {
            const resultObject = response.json();
            console.log(resultObject);
            for (const rule of resultObject._embedded.ruleResourceList) {
               rulesData.push({ name : rule.name,
                occurances: rule.occurances,
                assetID: rule.assetId,
                type: rule.assetModuleId,
                ruleId: rule.ruleId });
            }
           // console.log(rulesData);
            resolve(rulesData);
          },
          error => {
            resolve(rulesData);
          });

        });
      }
    }
