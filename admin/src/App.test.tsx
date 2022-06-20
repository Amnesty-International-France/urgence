import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form without crashing', async () => {
    render(<App />);
    const usernameInput = await screen.findByLabelText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
});
