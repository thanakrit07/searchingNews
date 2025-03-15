import { Divider, Input, InputWrapperProps, rem } from '@mantine/core';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { DateTimePicker, DateTimePickerProps, DateValue } from '@mantine/dates';
import dayjs from 'dayjs';
import { IconCalendarFilled } from '@tabler/icons-react';

import classes from './styles.module.css';

type DateTimePickerType = Omit<
  DateTimePickerProps,
  'type' | 'label' | 'onChange'
>;

export type DateTimeRangePickerProps = {
  startDateTimePickerProps?: DateTimePickerType;
  endDateTimePickerProps?: DateTimePickerType;
  onChange?: (value: [Date | null, Date | null | undefined]) => void;
  value?: [Date | null, Date | null | undefined];
  valueFormat?: string;
  disabled?: boolean;
  flexProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
} & InputWrapperProps;

export const DateTimeRangePicker = (props: DateTimeRangePickerProps) => {
  const {
    startDateTimePickerProps,
    endDateTimePickerProps,
    onChange,
    value: defaultValue = [null, null],
    valueFormat,
    disabled,
    flexProps,
    ...wrapperProps
  } = props;

  const [_value, setValue] =
    useState<[Date | null, Date | null | undefined]>(defaultValue);

  const value = defaultValue ?? _value;

  const handleSetValue = (val: [Date | null, Date | null | undefined]) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <Input.Wrapper {...wrapperProps}>
      <div className={classes.flexContainer} {...flexProps}>
        <div className={classes.inputs} data-disabled={disabled}>
          <DateTimePicker
            {...startDateTimePickerProps}
            className={classes.flexItem}
            styles={{
              input: {
                border: 'none',
                minHeight: rem(34),
              },
            }}
            onChange={(date) => {
              if (dayjs(value[1]).isBefore(dayjs(date as DateValue))) {
                handleSetValue([date as DateValue, null]);
                return;
              }
              handleSetValue([date as DateValue, value[1]]);
            }}
            value={value[0]}
            valueFormat={valueFormat}
            disabled={disabled}
            radius={0}
            leftSection={<IconCalendarFilled />}
            clearable
          />
          <Divider orientation="vertical" my={8} />
          <DateTimePicker
            {...endDateTimePickerProps}
            className={classes.flexItem}
            styles={{
              input: {
                border: 'none',
                minHeight: rem(34),
              },
            }}
            onChange={(date) => {
              handleSetValue([value[0], date as DateValue]);
            }}
            minDate={value[0] || undefined}
            clearable
            value={value[1]}
            valueFormat={valueFormat}
            disabled={disabled}
          />
        </div>
      </div>
    </Input.Wrapper>
  );
};
