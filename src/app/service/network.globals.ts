import { Injectable } from '@angular/core';
import { config } from '../config/config';

/**
 *	Description: NetworkGlobals
 *	@ClassName : NetworkGlobals
 */
@Injectable()
export class NetworkGlobals {
    IP_ADDRESS = config.serverHost;
    IP_ADDRESS1 = config.serverHost;
    MQTTBROKER_IP_ADDRESS = config.brokerIP;

    HTTP = 'http://';
    HTTPS = 'https://';

	PORT_ASSET_MODULE = config.assetPort; // '8096'
    PORT_MQTTBROKER = config.brokerPort; // '15675';
    
   
    GET_DEVICE_LIST_URL = ':' + this.PORT_ASSET_MODULE + '/ciot/api/devices';

    GET_ASSET_LIST_URL = ':' + this.PORT_ASSET_MODULE + '/ciot/api/devices';
    
    GET_ASSOCIATION_LIST_URL = ':' + this.PORT_ASSET_MODULE + '/ciot/api/devices';
    
    /*
    getUrl(serverIP, url) {
        return (this.HTTP + serverIP + url);
     } */

    getUrl(serverIP, url) {
        return (this.HTTP + this.IP_ADDRESS1 + url);
    }
}
