import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Area } from '../../../../models/area';
import { MarketVisits } from '../../../../models/market-visits';
import { AreaService } from '../../../../services/area.service';
import { MarketVisitsService } from '../../../../services/market-visits.service';
import { TokenService } from '../../../../services/token.service';
import { AccountTypeService } from '../../../../services/account-type.service';
import { AccountType } from '../../../../models/accountType';
import { Isr } from '../../../../models/isr';
import { IsrService } from '../../../../services/isr.service';
import { Pod } from '../../../../models/pod';
import { PodService } from '../../../../services/pod.service';
import { Pap } from '../../../../models/pap';
import { PapService } from '../../../../services/pap.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from '../../../../services/shared.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  @Input() data?: MarketVisits;
  @Output() MarketVisitsUpdated = new EventEmitter<MarketVisits[]>();

  user_id: string | null = null;
  imageFileReq: File | null = null;
  imagePreviewReq: string | ArrayBuffer | null = null;
  imageFileNeed: File | null = null;
  imagePreviewNeed: string | ArrayBuffer | null = null;

  username: string | null = null;
  user: any = null;
  areas: Area[] = [];
  paps: Pap[] = [];
  accountTypes: AccountType[] = [];
  isrs: Isr[] = [];
  isrRequirements: Isr[] = [];
  isrNeeds: Isr[] = [];
  pods: Pod[] = [];
  cannedPods: Pod[] = [];
  mppPods: Pod[] = [];
  // Define the FormGroup
  formGroup: FormGroup;

  constructor(
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private marketVisitsService: MarketVisitsService,
    private _areaService: AreaService,
    private _accountTypeService: AccountTypeService,
    private _isrService: IsrService,
    private _podService: PodService,
    private _papService: PapService,
    private _formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    // Initialize form group and form array for areas
    this.formGroup = this._formBuilder.group({
      area_id: this._formBuilder.array([]), // Should be initialized
      accountType_id: this._formBuilder.array([]), // Should be initialized
      isr_id: this._formBuilder.array([]), // Should be initialized
      pod_id: this._formBuilder.array([]), // Should be initialized
      pap_id: this._formBuilder.array([]), // Should be initialized
      user_id: new FormControl(''),
      pap_others: new FormControl(''),
      pod_mpp_other: new FormControl(''),
      visit_competitorsCheck: new FormControl(''),
      pod_canned_other: new FormControl(''),
      visit_averageOffTakePd: new FormControl(''),
      visit_payolaMerchandiser: new FormControl(''),
      visit_payolaSupervisor: new FormControl(''),
      isr_needsOthers: new FormControl(''),
      isr_reqOthers: new FormControl(''),
      visit_salesPersonnel: new FormControl(''),
      visit_accountType_others: new FormControl(''),
      visit_distributor: new FormControl(''),
      visit_accountName: new FormControl(''),
      visit_date: new FormControl(null),
    });
  }

  ngOnInit(): void {
    // Decode token and set user information
    this.tokenService.decodeTokenAndSetUser(); // Decode the token and set user information
    const user = this.tokenService.getUser();
    this.user_id = user?.id ?? null;
    this.formGroup.patchValue({ user_id: this.user_id });
    this.cdr.detectChanges();

    // Fetch areas data
    this.getAreasData();
    this.getAccountTypeData();
    this.getIsrsData();
    this.getPodsData();
    this.getPapsData();
  }

  //For Areas
  get areaFormArray(): FormArray {
    return this.formGroup.get('area_id') as FormArray;
  }

  getAreasData(): void {
    this._areaService.getAreas().subscribe((data: Area[]) => {
      this.areas = data;
      this.addAreaCheckboxes();
    });
  }

  // Add a checkbox control for each area
  addAreaCheckboxes(): void {
    this.areas.forEach(() => {
      this.areaFormArray.push(new FormControl(false)); // Initialize each checkbox as unchecked
    });
  }

  //For accountTypes
  get accountTypeFormArray(): FormArray {
    return this.formGroup.get('accountType_id') as FormArray;
  }

  getAccountTypeData(): void {
    this._accountTypeService
      .getAccountTypes()
      .subscribe((data: AccountType[]) => {
        this.accountTypes = data;
        this.addAccountTypeCheckboxes();
      });
  }

  // Add a checkbox control for each area
  addAccountTypeCheckboxes(): void {
    this.accountTypes.forEach(() => {
      this.accountTypeFormArray.push(new FormControl(false)); // Initialize each checkbox as unchecked
    });
  }

  //For accountTypes
  get isrsTypeFormArray(): FormArray {
    return this.formGroup.get('isr_id') as FormArray;
  }

  getIsrsData(): void {
    this._isrService.getIsrs().subscribe((data: Isr[]) => {
      this.isrs = data;
      this.filterIsrs();
      this.addIsrsCheckboxes();
    });
  }

  // Add a checkbox control for each area
  addIsrsCheckboxes(): void {
    this.clearFormArray(this.formGroup.get('isr_id') as FormArray);
    [...this.isrRequirements, ...this.isrNeeds].forEach((isr) => {
      (this.formGroup.get('isr_id') as FormArray).push(new FormControl(false));
    });
  }

  //For Pods
  get podsFormArray(): FormArray {
    return this.formGroup.get('pod_id') as FormArray;
  }

  getPodsData(): void {
    this._podService.getPods().subscribe((data: Pod[]) => {
      this.pods = data;
      this.filterPods();
      this.addPodsCheckboxes();
    });
  }

  // Add a checkbox control for each area
  clearFormArray(formArray: FormArray): void {
    while (formArray.length) {
      formArray.removeAt(0);
    }
  }

  //For Areas
  get papsFormArray(): FormArray {
    return this.formGroup.get('pap_id') as FormArray;
  }

  getPapsData(): void {
    this._papService.getPaps().subscribe((data: Pap[]) => {
      this.paps = data;
      this.addPapCheckBoxes();
    });
  }

  // Add a checkbox control for each area
  addPapCheckBoxes(): void {
    this.paps.forEach(() => {
      this.papsFormArray.push(new FormControl(false)); // Initialize each checkbox as unchecked
    });
  }

  addPodsCheckboxes(): void {
    this.clearFormArray(this.formGroup.get('pod_id') as FormArray);
    [...this.cannedPods, ...this.mppPods].forEach((pod) => {
      (this.formGroup.get('pod_id') as FormArray).push(new FormControl(false));
    });
  }

  filterPods(): void {
    this.cannedPods = this.pods.filter((pod) => pod.pod_type === 'CANNED');
    this.mppPods = this.pods.filter((pod) => pod.pod_type === 'MPP');
  }

  filterIsrs(): void {
    this.isrRequirements = this.isrs.filter(
      (isr) => isr.isr_type === 'REQUIREMENTS'
    );
    this.isrNeeds = this.isrs.filter((isr) => isr.isr_type === 'NEEDS');
  }

  onSubmit(): void {
    const formData = new FormData();

    // Get selected IDs from the form group for areas, account types, etc.
    const selectedAreaIds = this.formGroup
      .get('area_id')
      ?.value.map((checked: boolean, index: number) =>
        checked && this.areas ? this.areas[index]?.id?.toString() : null
      )
      .filter((value: string | null) => value !== null) as string[];

    const selectedAccountTypeIds = this.formGroup
      .get('accountType_id')
      ?.value.map((checked: boolean, index: number) =>
        checked && this.accountTypes
          ? this.accountTypes[index]?.id?.toString()
          : null
      )
      .filter((value: string | null) => value !== null) as string[];

    const selectedIsrsIds = this.formGroup
      .get('isr_id')
      ?.value.map((checked: boolean, index: number) =>
        checked && this.isrs ? this.isrs[index]?.id?.toString() : null
      )
      .filter((value: string | null) => value !== null) as string[];

    const selectedPodIds = this.formGroup
      .get('pod_id')
      ?.value.map((checked: boolean, index: number) =>
        checked && this.pods ? this.pods[index]?.id?.toString() : null
      )
      .filter((value: string | null) => value !== null) as string[];

    const selectedPapIds = this.formGroup
      .get('pap_id')
      ?.value.map((checked: boolean, index: number) =>
        checked && this.paps ? this.paps[index]?.id?.toString() : null
      )
      .filter((value: string | null) => value !== null) as string[];

    // Get form field values (input boxes)
    const user_id = this.formGroup.get('user_id')?.value;
    const visitDate = this.formGroup.get('visit_date')?.value;
    const accountName = this.formGroup.get('visit_accountName')?.value;
    const distributor = this.formGroup.get('visit_distributor')?.value;
    const salesPersonnel = this.formGroup.get('visit_salesPersonnel')?.value;
    const accountTypeOthers = this.formGroup.get(
      'visit_accountType_others'
    )?.value;
    const competitorsCheck = this.formGroup.get(
      'visit_competitorsCheck'
    )?.value;
    const averageOffTakePd = this.formGroup.get(
      'visit_averageOffTakePd'
    )?.value;
    const payolaMerchandiser = this.formGroup.get(
      'visit_payolaMerchandiser'
    )?.value;
    const payolaSupervisor = this.formGroup.get(
      'visit_payolaSupervisor'
    )?.value;
    const isrNeedsOthers = this.formGroup.get('isr_needsOthers')?.value;
    const isrReqOthers = this.formGroup.get('isr_reqOthers')?.value;
    const pap_others = this.formGroup.get('pap_others')?.value;
    const pod_canned_other = this.formGroup.get('pod_canned_other')?.value;
    const pod_mpp_other = this.formGroup.get('pod_mpp_other')?.value;

    console.log('Selected Area IDs:', selectedAreaIds);
    console.log('Selected Account Type IDs:', selectedAccountTypeIds);
    console.log('Selected ISR IDs:', selectedIsrsIds);
    console.log('Selected POD IDs:', selectedPodIds);
    console.log('Selected PAP IDs:', selectedPapIds);

    // Convert arrays to strings that look like JSON arrays
    const formatArrayAsString = (arr: string[]): string =>
      `[${arr.map((id) => `"${id}"`).join(', ')}]`;

    // Append form data (checkbox selections and input field values)
    formData.append('area_id', formatArrayAsString(selectedAreaIds));
    formData.append('accountType_id',formatArrayAsString(selectedAccountTypeIds));
    formData.append('isr_id',formatArrayAsString(selectedIsrsIds));
    formData.append('pod_id', formatArrayAsString(selectedPodIds));
    formData.append('pap_id', formatArrayAsString(selectedPapIds));

    formData.append('user_id', user_id);
    formData.append('visit_date', visitDate);
    formData.append('visit_accountName', accountName);
    formData.append('visit_distributor', distributor);
    formData.append('visit_salesPersonnel', salesPersonnel);
    formData.append('visit_accountType_others', accountTypeOthers);
    formData.append('visit_competitorsCheck', competitorsCheck);
    formData.append('visit_averageOffTakePd', averageOffTakePd);
    formData.append('visit_payolaMerchandiser', payolaMerchandiser);
    formData.append('visit_payolaSupervisor', payolaSupervisor);
    formData.append('isr_needsOthers', isrNeedsOthers);
    formData.append('isr_reqOthers', isrReqOthers);
    formData.append('pap_others', pap_others);
    formData.append('pod_canned_other', pod_canned_other);
    formData.append('pod_mpp_other', pod_mpp_other);

    // Append images if selected
    if (this.imageFileReq) {
      formData.append('isr_req_ImgPath', this.imageFileReq);
    }
    if (this.imageFileNeed) {
      formData.append('isr_needs_ImgPath', this.imageFileNeed);
    }

    // Submit the form data to the server
this.marketVisitsService.createMarketVisits(formData).subscribe(
  (response) => {
    console.log('Market visit submitted successfully', response);

    // Show success notification (for example, using MatSnackBar)
    this.snackBar.open('Market visit submitted successfully!', 'Close', {
      duration: 3000, // 3 seconds
    });

    // Optionally, reset the form or navigate to another page
    this.formGroup.reset(); // Clear the form
    this.sharedService.setSelectedContent('content1');
  },
  (error) => {
    console.error('Error creating market visit:', error);

    // Show error notification
    this.snackBar.open('Failed to submit market visit. Please try again.', 'Close', {
      duration: 3000, // 3 seconds
    });
  }
);
  }

  onImageSelect(event: Event, type: 'req' | 'need'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'req') {
          this.imageFileReq = file;
          this.imagePreviewReq = reader.result;
          this.formGroup.patchValue({ isr_req_ImgPath: file.name });
        } else {
          this.imageFileNeed = file;
          this.imagePreviewNeed = reader.result;
          this.formGroup.patchValue({ isr_needs_ImgPath: file.name });
        }
        this.cdr.markForCheck(); // Ensure change detection is triggered
      };
      reader.readAsDataURL(file);
    }
  }
}
