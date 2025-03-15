export type NewsArticle = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export type GetNewsTopHeadlinesReq = {
  category?: string;
  search?: string;
  lang?: string; // 2 letter language code
  country?: string; // 2 letter country code
  max?: number; // max number of articles to return 1-100
  nullable?: string; // description, content and image
  from?: string; // 2025-03-13T16:15:35Z
  to?: string; // 2025-03-13T16:15:35Z
  //   page: number; // paid subscription only
  //   expand: string; // paid subscription only
};

export type GetNewsResp = {
  articles: NewsArticle[];
  totalArticles: number;
};

export type GetNewsReq = Omit<GetNewsTopHeadlinesReq, 'category'> & {
  in?: string; // choose which keyword are searched, can be combination of 'title' | 'description' | 'content'
  sortby?: 'publishedAt' | 'relevance';
};

export type NewsSearchParams = {
  search?: string;
  limit?: number;
  page?: number;
  category?: string;
  from?: string;
  to?: string;
};
