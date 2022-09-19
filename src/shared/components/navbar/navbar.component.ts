import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { CartService } from 'src/shared/services/cart.service';
import { SearchService } from 'src/shared/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchTxt = '';
  oldSearch = '';

  constructor(
    public authService: AuthService,
    private searchService: SearchService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const user = this.authService.getCurrentUser();
    if(user) {
      this.authService.loggedInUser$.next(user);
    }
  }

  search() {
    // OldSearch HERE PREVENT SEARCHING THE SAME TXT MULTIPLE TIMES BY CLICKING ENTER
    if(this.searchTxt && this.oldSearch !== this.searchTxt) {
      this.oldSearch = this.searchTxt;
      this.searchService.searchTxt$.next(this.searchTxt)
    }
  }

  logout() {
    this.authService.logout();
  }

}
