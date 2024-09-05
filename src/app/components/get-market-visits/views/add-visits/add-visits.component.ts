import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PodService } from '../../../../services/pod.service';
import { Pod } from '../../../../models/pod';
import { IsrService } from '../../../../services/isr.service';
import { Isr } from '../../../../models/isr';
import { Pap } from '../../../../models/pap';
import { PapService } from '../../../../services/pap.service';
import { Area } from '../../../../models/area';
import { AreaService } from '../../../../services/area.service';
import { MarketVisits } from '../../../../models/market-visits';
import { MarketVisitsService } from '../../../../services/market-visits.service';
import { TokenService } from '../../../../services/token.service';

@Component({
  selector: 'app-add-visits',
  templateUrl: './add-visits.component.html',
  styleUrls: ['./add-visits.component.css'],
})
export class AddVisitsComponent implements OnInit {
  userCount: number = 0;
  username: string | null = null;
  user: any = null;
  imageFileReq: File | null = null;
  imagePreviewReq: string | ArrayBuffer | null = null;
  imageFileNeed: File | null = null;
  imagePreviewNeed: string | ArrayBuffer | null = null;

  @Input() data?: MarketVisits;
  @Output() MarketVisitsUpdated = new EventEmitter<MarketVisits[]>();

  errorMessages: { [key: string]: string[] } = {};

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  isLinear = false;

  pods: Pod[] = [];
  cannedPods: Pod[] = [];
  mppPods: Pod[] = [];

  isrs: Isr[] = [];
  isrRequirements: Isr[] = [];
  isrNeeds: Isr[] = [];

  areas: Area[] = [];

  paps: Pap[] = [];

  accountType: string[] = [
    'General Trade',
    'Modern Trade',
    'Local Key Account',
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private marketVisitsService: MarketVisitsService,
    private _podService: PodService,
    private _isrService: IsrService,
    private _papService: PapService,
    private _areaService: AreaService,
    private _formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
   // Initialize FormGroups without validators
   this.firstFormGroup = this._formBuilder.group({
    user_id: [''],
    visit_date: [''],
    area_id: [''],
  });

  this.secondFormGroup = this._formBuilder.group({
    visit_accountName: [''],
    visit_distributor: [''],
    visit_salesPersonnel: [''],
    visit_accountType: [''],
    pod_others: [''],
  });

  this.thirdFormGroup = this._formBuilder.group({
    isr_id: [''],
    isr_reqOthers: [''],
    isr_req_ImgPath: [''],
    isr_needsOthers: [''],
    isr_needs_ImgPath: [''],
  });

  this.fourthFormGroup = this._formBuilder.group({
    visit_payolaMerchandiser: [''],
    visit_payolaSupervisor: [''],
    visit_averageOffTakePd: [''],
  });

  this.fifthFormGroup = this._formBuilder.group({
    pod_id: [''],
    visit_competitorsCheck: [''],
    visit_pap: [''],
    pap_others: [''],
  });
  }

  ngOnInit(): void {
    // Decode token and set user information
    this.tokenService.decodeTokenAndSetUser();
    this.user = this.tokenService.getUser();
    this.username = this.user ? this.user.sub : null; // Update username based on 'sub'
    this.cdr.detectChanges();
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
    this.cannedPods = this.pods.filter((pod) => pod.pod_type === 'CANNED');
    this.mppPods = this.pods.filter((pod) => pod.pod_type === 'MPP');
  }

  getIsrsData(): void {
    this._isrService.getIsrs().subscribe((data: Isr[]) => {
      this.isrs = data;
      this.filterIsrs();
    });
  }

  filterIsrs(): void {
    this.isrRequirements = this.isrs.filter(
      (isr) => isr.isr_type === 'REQUIREMENTS'
    );
    this.isrNeeds = this.isrs.filter((isr) => isr.isr_type === 'NEEDS');
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

  onSubmit(): void {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourthFormGroup.valid &&
      this.fifthFormGroup.valid
    ) {
      const formData = new FormData();
      
      // Append form fields
      formData.append('user_id', this.firstFormGroup.get('user_id')?.value || '');
      formData.append('visit_date', this.firstFormGroup.get('visit_date')?.value || '');
      
      // Append area_id array
      const areaIds = this.firstFormGroup.get('area_id')?.value || [];
      areaIds.forEach((id: string) => {
        formData.append('area_id[]', id);
      });
  
      formData.append('visit_accountName', this.secondFormGroup.get('visit_accountName')?.value || '');
      formData.append('visit_distributor', this.secondFormGroup.get('visit_distributor')?.value || '');
      formData.append('visit_salesPersonnel', this.secondFormGroup.get('visit_salesPersonnel')?.value || '');
      
      // Append account_type array
      const accountTypes = this.secondFormGroup.get('visit_accountType')?.value || [];
      accountTypes.forEach((type: string) => {
        formData.append('visit_accountType[]', type);
      });
      
      formData.append('pod_others', this.secondFormGroup.get('pod_others')?.value || '');
  
      // Append isr_id array
      const isrIds = this.thirdFormGroup.get('isr_id')?.value || [];
      isrIds.forEach((id: string) => {
        formData.append('isr_id[]', id);
      });
  
      formData.append('isr_reqOthers', this.thirdFormGroup.get('isr_reqOthers')?.value || '');
  
      if (this.imageFileReq) {
        formData.append('isr_req_Img', this.imageFileReq, this.imageFileReq.name);
      }
      
      if (this.imageFileNeed) {
        formData.append('isr_needs_Img', this.imageFileNeed, this.imageFileNeed.name);
      }
      
      formData.append('visit_payolaMerchandiser', this.fourthFormGroup.get('visit_payolaMerchandiser')?.value || '');
      formData.append('visit_payolaSupervisor', this.fourthFormGroup.get('visit_payolaSupervisor')?.value || '');
      formData.append('visit_averageOffTakePd', this.fourthFormGroup.get('visit_averageOffTakePd')?.value || '');
      
      // Append pod_id array
      const podIds = this.fifthFormGroup.get('pod_id')?.value || [];
      podIds.forEach((id: string) => {
        formData.append('pod_id[]', id);
      });
  
      formData.append('visit_competitorsCheck', this.fifthFormGroup.get('visit_competitorsCheck')?.value || '');
      
      // Append pap_id array
      const papIds = this.fifthFormGroup.get('visit_pap')?.value || [];
      papIds.forEach((id: string) => {
        formData.append('visit_pap[]', id);
      });
  
      formData.append('pap_others', this.fifthFormGroup.get('pap_others')?.value || '');
  
      this.marketVisitsService.createMarketVisits(formData).subscribe(
        (response) => {
          console.log('Visit successfully created:', response);
          // Delay detection
          setTimeout(() => {
            this.cdr.detectChanges();
          }, 0);
        },
        (error) => {
          console.error('Error creating visit:', error);
        }
      );
    } else {
      console.error('Please fill out all required fields.');
    }
  }
  
  
  onImageSelect(event: Event, type: 'req' | 'need'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'req') {
          this.imageFileReq = file;
          this.imagePreviewReq = reader.result;
          this.thirdFormGroup.patchValue({ isr_req_ImgPath: file.name });
        } else if (type === 'need') {
          this.imageFileNeed = file;
          this.imagePreviewNeed = reader.result;
          this.thirdFormGroup.patchValue({ isr_needs_ImgPath: file.name });
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
