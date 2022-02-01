import { Fab } from '@mui/material';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { switchTheme } from '../redux/themeSlide';
import { darkTheme, lightTheme } from '../Theme';
import Head from 'next/head';

interface PageProps {
    children: React.ReactNode;
    title?: string;
}

const MainContainer: FC<PageProps> = ({ children, title }) => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    return (
        <div
            style={{
                backgroundColor: theme.BACKGROUND_COLOR,
                display: 'flex',
                width: '100vw',
                height: '100vh',
                maxWidth: '1440px',
                margin: '0 auto',
            }}
        >
            <Head>{title}</Head>
            {children}
            <Fab
                onClick={() =>
                    dispatch(
                        switchTheme(
                            theme.mode === 'dark' ? lightTheme : darkTheme
                        )
                    )
                }
                style={{
                    position: 'absolute',
                    right: '30px',
                    bottom: '30px',
                    backgroundColor: theme.TEXT_COLOR,
                }}
            >
                {theme.mode === 'light' ? (
                    <DarkModeIcon
                        color="secondary"
                        style={{ backgroundColor: theme.TEXT_COLOR }}
                    />
                ) : (
                    <LightModeIcon
                        style={{ backgroundColor: theme.TEXT_COLOR }}
                    />
                )}
            </Fab>
        </div>
    );
};

export default MainContainer;
