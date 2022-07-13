import { FC, ReactElement, useEffect, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from './redux/hooks/reduxHooks';
import { switchTheme } from './redux/themeSlide';

import { darkTheme, lightTheme } from './Theme';

const ThemeProviderComponent = (props: any) => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const t = localStorage.getItem('theme');
        if (t !== null) {
            dispatch(
                switchTheme(JSON.parse(t) === 'dark' ? darkTheme : lightTheme)
            );
        }
    }, [dispatch]);
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default ThemeProviderComponent;
