import { createGlobalStyle } from 'styled-components';

import { Theme } from '../types';

interface Props {
    theme: Theme;
}

const GlobalStyle = createGlobalStyle<Props>`
*, *:after, *:before {
    box-sizing:border-box;
    margin: 0;
    padding:0;
    outline:none;

}
body: {
    font-size: calc(14px + .5vm);
    font-family: 'Raleway', Roboto, sans-serif;
    width: 100vw;
    height: 100vh;
   
}
a {
    text-decoration:none;
    color: ${({ theme }) => theme.TEXT_COLOR}
}
p, h1, h2, h3, h4, h5, h6, span , i, b{
    color: ${({ theme }) => theme.TEXT_COLOR}
}
.container {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;

    background-color: ${({ theme }) => theme.BACKGROUND_COLOR};
}
.card {
    box-shadow: 12px 8px 10px rgba(0, 0, 0, 0.12);
    padding: 12px;
    border-radius: 12px;
    position: relative;
    height: fit-content;
    background-color: ${({ theme }) => theme.CARD_BACKGROUND};
    margin: 10px auto;
}
.btn {
    padding: 15px 25px;
    border-radius: 30px;
    min-width: 200px;
    margin-top: 20px;
    color: #ffffff;
    background-color: #212121;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    border-width: 0px;
    box-shadow: 6px 10px 6px rgba(0, 0, 0, 0.12);
    transition: 200ms background-color ease-in;
}


.btn:hover {
    background-color: #a09797;
}
.center {
    text-align: 'center'
}

.btn:disabled {
    opacity: 0.7;
    background-color: #362e2e;
}
.input {
    border-radius: 30px;
    border: none;
    padding: 15px 12px;
    outline: none;
    font-size: 1rem;
    margin: 10px;
    width: 100%;
    border-color: 'transparent';
    transition: 1000ms all ease-out;
}

.form {
    padding: 15px;
    background-color: ${({ theme }) => theme.CARD_BACKGROUND};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    box-shadow: 10px 12px 8px rgba(0, 0, 0, 0.12);
    position: relative;
    width: 100%;
    display: flex;
    max-width: 720px;
    min-width: 300px;
    flex-direction: column;
    align-self: center;
}

.italic {
    font-style: 'italic'
}

`;

export default GlobalStyle;
