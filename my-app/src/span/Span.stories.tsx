import type { Meta, StoryObj } from '@storybook/react';
import { EditlbleSpan } from './Span';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof EditlbleSpan> = {
  title: 'EditlbleSpan',
  component: EditlbleSpan,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onChange: { action: 'onChange' }, 
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const changeCallback = action('Title changed');

export const EditlbleSpanBaseExample: Story = {
  args: {
    onChange: changeCallback, 
    title: 'Initial title',  
  },
};