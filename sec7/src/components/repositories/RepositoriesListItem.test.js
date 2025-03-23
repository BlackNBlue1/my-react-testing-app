import {render,screen,within} from '@testing-library/react';
import user from '@testing-library/user-event';

import RepositoriesListItem from './RepositoriesListItem';

function renderComponent() {

    const repository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1,
        html_url: 'https://github.com/facebook/react',
    };

    render(<RepositoriesListItem repository={{}} />);
}

test('show a link to the github homepage for this repository',() => {
    renderComponent();
})
