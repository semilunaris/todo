import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AdItemForm } from './AdItemForm';

const meta: Meta<typeof AdItemForm> = {
  title: 'AdItemForm',
  component: AdItemForm,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    addTask: { action: 'addTask' }, // Событие для проверки
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const callback = action('button was pressed');

export const LoggedOut: Story = {
  args: {
    addTask: callback, // Используем callback для addTask
  },
};

