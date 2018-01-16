import { Injectable } from '@angular/core';

/**
 *	Description: GlobalDataService
 *	@ClassName : GlobalDataService
 */
@Injectable()
export class GlobalDataService {    
    private mqttConnStatus = '0';
    constructor() {
		
	}

    setMQTTConnectionStatus(value) {
      this.mqttConnStatus = value;
  }

  getMQTTConnectionStatus() {
      return this.mqttConnStatus ;
  }
}
