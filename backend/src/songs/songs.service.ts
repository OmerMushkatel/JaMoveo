import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Song, SongDocument } from './schemas/song.schema';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<SongDocument>) {}

  async findAll(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async findOne(id: string) {
    return this.songModel.findById(id);
  }

  async create(song: Song): Promise<Song> {
    const newSong = new this.songModel(song);
    return newSong.save();
  }
}
