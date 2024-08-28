import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../services/token.service';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.css'],
})
export class SidebarComponentComponent implements OnInit, OnDestroy {
  title = 'msvcREST';
  selectedContent = 'content1';
  isSidebarOpen = true;
  userCount: number = 0;
  username: string | null = null;
  user: any = null;

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
  isLinear = false;

  private clickListener!: () => void;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private sharedService: SharedService // Inject SharedService
  ) {}

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    // Bind the click event listener using Renderer2
    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        this.onDocumentClick(event);
      }
    );

    // Decode token and set user information
    this.tokenService.decodeTokenAndSetUser();
    this.user = this.tokenService.getUser();
    this.username = this.user ? this.user.sub : null; // Update username based on 'sub'

    // Log the decoded token for debugging
    if (this.user) {
      console.log('Decoded Token:', this.user);
      console.log('Username:', this.username);
      console.log('Role ID:', this.user.role_id);
      console.log('First Name:', this.user.fname);
      console.log('Middle Name:', this.user.mname);
      console.log('Last Name:', this.user.lname);
      console.log('Contact Number:', this.user.contact_num);
      console.log('ABFI ID:', this.user.abfi_id);
    } else {
      console.log('No user data available. Token may be missing or invalid.');
    }

    // Subscribe to content changes from SharedService
    this.sharedService.selectedContent$.subscribe((content) => {
      this.selectedContent = content;
    });
  }

  ngOnDestroy(): void {
    // Remove the click event listener
    if (this.clickListener) {
      this.clickListener(); // Removes the event listener
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  showContent(content: string): void {
    // Use SharedService to change content
    this.sharedService.setSelectedContent(content);
  }

  private onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the click was outside the sidebar
    if (this.isSidebarOpen && !this.elRef.nativeElement.contains(target)) {
      this.isSidebarOpen = false;
    }
  }
}
