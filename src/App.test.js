import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app/App.jsx';

test('render App(not auth user) ', () => {
  render(<App />);
  screen.debug();
});
