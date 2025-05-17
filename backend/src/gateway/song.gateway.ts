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
    client.emit('songSelected', this.currentSong);
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('songSelected')
  handleSongSelected(@MessageBody() songId: string, client: Socket) {
    this.currentSong = songId;

    this.server.emit('songSelected', songId);
  }
}
