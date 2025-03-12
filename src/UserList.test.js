import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

test('render one row per user', () => {
    const users = [
        {name: 'jhon', email: 'jhon@jhon.com'},
        {name: 'alex', email: 'alex@alex.com'},
    ];
    //Render component
    render(<UserList users={users}/>);

    //Find all rows in table
    // screen.logTestingPlaygroundURL();
    const rows = within(screen.getByTestId('users')).getAllByRole('row');

    //Assertion correct number of rows in table
    expect(rows).toHaveLength(2);
});

test('render email and name of each user', () =>{
    const users = [
        {name: 'jhon', email: 'jhon@jhon.com'},
        {name: 'alex', email: 'alex@alex.com'},
    ];
    //Render component
    render(<UserList users={users}/>);

    //Check for every row in table
    for (let user of users){
        const name = screen.getByRole('cell', {name: user.name});
        const email = screen.getByRole('cell', {name: user.email});

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
});
