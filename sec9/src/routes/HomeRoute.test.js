import {render, screen} from '@testing-library/react';
import HomeRoute from './HomeRoute';
import {MemoryRouter} from 'react-router-dom';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

const Handler = [
    rest.get('api/repositories', (req, res,ctx) => {
        const query = req.url.searchParams.get('q').split('language:')[1];  //Taking the language from the query
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

    // screen.debug();

    //Loop over all langs
    const langs = ['javascript', 'typescript', 'rust', 'go', 'python', 'java'];
    for (const lang of langs) {
        //Make sure every language return 2 links
        const links = await screen.findAllByRole('link', {name: new RegExp(`${lang}_`),});

        //Make assertions
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${lang}_first`);
        expect(links[1]).toHaveTextContent(`${lang}_second`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${lang}_first`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${lang}_second`);
    }
});
