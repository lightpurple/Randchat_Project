import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/chat/Header';

const HeaderContainer = () =>{
    const {user} = useSelector(({ user }) => ({ user: user.user}));
    const onLogout = () => {
        localStorage.removeItem('token')
    };

    return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;