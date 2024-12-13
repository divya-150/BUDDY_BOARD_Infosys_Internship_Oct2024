import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileService } from '../services/user-profile.service';
import { of } from 'rxjs';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockUserProfileService: any;

  beforeEach(async () => {
    mockUserProfileService = {
      getUserData: jasmine.createSpy('getUserData').and.returnValue(
        of({
          email: 'test@email.com',
          joined: '1st Jan, 2023',
          decks: ['Deck A', 'Deck B', 'Deck C', 'Deck D', 'Deck E'],
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [{ provide: UserProfileService, useValue: mockUserProfileService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and display limited decks', () => {
    expect(component.user?.email).toBe('test@email.com');
    expect(component.limitedDecks.length).toBe(4); // Default maxVisibleDecks
  });

  it('should show all decks when "See All" is clicked', () => {
    component.showAllDecks();
    expect(component.showModal).toBeTrue();
  });

  it('should close modal when "Close" is clicked', () => {
    component.closeModal();
    expect(component.showModal).toBeFalse();
  });
});
