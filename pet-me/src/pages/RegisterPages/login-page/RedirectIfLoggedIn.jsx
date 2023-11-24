import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RedirectIfLoggedIn = () => {
    const { synced } = useSelector((state) => state.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (synced) {
        navigate('/');
        }
    }, [synced, navigate]);

    return null;
};

export default RedirectIfLoggedIn;
