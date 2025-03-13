import { Card, Flex, Image, Text } from '@mantine/core';
import dayjs from 'dayjs';

type NewsCardProps = {
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
}: NewsCardProps) => {
  return (
    <Card shadow="sm">
      <Card.Section>
        <Image src={image} alt={title} />
      </Card.Section>
      <Text>{dayjs(publishedAt).format('MMM D, YYYY hh:mm A')}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Flex justify="space-between">
        <div />
        <Text>{source}</Text>
      </Flex>
    </Card>
  );
};
