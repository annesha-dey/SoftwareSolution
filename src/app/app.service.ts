import { Injectable } from '@angular/core';
import { RestServicesService } from './service/rest.service/rest-services.service';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
    _state: InternalStateType = {};

    constructor(private restService: RestServicesService) {}

    // already return a clone of the current state
    get state() {
        return this._state = this._clone(this._state);
    }

    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }


    get(prop ? : any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }


    private _clone(object: InternalStateType) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    }

    public getSiteData(): Promise < any > {
        return new Promise((resolve, reject) => {
            let sites = [];
            this.restService.getAllSiteList().subscribe(response => {
                    const resultObject = response.json();
                    sites = resultObject.results;
                    
                    resolve(sites);
                },
                error => {
                    resolve(sites);
                });

        });
    }
}