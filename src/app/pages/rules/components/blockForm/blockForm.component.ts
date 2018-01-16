import {Component, OnInit,  ViewChild, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import { FormsModule , FormBuilder, Validators ,FormArray, FormGroup, FormControl } from '@angular/forms';
import {addCondition} from '../AddCondition/addCondition.component';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'block-form',
  templateUrl: './blockForm.html',
})
export class BlockForm implements OnInit{
   public site :any;
   public assetModuleId: any;
   public assetAttr: any;
   public ruleForm: FormGroup;
   public ruleObj;
   public conditionItems: string;

  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

     constructor(private _cfr: ComponentFactoryResolver,public fb: FormBuilder, public restService: RestServicesService, private router: Router) {
      this.site = [
         {'sitename': 'Wind Farm 1', 'token':'0da60d33-dc9f-4574-8200-4cf984b3d6ea'},
         {'sitename': 'Wind Farm 2', 'token':'d7889d51-0140-4545-a5dd-21e7353f0550'}
       ];
       this.assetModuleId = [
          { 'id': 'wf_devices' },
          { 'id': 'wind_farm_gateway' },
          { 'id': 'wt_devices' },
          { 'id': 'wf_devices' }
        ];
        this.assetAttr = [
          { 'attr': "opticalStrain_blade3" },
          { 'attr': "opticalStrain_blade2" },
          { 'attr': "opticalStrain_blade1" },
          { 'attr': "lubeoil_generator_temperature" },
          { 'attr': "lubeoil_generator_moisture" },
          { 'attr': "lubeoil_gearbox_temperature" },
          { 'attr': "vibration_nachelle" },
          { 'attr': "vibration_generator" },
          { 'attr': "vibration_nachelle" },
          { 'attr': "vibration_gearbox" }
   ];

    /*   this.ruleObj =
       {
                    "siteToken": this.site[0].token,
                    "name": "High WindSpeed",
                    "assetId": "wind_turbine_1",
                    "assetModuleId": "wt_devices",
                    "conditions": "measurements[wind_speed] < 444",
                    "action": {
                                    "source": "System",
                                    "type": "WindSpeed Alert",
                                    "level": "Warning",
                                    "message": "Low WindSpeed detected"
                    }
    };*/

      this.ruleForm  = this.fb.group({
    name: ["", Validators.required],
    sitename: ["", Validators.required],
    assetType: ["", Validators.required],
    assetID: ["", Validators.required],
    conditions: this.fb.array([
      this.initCondition(),
    ]),
    fulfilment: ["", Validators.required],
    alertLevel:  ["", Validators.required],
    alertType:  ["", Validators.required],
    message:  [""]
     });
      }

      initCondition() {
        // initialize our address
        return this.fb.group({
            parameter: ["", Validators.required],
            operation: ["", Validators.required],
            measure: ["", Validators.required]
        });
    }

    addAddress() {
      // add address to the list
      const control = <FormArray>this.ruleForm.controls['conditions'];
      control.push(this.initCondition());
  }

    removeAddress(i: number) {
      // remove address from the list
      const control = <FormArray>this.ruleForm.controls['conditions'];
      control.removeAt(i);
    }
      onChange(event): void {  // event will give you full breif of action
         const newVal = event.target.value;
         console.log(newVal);

       }

      doLogin(event) {
     console.log(event);
     console.log(this.ruleForm);
     console.log('Form values', this.ruleForm.value);
     let ruleString = this.Fulfilment(this.ruleForm.value.fulfilment);
     console.log('conditionItems',this.conditionItems);
     this.ruleObj =
     {
                  "siteToken": this.ruleForm.value.sitename,
                  "name":  this.ruleForm.value.name,
                  "assetId": "wind_turbine_1",
                  "assetModuleId":  this.ruleForm.value.assetType,
                  "conditions" : ruleString,
                /*  "conditions": "measurements[" +this.ruleForm.value.conditions[0].parameter + "] "
                                 +this.ruleForm.value.conditions[0].operation + " "
                                 +this.ruleForm.value.conditions[0].measure,*/
                  "action": {
                                  "source": "System",
                                  "type":  this.ruleForm.value.alertType,
                                  "level":  this.ruleForm.value.alertLevel,
                                  "message":  this.ruleForm.value.message,
                  }
     };
           this.restService.addRule(this.ruleObj).subscribe(response => {

                      console.log(response);
                      this.router.navigate(['/pages/rules/listRules']);
                    });

}

                Fulfilment(fulfilment){
                //  for(let index = this.ruleForm.value.conditions.length; index > 0; index--){
                     let index = this.ruleForm.value.conditions.length;
                    this.conditionItems = "measurements[" +this.ruleForm.value.conditions[index - 1].parameter + "] "
                                                      +this.ruleForm.value.conditions[index - 1].operation + " "
                                                      +this.ruleForm.value.conditions[index - 1].measure + "]";
                    if(index >1)
                    {
                    index --;
                    do {
                      index --;

                      this.conditionItems =this.conditionItems + " " +this.ruleForm.value.fulfilment + " " +"measurements[" +this.ruleForm.value.conditions[index].parameter + "] "
                                                       +this.ruleForm.value.conditions[index ].operation + " "
                                                       +this.ruleForm.value.conditions[index ].measure;
                    }
                    while ( index > 0 );
                      }
                      console.log('fulfilment conditions',this.conditionItems);
                      return this.conditionItems;
                  }
     ngOnInit(){
     //  this.addComponent();
   }

    /*addComponent(){
        var comp = this._cfr.resolveComponentFactory(addCondition);
        var expComponent = this.container.createComponent(comp);
        expComponent.instance._ref = expComponent;
    }*/
}
