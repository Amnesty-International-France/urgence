import GoogleAnalytics from 'react-ga';

GoogleAnalytics.initialize(process.env.REACT_APP_GA || '');
