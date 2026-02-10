import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  balance: number = 0;

  constructor(private api: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.api.getBalance().subscribe((data: any) => {
      this.balance = data.balance;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
