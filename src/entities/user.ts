import { type Article } from './article';

export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  birthDate: Date;
  role: 'admin' | 'user' | 'guest';
  // eslint-disable-next-line @typescript-eslint/array-type
  articles: Partial<Article>[];
};

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  birthDateString: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
