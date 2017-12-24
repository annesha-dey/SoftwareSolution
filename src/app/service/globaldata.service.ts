
import { Injectable } from '@angular/core';
import { Globals } from '../service/globals';

/**
 *	Description: GlobalDataService
 *	@ClassName : GlobalDataService
 */
@Injectable()
export class GlobalDataService {    
    private mqttConnStatus = '0';
    constructor(private globals: Globals) {}

    setMQTTConnectionStatus(value) {
      this.mqttConnStatus = value;
  }

  getMQTTConnectionStatus() {
      return this.mqttConnStatus ;
  }
}
