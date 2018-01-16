import { Injectable, EventEmitter } from '@angular/core';
import {Paho} from 'ng2-mqtt/mqttws31';
import { NetworkGlobals} from '../network.globals';

/**
 *  Description: Angular MqttService
 */
@Injectable()
export class MqttService {
    static client;
    public topic;
    
	dispatcher: EventEmitter<any> = new EventEmitter();
	
    /**
     *  Description  : constructor     
     */
    constructor(private networkGlobals: NetworkGlobals) {
        
        }
      /**
         *  Description  : Establish MQTT connection with the MQTT Broker         
         */
      setupConnection(){
        const wsbroker = this.networkGlobals.MQTTBROKER_IP_ADDRESS;
        const wsport = this.networkGlobals.PORT_MQTTBROKER;
        const n =( (Math.random() * 100).toString());
        MqttService.client = new Paho.MQTT.Client(wsbroker, wsport, '/ws', 'myclientid_' + parseInt(n, 10));
        const options = {
                            timeout: 60,
                            useSSL: false,							
                            keepAliveInterval: 30,							
                            onSuccess: this.onConnected.bind(this),
                            onFailure: function (message) {
                                console.log('CONNECTION FAILURE - ' + message.errorMessage);
                            }
          };
          if (location.protocol === 'https:') {
                    options.useSSL = true;
          }
       MqttService.client.connect(options);
        this.onMessage();
        this.onConnectionLost();
        return MqttService.client;
      }

    /**
     *  Description  : Disconnect the MQTT client from the MQTT Broker     
     */
    Disconnect() {
        console.log('client is disconnecting..');
        MqttService.client.disconnect();
    }

    /**
     *  Description  : Series of tasks to be executed once the MQTT connection has been Successful     
     */
      onConnected() {
         console.log('Connected to Broker, now subscribing...');
         //console.log(MqttService.client);
         MqttService.client.subscribe('ciot/windfarm/output');          
        }

    /**
     *  Description  : Series of tasks to be executed once a message is received over MQTT     
     */
    onMessage() {
        MqttService.client.onMessageArrived = (message: Paho.MQTT.Message) => {
            let obj: any = {};            

            try {
                obj = JSON.parse(message.payloadString);
            } catch (e) {
                //alert(e);
				console.log('error: '+e);
            }

            if (obj.eventType === 'Alert') {				           
				this.emitMessageEvent('alerts',obj);
            
            } else if (obj.eventType === 'Measurements') {                 
				 this.emitMessageEvent('measurements',obj);
				 
            } else{
                console.log('in else topic');
            }
		}
    }
 

    /**
     *  Description  : Function to handle Connection disruption and reconnect     
     */
    onConnectionLost() {
        MqttService.client.onConnectionLost = function (responseObject) {
            console.log('CONNECTION LOST - ' + responseObject.toString);				
        };
		
    }

	emitMessageEvent(name:string, data:any){
		let message = {
			name : name,
			data : data
		};
		this.dispatcher.emit(message);
	}
  
	getEmitter() {
		return this.dispatcher;
	 }
	
}
