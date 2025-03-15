import { useCallback, useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Image, Menu, UnstyledButton } from '@mantine/core';
import { english, chinese } from './image';
import classes from './LanguagePicker.module.css';
import { getCurrentLanguage } from '../../../i18n/services';
import { useTranslation } from 'react-i18next';

const data = [
  {
    value: 'en-US',
    label: 'EN',
    image: english,
  },
  {
    value: 'zh-CN',
    label: 'ZH',
    image: chinese,
  },
];

export const LanguagePicker = ({
  onChange,
}: {
  onChange?: (language: string) => void;
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  const onLanguageChange = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
      onChange?.(language);
    },
    [i18n, onChange]
  );

  const [opened, setOpened] = useState(false);

  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => onLanguageChange(item.value)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  const selectedItem = data.find((item) => item.value === currentLanguage);

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            <Image src={selectedItem?.image} width={22} height={22} />
            <span className={classes.label}>{selectedItem?.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
