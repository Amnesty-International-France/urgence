import { render, screen } from '@testing-library/react';
import { RecordContextProvider } from 'react-admin';
import PreviewLink from './PreviewLink';

test('it shoud return null if no record is provided', () => {
    render(<PreviewLink />);
    expect(screen.queryByText(/View/i)).toBeNull();
});

test('it should render as a link to front app urgent action page', () => {
    render(
        <RecordContextProvider value={{ slug: 'i-am-your-father' }}>
            <PreviewLink />
        </RecordContextProvider>,
    );

    const button = screen.getByRole('button');
    expect(button.getAttribute('href')).toBe('http://localhost:3000/ua/i-am-your-father');
});

test('it should open preview in a new tab', () => {
    render(
        <RecordContextProvider value={{ slug: 'i-am-your-father' }}>
            <PreviewLink />
        </RecordContextProvider>,
    );
    const button = screen.getByRole('button');
    expect(button.getAttribute('target')).toBe('_blank');
    expect(button.getAttribute('rel')).toBe('noopener noreferrer');
});

test('it should be disabled if no story is available', () => {
    render(
        <RecordContextProvider value={{ slug: 'i-am-your-father', story: null }}>
            <PreviewLink />
        </RecordContextProvider>,
    );

    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-disabled')).toBe('true');
});
