
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { NetworkGlobals} from '../network.globals';

/**
 *	Description : RestServicesService
 */
@Injectable()
export class RestServicesService {
    public tenantHeader;
    /**
     *	Description  : constructor
     */
    constructor(private _http: Http, private networkGlobals: NetworkGlobals) {
        this.tenantHeader = this.setTenantHeader();
        console.log('In RestServicesService');
    }

    /**
     *	Description  : set TenantHeader
     */
    public setTenantHeader() {
        let tempHeaders = new Headers();

        tempHeaders.append('X-Ciot-Tenant', this.networkGlobals.TENANT_ID);
        tempHeaders.append('Authorization', this.networkGlobals.AUTHORIZATION_HEADER);

        let options = new RequestOptions({
            headers: tempHeaders
        });

        return options;
    }

    /**
     *	Description  : fetch SiteList
     */
    public getAllSiteList() {
        let options = this.tenantHeader;
        const url = this.networkGlobals.getUrl(this.networkGlobals.GET_SITE_LIST_URL);
        return this._http.get(url, options);
    }


    /**
     *	Description  : fetch DeviceList
     */
    public getAllDeviceList() {
        const url = this.networkGlobals.GET_DEVICE_LIST_URL;
        return this._http.get(url);
    }


    /**
     *	Description  : fetch AssetsList
     */
    public getAllAssetsList() {
        const url = this.networkGlobals.GET_ASSET_LIST_URL;
        return this._http.get(url);
    }


    /**
     *	Description  : fetch AssociationList
     */
    public getAssociationList() {
        const url = this.networkGlobals.GET_ASSOCIATION_LIST_URL;
        return this._http.get(url);
    }

    /**
     *	Description  : fetch Rule
     */
    public getRule() {
        const url = this.networkGlobals.GET_RULE_URL+'?size=100';
        return this._http.get(url);
    }

    /**
     *	Description  : add Rule
     */
    public addRule(param) {
	    const headerDict = {
        'Content-Type': 'application/json',
        //'Accept': 'application/json',
        'Cache-Control': 'no-cache'
        }

        const requestOptions = {                                                                                                                                                                                 
        headers: new Headers(headerDict), 
        };

        const url = this.networkGlobals.ADD_RULE_URL;
	
		const data = JSON.stringify(param);
        return this._http.post(url, data,requestOptions).map((res: Response) => res.json()).catch((error: any) => {
            if (error.status < 400 || error.status === 400) {
                return Observable.throw(new Error(error.status));
            }
        });
    }

    /**
     *	Description  : delete Rule
     */
    public deleteRule(ruleId) {
        const url = this.networkGlobals.DELETE_RULE_URL + ruleId;
        const headerDict = {
            'Content-Type': 'multipart/form-data',
            'Cache-Control': 'no-cache'
            }
    
            const requestOptions = {                                                                                                                                                                                 
            headers: new Headers(headerDict), 
            };
        
       // return this._http.delete(url, requestOptions);
        return this._http.delete(url).map((res: Response) => res.json()).catch((error: any) => {
            if (error.status < 400 || error.status === 400) {
                return Observable.throw(new Error(error.status));
            }
        });
    }

    /**
     *	Description  : edit Rule
     */
    public editRule(param) {
        const url = this.networkGlobals.EDIT_RULE_URL + param.ruleId;
        return this._http.put(url, param).map((res: Response) => res.json()).catch((error: any) => {
            if (error.status < 400 || error.status === 400) {
                return Observable.throw(new Error(error.status));
            }
        });
    }

    /**
     *	Description  : fetch SiteList
     */
    public getTestMap(token) {
        let options = this.tenantHeader;
        const url = this.networkGlobals.getUrl(this.networkGlobals.TEST_MAP_URL) + token + '/assignments?includeDevice=true&includeAsset=true&includeSite=false';
        return this._http.get(url, options);
    }

    public getAssetData(token, startDate, endDate) {
        let url = this.networkGlobals.ASSET_DETAILS_DATA + token + '?startDate=' + startDate + '&endDate=' + endDate;
        return this._http.get(url);
    }



    public getAssetMessageData(token, startDate, endDate) {

        let options = this.tenantHeader;
        const url = this.networkGlobals.getUrl(this.networkGlobals.ASSET_MESSAGE_DETAILS) + token + '/alerts?startDate=' + startDate + '&endDate=' + endDate;
        return this._http.get(url, options);
    }



    /**
     *	Description  : fetch windFarmStats
     */
    public getFarmStats(siteToken, startDate, endDate) {
        const url = this.networkGlobals.GET_FARM_STATS_URL + siteToken + '?startDate=' + startDate + '&endDate=' + endDate;
        return this._http.get(url);
    }
    /**
     *	Description  : fetch windTurbineStats
     */
    public getTurbineStats(deviceAssignmentToken) {
        let options = this.tenantHeader;
        let url = this.networkGlobals.getUrl(this.networkGlobals.GET_TURBINE_STATS_URL) + deviceAssignmentToken + '?startDate=2017-12-26T00%3A00%3A00.000%2B0000&endDate=2017-12-26T00%3A00%3A00.000%2B0000';
        return this._http.get(url, options);
    }


    public getWindTurbineMeasurementData(token, startDate, endDate, measurements) {
        let options = this.tenantHeader;
        const url = this.networkGlobals.getUrl(this.networkGlobals.GET_TURBINE_MEASUREMENTS_DATA_URL) + token + '/measurements/series?startDate=' + startDate + '&endDate=' + endDate + '&measurementIds=' + measurements ;
        return this._http.get(url, options);
    }

    public getActiveAssets(siteToken, startDate) {
        let options = this.tenantHeader;    
        const url = this.networkGlobals.getUrl(this.networkGlobals.GET_SITE_LIST_URL) + '/' + siteToken + '/assignments/lastinteraction?startDate=' + startDate;
        return this._http.get(url, options);
    }
    
    
    public getSiteAssets(siteToken) {
        let options = this.tenantHeader;
        const url = this.networkGlobals.getUrl(this.networkGlobals.GET_SITE_LIST_URL) + '/' + siteToken + '/assignments?includeDevice=false&includeAsset=true&includeSite=false';
        return this._http.get(url, options);
    }
}
