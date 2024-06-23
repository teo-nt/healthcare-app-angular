import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-not-activated',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './account-not-activated.component.html',
  styleUrl: './account-not-activated.component.css'
})
export class AccountNotActivatedComponent {

}
