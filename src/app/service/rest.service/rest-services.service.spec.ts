
import { TestBed, inject } from '@angular/core/testing';

import { RestServicesService } from './rest-services.service';

describe('RestServicesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RestServicesService]
        });
    });

    it('should be created', inject([RestServicesService], (service: RestServicesService) => {
        expect(service).toBeTruthy();
    }));
});
