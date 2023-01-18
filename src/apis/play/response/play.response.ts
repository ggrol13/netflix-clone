export class PlayResponse {
  season: {
    id: string;
    seasonNum: string;
  };
  episode: {
    id: string;
    name: string;
    thumbnail: string;
    detail: string;
    videoFilePath: string;
  };
  timeStamp: number;
}
