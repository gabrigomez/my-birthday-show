export interface Token {
  access_token: string,
};
export interface Artist {
  id?: string,
  name?: string,
};
export interface Tracks {
  name: string,
  artists: Array<Artist>,
};
