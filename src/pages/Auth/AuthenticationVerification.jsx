import React, { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import PageLoadingSpinner from '../components/Loading/PageLoadingSpinner';
import { verifyUserAPI } from '~/apis';

function AuthenticationVerification() {
    // Take the email and token value from URL
    let [searchParams] = useSearchParams();
    const { email, token } = Object.fromEntries([...searchParams]);

    const [verified, setVerified] = useState(false);

    // Call api to verify account

    useEffect(() => {
        if(email && token) {
            verifyUserAPI({ email, token }).then(() => setVerified(true))
        }
    }, [email, token]);

    // If URL erros, not exists 1 or 2 email or token return 404
    if(!email || !token) return <Navigate to="/404" />

    // If not verified -> loading

    if(!verified) return <PageLoadingSpinner caption="Verifying your account..." />

    return (
        <Navigate to={`/login?verifiedEmail=${email}`} />
    );
}

export default AuthenticationVerification