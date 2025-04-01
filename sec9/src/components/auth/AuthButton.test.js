import { render, screen } from '@testing-library/react';
import { MemoryRouter, redirect } from 'react-router-dom';
import { createServer } from '../../test/server';
import AuthButtons from './AuthButtons';

const renderComponent = () =>{
    render(
        <MemoryRouter>
            <AuthButtons />
        </MemoryRouter>
    );
}
describe('when user is not signed in ', () => {
    createServer([
        {
            path: '/api/user',
            res: (req, res, ctx) => {
                return res(ctx.json({ user: null }));
            },
        },
    ]);
    test('when user is not signed in, sign in and sign up are visible', async () => {
        renderComponent();

    });

    test('when user is not signed in, sign out is not visible', async () => {
        renderComponent();

    });

})

describe('when user is signed in', () => {
    createServer([
        {
            path: '/api/user',
            res: (req, res, ctx) => {
                return res(ctx.json({ user: { id: 1, username: 'testuser' } }));
            },
        },
    ]);
    test('when user is signed in, sign in and sign up are not visible', async () => {
        renderComponent();

    });

    test('when user is signed in, sign out is visible', async () => {
        renderComponent();

    });


});
