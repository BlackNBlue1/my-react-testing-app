import {render, screen} from '@testing-library/react';
import HomeRoute from '../../../sec9/src/routes/HomeRoute';
import {MemoryRouter} from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

const Handler = [
    rest.get('api/repositories', (req, res,ctx) => {
        const query = req.url.searchParams('q').split('language:')[1];  //Taking the language from the query
        console.log(query);

        return res(
            ctx.json({
                items: [
                    {id:1, full_name:`${query}_first`},
                    {id:2, full_name:`${query}_second`},
                ],
            })
        );
    })
]

const server = setupServer(...Handler);

beforeAll(() => {server.listen()});
afterEach(() => {server.resetHandlers()});
afterAll(() => {server.close()});

test('return 2 links for each language', async () => {
    render(
        <MemoryRouter>
            <HomeRoute />
        </MemoryRouter>
    );

    screen.debug();

});
