import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

test('can recieve a new user and show it on a list', () => {

  render(<App />);

  //maniputlate components
  const nameInput = screen.getByRole('textbox', {name: /name/i});
  const emailInput = screen.getByRole('textbox', {name: /email/i});
  const button = screen.getByRole('button');

  //simulate typing in name
  user.click(nameInput);
  user.keyboard('jane doe');

  user.click(emailInput);
  user.keyboard('jane@doe.com');

  user.click(button);

  // screen.debug();        //to see the output of the screen
  const name = screen.getByRole('cell',{name: 'jane doe'});
  const email = screen.getByRole('cell',{name: 'jane@doe.com'});

  //Assertion
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
