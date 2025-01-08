import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // List of relative paths to song files
  songs: string[] = [
    'assets/songs/song1.mp3',
    'assets/songs/song2.mp3',
    'assets/songs/song3.mp3',
    'assets/songs/song4.mp3',
    'assets/songs/song5.mp3',
  ];

  audio: HTMLAudioElement = new Audio();

  onNumberChange(event: any) {
    const chosenNumber = parseInt(event.target.value, 10);

    if (chosenNumber >= 1 && chosenNumber <= 5) {
      this.playSong(chosenNumber);
    } else {
      alert('Please enter a number between 1 and 5');
    }
  }

  playSong(number: number) {
    // Stop any currently playing audio
    this.audio.pause();
    this.audio.currentTime = 0;

    // Get the song based on the number entered
    const selectedSong = this.songs[number - 1];

    // Set the audio source and play
    this.audio.src = selectedSong;
    this.audio.load();
    this.audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      alert('Failed to play audio. Please try again.');
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // Stop the song when Backspace is pressed
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
}
