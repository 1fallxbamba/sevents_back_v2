export interface Sevent {
  code: string;
  title: string;
  description: string;
  location: string;
  price: number;
  places: number;
  starting: Date;
  ending: Date;
  picture: string;
  archived: boolean;
  createdAt?: Date;
}
