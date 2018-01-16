import { Injectable } from '@angular/core';
import { config } from '../config/config';

/**
 *	Description: NetworkGlobals
 *	@ClassName : NetworkGlobals
 */
@Injectable()
export class NetworkGlobals {
    IP_ADDRESS = config.serverHost;
    MQTTBROKER_IP_ADDRESS = config.brokerIP;
    RULE_API_ADDRESS = config.rulesApiHost;
    WINDFARM_API_ADDRESS = config.windfarmApiHost;

    HTTP = 'http://';
    HTTPS = 'https://';

    TENANT_ID = config.tenantID;
    AUTHORIZATION_HEADER = config.authorization;

    SERVER_PORT = config.serverPort; // '8096'
    PORT_MQTTBROKER = config.brokerPort; // '15675';
    RULE_API_PORT = config.rulesApiPort;

    WINDFARM_API_PORT = config.windfarmApiPort;

    GET_SITE_LIST_URL = ':' + this.SERVER_PORT + '/ciot/api/sites';
    GET_DEVICE_LIST_URL = this.HTTP + this.WINDFARM_API_ADDRESS + ':' + this.WINDFARM_API_PORT + '/windfarm/getAllDevices';
    GET_ASSET_LIST_URL = this.HTTP + this.WINDFARM_API_ADDRESS + ':' + this.WINDFARM_API_PORT + '/windfarm/getAllAssets';
    GET_ASSOCIATION_LIST_URL = this.HTTP + this.WINDFARM_API_ADDRESS + ':' + this.WINDFARM_API_PORT + '/windfarm/getAllDevices';

    GET_RULE_URL = this.HTTP + this.RULE_API_ADDRESS + ':' + this.RULE_API_PORT + '/ciot/api/rules/';
    ADD_RULE_URL = this.HTTP + this.RULE_API_ADDRESS + ':' + this.RULE_API_PORT + '/ciot/api/rules/';
    DELETE_RULE_URL = this.HTTP + this.RULE_API_ADDRESS + ':' + this.RULE_API_PORT + '/ciot/api/rules/';
    EDIT_RULE_URL = this.HTTP + this.RULE_API_ADDRESS + ':' + this.RULE_API_PORT + '/ciot/api/rules/';

    TEST_MAP_URL = ':' + this.SERVER_PORT + '/ciot/api/sites/';

    ASSET_DETAILS_DATA = this.HTTP + this.WINDFARM_API_ADDRESS + ':' + this.WINDFARM_API_PORT + '/windfarm/turbine/';
    ASSET_MESSAGE_DETAILS = ':' + this.SERVER_PORT + '/ciot/api/assignments/';



    GET_FARM_STATS_URL = this.HTTP + this.WINDFARM_API_ADDRESS + ':' + this.WINDFARM_API_PORT + '/windfarm/windfarm/';
    GET_TURBINE_STATS_URL = this.HTTP + this.WINDFARM_API_ADDRESS + ':' + this.WINDFARM_API_PORT + ' /windfarm/turbine/';

//    GET_TURBINE_VIBRATION_STATS_URL = ':' + this.SERVER_PORT + '/ciot/api/assignments/3f2d5415-9ecb-444e-bb4d-deccb4bf8053/measurements/series?page=1&pageSize=100&startDate=2018-01-01T11%3A50%3A39.247%2B0000&endDate=2018-01-12T12%3A00%3A39.247%2B0000&measurementIds=vibration_nachelle%2C%20vibration_generator%2C%20vibration_gearbox%2C%20vibration_bearing%2C%20generatedPower';

    GET_TURBINE_MEASUREMENTS_DATA_URL = ':' + this.SERVER_PORT + '/ciot/api/assignments/';

    /*
    getUrl(serverIP, url) {
        return (this.HTTP + serverIP + url);
     } */

    getUrl(url) {
        return (this.HTTP + this.IP_ADDRESS + url);
    }
}
