// import { Controller, Post } from '@nestjs/common';
// import { SongsService } from './songs.service';

// import { UseGuards, Get } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @Controller('songs')
// export class SongsController {
//   constructor(private readonly songsService: SongsService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get()
//   findAll() {
//     return this.songsService.findAll();
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post()
//   create() {
//     return this.songsService.create({
//       name: 'Song Name',
//       singer: 'Singer Name',
//       words: [
//         [
//           { text: 'Hello', time: 0 },
//           { text: 'World', time: 1 },
//         ],
//         [
//           { text: 'This', time: 2 },
//           { text: 'is', time: 3 },
//           { text: 'a', time: 4 },
//           { text: 'test', time: 5 },
//         ],
//       ],
//     });
//   }
// }

import { Controller, UseGuards, Post, Body, Get, Param } from '@nestjs/common';
import { SongsService } from './songs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSongDto } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }
}
