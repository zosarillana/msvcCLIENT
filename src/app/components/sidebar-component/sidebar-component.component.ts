import { Component, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../services/token.service';
import { SharedService } from '../../services/shared.service';
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

    this.fetchUserCount();

    // Set up polling every 3 seconds
    setInterval(() => this.fetchUserCount(), 3000);

    // Decode token and set user information
    this.tokenService.decodeTokenAndSetUser();
    this.user = this.tokenService.getUser();
    this.username = this.user ? this.user.sub : null; // Update username based on 'sub'

    // Subscribe to content changes from SharedService
    this.sharedService.selectedContent$.subscribe(content => {
      this.selectedContent = content;
    });
  }

  private fetchUserCount(): void {
    this.userService.getUserCount().subscribe(
      (count: number) => {
        this.userCount = count;
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );
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
