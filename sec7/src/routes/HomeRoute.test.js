import {render, screen} from '@testing-library/react';
import HomeRoute from './HomeRoute';
import {MemoryRouter} from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

const Handler = [
    rest.get('api/repositories', (req, res,ctx) => {
        const query = req.url.searchParams('q');
        console.log(query);

        return res(
            ctx.json({
                items: [
                    {id:1, full_name:" first "},
                    {id:2, full_name:" second "},
                ]
            })
        )
    })
]

const server = setupServer(...Handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

