import { Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

import { NewsAndUpdate } from '../pages';
import { NewsSearchParams } from '../types';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): NewsSearchParams => {
    return {
      search: (search.search as string) || '',
      limit: Number(search.limit ?? 10),
      page: Number(search?.page ?? 1),
      category: (search.category as string) || '',
      from: (search.from as string) || '',
      to: (search.to as string) || '',
    };
  },
});

function RouteComponent() {
  return (
    <Container size="xl">
      <NewsAndUpdate />
    </Container>
  );
}
