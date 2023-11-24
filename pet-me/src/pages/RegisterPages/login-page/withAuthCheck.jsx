import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const withAuthCheck = (WrappedComponent) => {
    const AuthCheck = (props) => {
        const { synced } = useSelector((state) => state.currentUser);
        const navigate = useNavigate();

        if (synced) {
        // User is already logged in, redirect to home page
        navigate('/');
        return null;
        } else {
        // User is not logged in, render the login form
        return <WrappedComponent {...props} />;
        }
    };

    return AuthCheck;
};

export default withAuthCheck;
