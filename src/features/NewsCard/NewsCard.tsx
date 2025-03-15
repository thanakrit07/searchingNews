import { Card, CardProps, Flex, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import cx from 'clsx';

import classes from './style.module.css';

type NewsCardProps = CardProps & {
  image: string;
  publishedAt: string;
  title: string;
  description: string;
  source: string;
};

export const NewsCard = ({
  title,
  description,
  image,
  publishedAt,
  source,
  ...props
}: NewsCardProps) => {
  const isMoreThanMobile = useMediaQuery('(min-width: 576px)');
  return (
    <Card
      shadow="sm"
      w="100%"
      {...props}
      className={cx(classes.card, props.className)}
    >
      <Card.Section>
        <Image src={image} alt={title} h={isMoreThanMobile ? 300 : 200} />
      </Card.Section>
      <Text mt="md" mb={2} c="gray" size="xs">
        {dayjs(publishedAt).format('MMM D, YYYY hh:mm A')}
      </Text>
      <Text size="md" fw={600} lineClamp={2} title={title}>
        {title}
      </Text>
      <Text size="md" c="gray" lineClamp={2} title={description}>
        {description}
      </Text>
      <Flex justify="space-between">
        <div />
        <Text size="xs" mt="xs">
          {source}
        </Text>
      </Flex>
    </Card>
  );
};
