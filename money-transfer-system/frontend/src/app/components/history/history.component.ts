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
  }
}
