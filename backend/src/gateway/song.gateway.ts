import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SongGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private currentSong: string | null = null;

  handleConnection(client: Socket) {
    console.log('New client connected:', client.id);
    client.emit('songSelected', this.currentSong);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('songSelected')
  handleSongSelected(@MessageBody() songId: string, client: Socket) {
    console.log('🎵 songSelected received from client:', songId);
    this.currentSong = songId;

    this.server.emit('songSelected', songId);
  }
}
