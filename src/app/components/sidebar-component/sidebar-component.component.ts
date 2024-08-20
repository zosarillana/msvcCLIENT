import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';

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
    private authService: AuthService
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

    // Set up polling every 10 seconds (10000 milliseconds)
    setInterval(() => this.fetchUserCount(), 3000);

    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    // console.log('User from localStorage:', this.user);

    this.username = localStorage.getItem('username');
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
    this.selectedContent = content;
  }

  private onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if the click was outside the sidebar
    if (this.isSidebarOpen && !this.elRef.nativeElement.contains(target)) {
      this.isSidebarOpen = false;
    }
  }
}
