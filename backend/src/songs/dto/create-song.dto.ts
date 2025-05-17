export class CreateSongDto {
  name: string;
  singer: string;
  imageUrl: string;
  words: {
    lyrics: string;
    chords?: string;
  }[][];
}
