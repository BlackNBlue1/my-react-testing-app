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
