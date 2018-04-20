import React from 'react';
import { Login, LoginForm } from 'react-admin';
import { withStyles } from 'material-ui';

const CustomLoginForm = withStyles({
    button: { background: '#F15922' },
})(LoginForm);

const CustomLoginPage = props => (
    <Login
        id="login"
        loginForm={<CustomLoginForm />}
        {...props}
    />
);

export default withStyles(styles)(CustomLoginPage);
