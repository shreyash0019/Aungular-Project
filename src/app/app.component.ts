import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //  songs with names and file paths
  songs: { path: string; name: string }[] = [
    { path: 'assets/songs/song1.mp3', name: 'Nawazuddin - Seedhe Maut' },
    { path: 'assets/songs/song2.mp3', name: 'Khatta Flow - Seedhe Maut' },
    { path: 'assets/songs/song3.mp3', name: 'Namastute - Seedhe Maut' },
    { path: 'assets/songs/song4.mp3', name: '101 - Seedhe Maut' },
    { path: 'assets/songs/song5.mp3', name: 'Round 3 - Seedhe Maut' },
  ];

  audio: HTMLAudioElement = new Audio();
  currentSongName: string = ''; //   name of the currently playing song stored here

  onNumberChange(event: any) {
    const chosenNumber = parseInt(event.target.value, 10);

    if (chosenNumber >= 1 && chosenNumber <= 5) {
      this.playSong(chosenNumber);
    } else {
      alert('Please enter a number between 1 and 5');
    }
  }

  playSong(number: number) {
    // Stop any playing audio
    this.audio.pause();
    this.audio.currentTime = 0;

    // selected song details
    const selectedSong = this.songs[number - 1];

    // Update the current song name
    this.currentSongName = selectedSong.name;

    // Set audio source and play
    this.audio.src = selectedSong.path;
    this.audio.load();
    this.audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      alert('Failed to play audio. Please try again.');
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      // Stop the song on Backspace
      this.audio.pause();
      this.audio.currentTime = 0;

      // Clear the song name
      this.currentSongName = '';
    }
  }
}
