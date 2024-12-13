import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  isAdmin: boolean = false;
  navOptions: string[] = [];
  user: { email: string; joined: string; decks: string[] } | null = null;
  loading: boolean = true;

  maxVisibleDecks: number = 4; // Maximum decks to show initially
  limitedDecks: string[] = []; // Subset of decks to display
  showModal: boolean = false; // Modal state

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || 'Unknown User';
  
    this.userProfileService.getUserData(this.username).subscribe(
      (data) => {
        this.user = data;
        this.isAdmin = this.username === 'admin';
        this.navOptions = this.isAdmin ? ['Users', 'Decks', 'Logout'] : ['Feed', 'Cards', 'Decks', 'Logout'];
        this.limitedDecks = this.user?.decks?.slice(0, this.maxVisibleDecks) || [];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.loading = false;
      }
    );
  }
  

  showAllDecks() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
