import { config } from '../configs';
import { client } from './client';
import { GetNewsReq, GetNewsResp, GetNewsTopHeadlinesReq } from '../types/news';

export const getNews = async (req: GetNewsReq) => {
  const { search, ...rest } = req;
  const response = await client.get<GetNewsResp>(`/search`, {
    params: {
      ...rest,
      q: search,
      apikey: config.apiKey,
    },
  });
  return response.data;
};

export const getNewsTopHeadlines = async (req: GetNewsTopHeadlinesReq) => {
  const { search, ...rest } = req;
  const response = await client.get<GetNewsResp>(`/top-headlines`, {
    params: {
      ...rest,
      q: search,
      apikey: config.apiKey,
    },
  });
  return response.data;
};
