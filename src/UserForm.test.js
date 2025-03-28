import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test("it shows two inputs and  a button", () => {
    //render component
    render(<UserForm />);

    //manipulaate the componenet or find element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    //Assertion to make sure
    //What we expect
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

 test("it calls onUserAdd when the form is submitted", () => {
    const mock = jest.fn();
    //Render the component
    render(<UserForm onUserAdd={mock}/>);

    //Manipulate the component
    const nameInput = screen.getByRole('textbox', {name: /name/i});                 // i make expression not to worry about lower or upper case
    const emailInput = screen.getByRole('textbox', {name: /email/i});

    //Simulate typing in name
    user.click(nameInput);
    user.keyboard('John Doe');

    //Simulate typing in email
    user.click(emailInput);
    user.keyboard('jhon@doe.com');

    //Find Button
    const button = screen.getByRole('button');

    //Simulate clicking the button
    user.click(button);

    //Assertion to make sure onUserAdd was called with name and email
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name:'John Doe', email:'jhon@doe.com'});
 });

 //This test fails because when user added the input fields are not cleared
 test('empties the two inputs when form is submitted', () => {

    render(<UserForm onUserAdd={() =>{}}/>);

    const nameInput = screen.getByRole('textbox', {name: /name/i});
    const emailInput = screen.getByRole('textbox', {name: /email/i});
    const button = screen.getByRole('button');

    user.click(nameInput);
    user.keyboard('John Doe');
    user.click(emailInput);
    user.keyboard('john@doe.com');
    user.click(button);

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
 });
