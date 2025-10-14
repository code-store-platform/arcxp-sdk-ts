export type ListAuthorsParams = Partial<{
  limit: number;
  last: string;
}>;

export type ListAuthorsResponse = {
  authors: AuthorANS[];
  more?: boolean;
  last?: string;
};

export type AuthorANS = {
  type: 'author';
  _id: string;
  firstName: string;
  lastName: string;
  byline: string;
  slug: string;
  email: string;
  image?: string;
  affiliations?: string;
  author_type?: string;
  education?: { name: string }[];
  awards?: { name: string }[];
  bio_page?: string;
  bio?: string;
  longBio?: string;
  native_app_rendering?: boolean;
  fuzzy_match?: boolean;
  contributor?: boolean;
  location?: string;
  role?: string;
  expertise?: string;
  personal_website?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  status?: boolean;
};
