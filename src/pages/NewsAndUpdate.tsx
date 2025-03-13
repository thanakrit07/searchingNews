import { Flex, Text, TextInput } from '@mantine/core';
import { LanguageSwitch } from '../features';

export const NewsAndUpdate = () => {
  return (
    <div>
      <Flex justify="space-between">
        <Text component="h1">News</Text>
        <LanguageSwitch />
      </Flex>
      <TextInput label="Search" placeholder="Search" />
    </div>
  );
};
