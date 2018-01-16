import {Component, OnInit} from '@angular/core';

import {BaMsgCenterService} from './baMsgCenter.service';

import { MqttService } from '../../../service/mqtt.service/mqtt.service';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter implements OnInit {

  public notifications:Array<Object>;
  public messages:Array<Object>;

  constructor(private _baMsgCenterService: BaMsgCenterService, private mqtt: MqttService) {
    // this.notifications = this._baMsgCenterService.getNotifications();
    // this.messages = this._baMsgCenterService.getMessages();
     this.notifications = [];
     this.messages = [];
  }

  ngOnInit() {
      this.mqtt.getEmitter()
        .subscribe(item => this.onEventHandler(item));
    }

  onEventHandler(item: any) {
      //console.log("in msgcenter onEventHandler...");
      if (item.name === 'alerts') {
          this.notifications.unshift(item.data);
      }
    }
}
