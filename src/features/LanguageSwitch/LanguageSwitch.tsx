import { Button, Menu } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { getCurrentLanguage } from '../../../i18n/services';
import { useCallback } from 'react';

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const currentLanguage = getCurrentLanguage();

  const onLanguageChange = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return (
    <Menu>
      <Menu.Target>
        <Button>{currentLanguage}</Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => onLanguageChange('en-US')}>En</Menu.Item>
        <Menu.Item onClick={() => onLanguageChange('zh-CN')}>Zh</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
