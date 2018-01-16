import {Component, OnInit } from '@angular/core';
import { FormsModule , FormBuilder, Validators , FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'add-condition',
  templateUrl: './addCondition.html',
})
export class addCondition {
   _ref:any;
public conditionForm: FormGroup;
public assetAttr: any;
public configParamsAssets: Array<{ id: number, attr: string }>;



   constructor(public fb: FormBuilder) {
     console.log("In conditioncomponent");
     this.conditionForm = this.fb.group({
       parameter: ["", Validators.required],
       operation: ["", Validators.required],
       measure: ["", Validators.required],
   });

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

    }

   removeObject(){
     this._ref.destroy();
   }

   save(){
     alert('Saved Successfully!');
   }
}
