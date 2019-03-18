import GoogleAnalytics from 'react-ga';

export default function register() {
    GoogleAnalytics.initialize(process.env.REACT_APP_GA || '');
}
