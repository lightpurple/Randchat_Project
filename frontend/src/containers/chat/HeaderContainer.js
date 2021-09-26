import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/chat/Header';
import { logout } from '../../modules/user';

const HeaderContainer = () =>{
    const {user} = useSelector(({ user }) => ({ user: user.user}));
    const dispatch = useDispatch();
    const onLogout = (history) => {
        localStorage.removeItem('token')
        history.push('/');
    };

    return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;