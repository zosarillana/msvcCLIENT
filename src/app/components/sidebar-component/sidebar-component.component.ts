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
  userCount = 0;
  username: string | null = null;
  user: any = null;
  selectedId: string | null = null;

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

    // Subscribe to content changes from SharedService
    this.sharedService.selectedContent$.subscribe((content) => {
      this.selectedContent = content;
    });

    // Optionally, handle ID changes
    this.sharedService.selectedId$.subscribe((id) => {
      this.selectedId = id;
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

  showContent(content: string, id?: string): void {
    // Use SharedService to change content
    this.sharedService.setSelectedContent(content);
    if (id) {
      this.sharedService.setSelectedId(id);
    }
  }
  
  logout(): void {
    this.authService.logout();
  }

  private onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the click was outside the sidebar
    if (this.isSidebarOpen && !this.elRef.nativeElement.contains(target)) {
      this.isSidebarOpen = false;
    }
  }
}
