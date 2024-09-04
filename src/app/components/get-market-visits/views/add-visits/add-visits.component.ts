import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PodService } from '../../../../services/pod.service';
import { Pod } from '../../../../models/pod';
import { IsrService } from '../../../../services/isr.service';
import { Isr } from '../../../../models/isr';
import { Pap } from '../../../../models/pap';
import { PapService } from '../../../../services/pap.service';
import { Area } from '../../../../models/area';
import { AreaService } from '../../../../services/area.service';

@Component({
  selector: 'app-add-visits',
  templateUrl: './add-visits.component.html',
  styleUrls: ['./add-visits.component.css']  
})
export class AddVisitsComponent implements OnInit {
  private _podService = inject(PodService);
  private _isrService = inject(IsrService);
  private _papService = inject(PapService);
  private _areaService = inject(AreaService);
  private _formBuilder = inject(FormBuilder);

  pods: Pod[] = [];         
  cannedPods: Pod[] = [];      
  mppPods: Pod[] = [];    
  
  isrs: Isr[] = [];
  isrRequirements: Isr[] = [];      
  isrNeeds: Isr[] = [];   
  
  areas: Area[] = [];
 

  paps: Pap[] = [];

  accountType: string[] = ['General Trade', 'Modern Trade', 'Local Key Account'];

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

  isLinear = false;

  ngOnInit(): void {
    this.getPodData();
    this.getIsrsData(); 
    this.getPapsData();
    this.getAreasData();
  }

  getPodData(): void {
    this._podService.getPods().subscribe((data: Pod[]) => {
      this.pods = data;
      this.filterPods();
    });
  }

  filterPods(): void {
    this.cannedPods = this.pods.filter(pod => pod.pod_type === 'CANNED');
    this.mppPods = this.pods.filter(pod => pod.pod_type === 'MPP');
  }


  getIsrsData(): void {
    this._isrService.getIsrs().subscribe((data: Isr[]) => {
      this.isrs = data;
      this.filterIsrs();
    });
  }

  filterIsrs(): void {
    this.isrRequirements = this.isrs.filter(isr => isr.isr_type === 'REQUIREMENTS');
    this.isrNeeds = this.isrs.filter(isr => isr.isr_type === 'NEEDS');
  }

  getPapsData(): void {
    this._papService.getPaps().subscribe((data: Pap[]) => {
      this.paps = data;      
    });
  }

  getAreasData(): void {
    this._areaService.getAreas().subscribe((data: Area[]) => {
      this.areas = data;      
    });
  }
}
