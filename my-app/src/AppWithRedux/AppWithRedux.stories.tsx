import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import { withLogging } from '../stories/ReduxStoreWitthLoginDecoratot';

const meta: Meta<typeof AppWithRedux> = {
  title: 'AppWithRedux',
  component: AppWithRedux,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    withLogging,         // Используем декоратор для логирования
  ],
  
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AppWithReduxBasis: Story = {

}

