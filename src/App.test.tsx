import React from 'react';
import { render } from '@testing-library/react';
//import App from './App';
import Button from './pages/Dashboard/index';

test('should add type="submit" in button', () => {
  const { getByText } = render(<Button />);
  const btnElement = getByText('Pesquisar');
  expect(btnElement).toHaveAttribute('type', "submit");
})


