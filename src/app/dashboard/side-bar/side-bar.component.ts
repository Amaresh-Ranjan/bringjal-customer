import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserSotrageService } from '../../shared/services/storageRelated/user-sotrage.service';
interface NavItem {
  path: string;
  icon: string;
  title: string;
  alt: string;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() isExpanded = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  userName = '';
  userLoggedIn = false;
  readonly navItems: NavItem[] = [
    {
      path: '/india/dashboard/place-order',
      icon: './assets/icons/Sidebar/Place-and-track-order.svg',
      title: 'Place and track order',
      alt: 'Place and track order Icon',
    },
    {
      path: '/india/dashboard/previous-orders',
      icon: './assets/icons/Sidebar/Previous-Orders.svg',
      title: 'Previous orders',
      alt: 'Previous orders Icon',
    },
    {
      path: '/india/dashboard/deposits',
      icon: './assets/icons/Sidebar/Deposits.svg',
      title: 'Deposits',
      alt: 'Deposits Icon',
    },
    {
      path: '/india/dashboard/modify-package',
      icon: './assets/icons/Sidebar/Modify-Package.svg',
      title: 'Modify Package',
      alt: 'Modify Package Icon',
    },
    {
      path: '/india/dashboard/wallet',
      icon: './assets/icons/Sidebar/Wallet.svg',
      title: 'Wallet',
      alt: 'Wallet Icon',
    },
    {
      path: '/india/dashboard/refer',
      icon: './assets/icons/Sidebar/Refer.svg',
      title: 'Refer',
      alt: 'Refer Icon',
    },
    {
      path: '/india/dashboard/customer-support',
      icon: './assets/icons/Sidebar/Customer-Support.svg',
      title: 'Customer Support',
      alt: 'Customer Support Icon',
    },
    {
      path: '/india/dashboard/edit-profile',
      icon: './assets/icons/Sidebar/Edit-Profile.svg',
      title: 'Edit profile',
      alt: 'Edit Profile Icon',
    },
    {
      path: '/india/dashboard/unsubscribe-package',
      icon: './assets/icons/Sidebar/Modify-Package.svg',
      title: 'Unsubscribe Package',
      alt: 'Unsubscribe Package Icon',
    },
  ];

  constructor(
    private userStorage: UserSotrageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initializeUserData();
  }

  handleSidebarToggle(): void {
    this.toggleSidebar.emit(!this.isExpanded);
  }

  onLogout(): void {
    this.userStorage.logout().subscribe((status) => {
      if (status) {
        this.router.navigate(['']);
      }
    });
  }

  private initializeUserData(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.userStorage.getLoggedIn.subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.loadUserData();
      }
    });
  }

  private loadUserData(): void {
    this.userStorage.getUser.subscribe((user) => {
      if (user) {
        this.userName = user.name;
        console.log('userdata in sidebar:', user);
      }
    });
  }
}
