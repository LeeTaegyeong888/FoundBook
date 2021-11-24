export interface bookDataContent {
  authors: string[];
  contents: string;
  datetime: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
  isbn: string;
}
export interface metaServerData {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}
export interface bookServerData {
  documents: bookDataContent[];
  meta: metaServerData;
}
