export interface Word {
  lyrics: string;
  chords?: string;
}

export interface Song {
  _id: string;
  name: string;
  singer: string;
  imageUrl?: string;
  words?: Word[][];
}
