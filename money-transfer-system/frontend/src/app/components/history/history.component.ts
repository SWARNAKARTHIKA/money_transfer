import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,

  // ✅ MUST be here
  imports: [CommonModule, RouterModule, CurrencyPipe, DatePipe],

  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  transactions: any[] = [];
  currentUsername: string = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getHistory().subscribe((data: any[]) => {
      console.log("HISTORY DATA:", data);

     
      this.transactions = data.sort(
        (a, b) =>
          new Date(b.createdOn).getTime() -
          new Date(a.createdOn).getTime()
      );
    });

    // Get current user info
    this.api.getCurrentUser().subscribe((user: any) => {
      this.currentUsername = user.username;
    });
  }

  isMoneyReceived(tx: any): boolean {
    return tx.toUsername === this.currentUsername;
  }

  getTransactionClass(tx: any): string {
    return this.isMoneyReceived(tx) ? 'tx-received' : 'tx-sent';
  }
}
