import { Flex, Grid, Pagination, Select, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';

import { LanguageSwitch, NewsCard } from '../features';
import { useMemo, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

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

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index })),
  2
);

export const NewsAndUpdate = () => {
  const isMoreThanMd = useMediaQuery('(min-width: 768px)');

  const [activePage, setPage] = useState(1);
  const items = useMemo(
    () =>
      data[activePage - 1].map((item) => (
        <Grid.Col span={isMoreThanMd ? 6 : 12}>
          <NewsCard
            key={item.id}
            title={`Title ${item.id}`}
            description={`Description ${item.id}`}
            image={`https://via.placeholder.com/150`}
            publishedAt={''}
            source={''}
          />
        </Grid.Col>
      )),
    [activePage, isMoreThanMd]
  );
  return (
    <div>
      <Flex justify="space-between">
        <Text component="h1">News</Text>
        <LanguageSwitch />
      </Flex>
      <TextInput leftSection={<IconSearch />} placeholder="Search" />
      <Select data={categories} placeholder="Category" />
      <DatePickerInput type="range" placeholder="Date" />
      <Grid>{items}</Grid>
      <Pagination
        total={data.length}
        value={activePage}
        onChange={setPage}
        mt="sm"
      />
    </div>
  );
};
