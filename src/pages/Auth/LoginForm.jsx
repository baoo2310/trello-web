import React from 'react'
import { Alert, Avatar, Box, Button, CardActions, TextField, Typography, Zoom } from '@mui/material'
import { Card as MuiCard } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import trello from '../../assets/trello-brands-solid-full.svg'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';
import FieldErrorAlert from '../components/Form/FieldErrorAlert';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUserAPI } from '~/redux/user/userSlice';

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    let [searchParams] = useSearchParams();
    const registeredEmail = searchParams.get('registeredEmail');
    const verifiedEmail = searchParams.get('verifiedEmail');


    const submitLogin = (data) => {
        const { email, password } = data;
        toast.promise(
            dispatch(loginUserAPI({ email, password })),
            { pending: 'Logging in...' }
        ).then(res => {
            // console.log(res);
            if(!res.error) navigate('/');
        })
    }
    
    return (
        <form onSubmit={handleSubmit(submitLogin)}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '6em' }}>
                    <Box sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}><LockIcon /></Avatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }} src={trello} alt='trello'></Avatar>
                    </Box>
                    <Box sx={{
                        marginTop: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        color: theme => theme.palette.grey[500]
                    }}>
                        Login
                    </Box>
                    <Box sx={{
                        marginTop: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '0 1em'
                    }}>
                        {verifiedEmail && 
                            <Alert severity='success' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                                Your email&nbsp;
                                <Typography variant='span' sx={{ fontWeight: 'bold', ':&hover': { color: '#fdba26' } }}>
                                    {verifiedEmail}
                                </Typography>
                                &nbsp;has been verified. <br />Now you can login to enjoy our services! Have a good day
                            </Alert>
                        }
                        
                        {registeredEmail && 
                            <Alert severity='info' sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                                An email has been sent to &nbsp;
                                <Typography variant='span' sx={{ fontWeight: 'bold', ':&hover': { color: '#fdba26' } }}>
                                    {registeredEmail}
                                </Typography>
                                <br />Please check and verify your account before logging in!
                            </Alert>
                        }
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                autoFocus
                                fullWidth
                                label='Enter email...'
                                type='text'
                                variant='outlined'
                                error={!!errors['email']}
                                {...register('email', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: EMAIL_RULE,
                                        message: EMAIL_RULE_MESSAGE
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'email'} />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label='Enter password...'
                                type='password'
                                variant='outlined'
                                error={!!errors['password']}
                                {...register('password', {
                                    required: FIELD_REQUIRED_MESSAGE,
                                    pattern: {
                                        value: PASSWORD_RULE,
                                        message: PASSWORD_RULE_MESSAGE
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'password'} />
                        </Box>
                    </Box>
                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button
                            className='interceptor-loading'
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='large'
                            fullWidth
                        >
                            Login
                        </Button>
                    </CardActions>  
                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography>New to TRELLO?</Typography>
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            <Typography sx={{ color: 'primary.main', ':&hover': { color: '#ffbb39' } }}>Create Account!</Typography>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default LoginForm