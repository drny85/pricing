import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
    mode: 'light',
    BACKGROUND_COLOR: '#e9ecef',
    TEXT_COLOR: '#212121',
    BUTTON_TEXT_COLOR: '#ffffff',
    CARD_BACKGROUND: '#adb5bd',
    PRIMARY_BUTTON_COLOR: '#212121',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.19)',
    SECONDARY_BUTTON_COLOR: '#4361ee',
    DONE_COLOR: '#023e8a',
    DANGER: '#e07a5f',
    STATUS_BAR: 'dark',
    ASCENT: '#ede0d4',
};

export const darkTheme: DefaultTheme = {
    mode: 'dark',
    BACKGROUND_COLOR: '#212529',
    TEXT_COLOR: '#ffffff',
    DANGER: '#e07a5f',
    CARD_BACKGROUND: '#a5a58d',
    DONE_COLOR: '#023e8a',
    BUTTON_TEXT_COLOR: '#ffffff',
    PRIMARY_BUTTON_COLOR: '#ffffff',
    SHADOW_COLOR: 'rgba(0, 0, 0, 0.19)',
    SECONDARY_BUTTON_COLOR: '#4361ee',
    STATUS_BAR: 'light',
    ASCENT: '#ede0d4',
};
