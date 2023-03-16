import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';
import { isValidEmail } from '../utils/isValidEmail';
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import Plans from './home';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import { AppUser, setUser } from '../redux/authSlide';
import { useAuth } from '../hooks/useAuth';
import MyAlert from '../components/MyAlert';

type Props = {};

function Login({}: Props) {
    const { user } = useAppSelector((state) => state.auth);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const { loading } = useAuth();
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();
    const { replace } = useRouter();
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const createUser = async (userData: AppUser) => {
        try {
            const u: AppUser = {
                ...userData,
                createdAt: new Date().toISOString(),
            };
            await db
                .collection('users')
                .doc(userData.id)
                .set({ ...u });
        } catch (error) {
            console.log(error);
        }
    };

    // if (!user || !user.emailVerified) return <Plans />;

    const handleSubmit = async () => {
        try {
            if (!isValidEmail(email)) {
                setOpen(true);
                setMessage('Email is not valid');
                return;
            }

            if (password.length < 6) {
                setOpen(true);
                setMessage('Password must be at least 6 characters long');
                return;
            }
            if (mode === 'signup') {
                if (password !== confirm) {
                    setOpen(true);
                    setMessage('Password does not match');
                    return;
                }
                const { user } = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                if (user) {
                    user.sendEmailVerification();
                    replace('/emailVerification');
                }
            } else if (mode === 'login') {
                const { user } = await auth.signInWithEmailAndPassword(
                    email,
                    password
                );
                if (!user) return;
                if (!user?.emailVerified) {
                    setOpen(true);
                    setMessage(
                        'Please verify your  email before signing in, Check your junk or spam folder'
                    );
                    return;
                }
                const userData: AppUser = {
                    id: user.uid,
                    email: user.email!,
                    emailVerified: user.emailVerified,
                    lastLogin: new Date().toISOString(),
                };
                await createUser(userData);
                dispatch(setUser(userData));
            }
        } catch (error) {
            const err = error as any;
            setOpen(true);
            setTitle('Error');
            setMessage(err.message);
            //alert(err.message);
        }
    };

    const toogle = () => {
        if (mode === 'login') {
            setMode('signup');
        } else {
            setMode('login');
        }
    };

    useEffect(() => {
        if (!user) return;
        if (user.emailVerified) replace('/home');
    }, [user]);

    if (loading) return null;
    return (
        <MainContainer>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    height: '100vh',
                    width: '100vw',
                    flexDirection: 'column',
                    maxWidth: '1080px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        alignSelf: 'center',
                    }}
                >
                    <Typography
                        textAlign={'center'}
                        style={{ marginBottom: '2rem' }}
                        variant="h4"
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </Typography>
                    <FormControl
                        sx={{ m: 1, width: '100%', marginBottom: '1.5rem' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Email Address
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password8"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value.toLowerCase())
                            }
                        />
                    </FormControl>
                    <FormControl
                        sx={{ m: 1, width: '100%' }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password3">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <div
                            onClick={() => router.push('/resetPassword')}
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingTop: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            Forgot password?
                        </div>
                    </FormControl>
                    {mode === 'signup' && (
                        <FormControl
                            sx={{ m: 1, width: '100%' }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password2">
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password9"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                    )}
                </div>
                <Box
                    alignItems={'center'}
                    justifyContent="center"
                    alignSelf={'center'}
                >
                    <Button
                        onClick={handleSubmit}
                        size="large"
                        style={{ marginTop: '2rem' }}
                        variant="contained"
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </Button>
                </Box>
                <div style={{ cursor: 'pointer' }} onClick={toogle}>
                    <Typography style={{ marginTop: '2rem' }}>
                        {mode === 'login'
                            ? 'Do not have an account? Create One'
                            : 'Have an account? Login'}
                    </Typography>
                </div>
            </div>

            <MyAlert
                open={open}
                message={message}
                title={title}
                onClick={() => {
                    setOpen(false);
                }}
            />
        </MainContainer>
    );
}

export default Login;
