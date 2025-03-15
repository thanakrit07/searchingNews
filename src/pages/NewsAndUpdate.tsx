import {
  Flex,
  Loader,
  Pagination,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePagination } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

import { LanguagePicker, NewsCard } from '../features';
import { getNews, getNewsTopHeadlines } from '../api';
import { useSearchParams } from '../hooks';
import { DateTimeRangePicker } from '../ui';
import { languageMapping, TI18nLanguage } from '../../i18n/services';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'world', label: 'World' },
  { value: 'nation', label: 'Nation' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'science', label: 'Science' },
  { value: 'health', label: 'Health' },
];

const chunk = <T,>(array: T[], size: number): T[][] => {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
};

export const NewsAndUpdate = () => {
  const [inputValue, setInputValue] = useState('');

  const { searchParams, debouncedSetSearchParam } = useSearchParams({
    from: '/',
  });

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  console.log(currentLanguage);
  const newsSearchParams = useMemo(() => {
    return {
      lang: languageMapping[currentLanguage as TI18nLanguage],
      search: searchParams.search || 'example', // api requires search query
      sortby: 'publishedAt' as const,
      from: searchParams.from,
      to: searchParams.to,
    };
  }, [
    currentLanguage,
    searchParams.from,
    searchParams.search,
    searchParams.to,
  ]);

  const { data: newsResp, isLoading: isNewsLoading } = useQuery({
    queryKey: ['news', newsSearchParams],
    queryFn: () => getNews(newsSearchParams),
    enabled: !searchParams.category,
  });

  const topHeadlinesSearchParams = useMemo(() => {
    return {
      ...newsSearchParams,
      category: searchParams.category,
    };
  }, [newsSearchParams, searchParams.category]);

  const { data: topHeadlinesResp, isLoading: isTopHeadlinesLoading } = useQuery(
    {
      queryKey: ['topHeadlines', topHeadlinesSearchParams],
      queryFn: () => getNewsTopHeadlines(topHeadlinesSearchParams),
      enabled: !!searchParams.category,
    }
  );

  const isLoading = isNewsLoading || isTopHeadlinesLoading;

  const news = !searchParams.category
    ? newsResp?.articles
    : topHeadlinesResp?.articles;

  const chunkedNews = chunk(news ?? [], 2);

  const pagination = usePagination({
    total: chunkedNews.length,
    page: searchParams.page,
    onChange: (page) => {
      debouncedSetSearchParam({ page: page.toString() });
    },
  });

  const items = useMemo(
    () =>
      chunkedNews[pagination.active - 1]?.map((item) => (
        <NewsCard
          key={item.title}
          title={item.title}
          description={item.description}
          image={item.image}
          publishedAt={item.publishedAt}
          source={item.source.name}
        />
      )),
    [chunkedNews, pagination.active]
  );

  return (
    <div>
      <Flex justify="space-between" py="lg" align="center">
        <Text component="h1" fz={32} fw={700}>
          News
        </Text>
        <LanguagePicker onChange={() => pagination.setPage(1)} />
      </Flex>
      <Flex
        justify="space-between"
        gap="lg"
        direction={{ base: 'column', xs: 'row' }}
        mb="xl"
      >
        <TextInput
          leftSection={<IconSearch />}
          placeholder="Search"
          value={inputValue}
          onChange={(e) => {
            debouncedSetSearchParam({ search: e.target.value });
            setInputValue(e.target.value);
          }}
          rightSection={isNewsLoading && <Loader size={20} />}
          w="100%"
        />
        <Select
          data={categories}
          placeholder="Category"
          value={searchParams.category}
          onChange={(value) => {
            if (value !== searchParams.category) {
              debouncedSetSearchParam({ category: value ?? undefined });
              pagination.setPage(1);
            }
          }}
          rightSection={isNewsLoading ? <Loader size={20} /> : undefined}
          clearable
          w="100%"
        />
        <DateTimeRangePicker
          value={[
            searchParams.from ? new Date(searchParams.from) : null,
            searchParams.to ? new Date(searchParams.to) : null,
          ]}
          onChange={(value) => {
            console.log(value);
            const date = value as [Date | null, Date | null | undefined];
            debouncedSetSearchParam({
              from: date[0]?.toISOString(),
              to: date[1]?.toISOString(),
            });
          }}
          w="100%"
        />
      </Flex>

      <Flex direction={{ base: 'column', xs: 'row' }} gap="lg">
        {isLoading ? <Loader /> : items}
      </Flex>
      <Flex justify="center">
        <Pagination
          total={chunkedNews.length}
          value={pagination.active}
          onChange={pagination.setPage}
          my={60}
          withEdges
        />
      </Flex>
    </div>
  );
};
