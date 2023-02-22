export interface Token {
  access_token: string,
};
export interface Artist {
  id?: string,
  name?: string,
};
interface Url {
  spotify: string;
};
export interface Tracks {
  name: string,
  artists: Array<Artist>,
  external_urls: Url;
};
