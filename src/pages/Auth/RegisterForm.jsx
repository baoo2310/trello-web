import React from 'react'
import { Alert, Avatar, Box, Button, CardActions, TextField, Typography, Zoom } from '@mui/material'
import { Card as MuiCard } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import trello from '../../assets/trello-brands-solid-full.svg'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators';
import FieldErrorAlert from '../components/Form/FieldErrorAlert';

function RegisterForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const submitRegister = (data) => {

    }

    return (
        <form onSubmit={handleSubmit(submitRegister)}>
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
                        Register
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
                        <Box sx={{ marginTop: '1em' }}>
                            <TextField
                                fullWidth
                                label='Password confirmation'
                                type='password'
                                variant='outlined'
                                error={!!errors['password_confirmation']}
                                {...register('password_confirmation', {
                                    validate: (value) => {
                                        if(value === watch('password')) return true;
                                        return 'Password Confirmation does not match';
                                    }
                                })}
                            />
                            <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
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
                            Register
                        </Button>
                    </CardActions>  
                    <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
                        <Typography>Already have an account?</Typography>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Typography sx={{ color: 'primary.main', ':&hover': { color: '#ffbb39' } }}>Login</Typography>
                        </Link>
                    </Box>
                </MuiCard>
            </Zoom>
        </form>
    )
}

export default RegisterForm