import { Component, inject } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-visits',
  templateUrl: './add-visits.component.html',
  styleUrl: './add-visits.component.css'
})
export class AddVisitsComponent {

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifthFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required],
  });
  isLinear = false
  
}
