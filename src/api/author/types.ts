import { AuthorANS } from '../migration-center/types';

export type ListAuthorsParams = Partial<{
  limit: number;
  last: string;
}>;

export type ListAuthorsResponse = {
  authors: AuthorANS[];
  more?: boolean;
  last?: string;
};
