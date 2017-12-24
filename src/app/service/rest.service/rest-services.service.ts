
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
    /**
     *	Description  : constructor     
     */
    constructor(private _http: Http, private networkGlobals: NetworkGlobals) {
        this.networkGlobals.IP_ADDRESS = location.host;
    }

    /**
     *	Description  : getAllDeviceList
     */
    public getAllDeviceList() {
		let tempHeaders = new Headers();
		
		tempHeaders.append('X-Ciot-Tenant', 'parking1234567890'); 
		tempHeaders.append('Authorization','Basic YWRtaW46cGFzc3dvcmQ=');
				
        let options = new RequestOptions({ headers: tempHeaders});
        const url = this.networkGlobals.getUrl(location.host, this.networkGlobals.GET_DEVICE_LIST_URL);
        return this._http.get(url, options);
    }
   
    
    /**
     *	Description  : getAllAssetsList     
     */
    public getAllAssetsList() {
		let tempHeaders = new Headers();
		
		tempHeaders.append('X-Ciot-Tenant', 'parking1234567890'); 
		tempHeaders.append('Authorization','Basic YWRtaW46cGFzc3dvcmQ=');
				
        let options = new RequestOptions({ headers: tempHeaders});
        const url = this.networkGlobals.getUrl(location.host, this.networkGlobals.GET_ASSET_LIST_URL);
        return this._http.get(url, options);
    }
  

    /**
     *	Description  : getAssociationList     
     */
    public getAssociationList() {
		let tempHeaders = new Headers();
		
		tempHeaders.append('X-Ciot-Tenant', 'parking1234567890'); 
		tempHeaders.append('Authorization','Basic YWRtaW46cGFzc3dvcmQ=');
				
        let options = new RequestOptions({ headers: tempHeaders});
        const url = this.networkGlobals.getUrl(location.host, this.networkGlobals.GET_ASSOCIATION_LIST_URL);
        return this._http.get(url, options);
    }

}
