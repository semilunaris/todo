import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { action } from '@storybook/addon-actions';


export const withLogging = (Story: () => JSX.Element) => {
  return( <div onClick={action('AppWithRedux clicked')}>
      <Story />
    </div>
)};