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
    //NOT good practice
    const argList = [];
    const callback = (...args) => argList.push(args);
    //Render the component
    render(<UserForm onUserAdd={callback}/>);

    //Manipulate the component
    const [nameInput, emailInput] = screen.getAllByRole('textbox');

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
    expect(argList).toHaveLength(1);
    expect(argList[0][0]).toEqual({name:'John Doe', email:'jhon@doe.com'});
 });
