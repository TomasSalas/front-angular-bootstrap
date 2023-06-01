export interface WordArray {
  words: number[];
  sigBytes: number;
  toString(encoder?: any): string;
  concat(wordArray: WordArray): WordArray;
  clamp(): void;
  clone(): WordArray;
}

export interface Decode {
  [x: string]: any;
  decode(encodedData: string): string;
  data: string;
  exp: number;
  role: string | any ;
}

