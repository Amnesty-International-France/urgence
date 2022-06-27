import ReactPixel from 'react-facebook-pixel';

export default function register() {
    const advancedMatching = {};
    const options = {
        autoConfig: true,
        debug: false,
    };

    ReactPixel.init(process.env.REACT_APP_FB || '', advancedMatching, options);
}
