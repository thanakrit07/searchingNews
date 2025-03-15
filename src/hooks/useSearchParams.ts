import { useDebouncedCallback } from '@mantine/hooks';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { FromPathOption, RegisteredRouter } from '@tanstack/router-core';

export const useSearchParams = ({
  from,
}: {
  from: FromPathOption<RegisteredRouter, string> & {};
}) => {
  const navigate = useNavigate();
  const searchParams = useSearch({ from });

  const debouncedSetSearchParam = useDebouncedCallback(
    (params: Record<string, string | undefined>) => {
      navigate({
        from,
        search: (prev: object) => ({
          ...prev,
          ...params,
        }),
        replace: true,
      });
    },
    500
  );

  return { debouncedSetSearchParam, searchParams };
};
