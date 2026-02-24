import { Box } from '@mui/material'
import React from 'react'
import bg from '../../assets/alex-shutin-kKvQJ6rK6S4-unsplash.jpg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';
import { Navigate } from 'react-router-dom';

function Auth() {
    const isLogin = location.pathname === '/login';
    const isRegister = location.pathname === '/register';

    const currentUser = useSelector(selectCurrentUser);
    if(currentUser) {
        return <Navigate to='/' replace={true}/>
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: {bg},
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
        }}>
            {isLogin && <LoginForm />}
            {isRegister && <RegisterForm />}
        </Box>
    )
}

export default Auth