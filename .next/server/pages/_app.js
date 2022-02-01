"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(22);
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(184);
// EXTERNAL MODULE: ./redux/dataSlide.tsx
var dataSlide = __webpack_require__(121);
// EXTERNAL MODULE: ./redux/themeSlide.ts
var themeSlide = __webpack_require__(374);
;// CONCATENATED MODULE: ./redux/store.ts



// ...
const store = (0,toolkit_.configureStore)({
    reducer: {
        theme: themeSlide/* default */.Z,
        data: dataSlide/* default */.ZP
    }
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "styled-components"
const external_styled_components_namespaceObject = require("styled-components");
// EXTERNAL MODULE: ./redux/hooks/reduxHooks.ts
var reduxHooks = __webpack_require__(305);
// EXTERNAL MODULE: ./Theme.ts
var Theme = __webpack_require__(791);
;// CONCATENATED MODULE: ./ThemeProviderComponent.tsx






const ThemeProviderComponent = ({ children  })=>{
    const theme = (0,reduxHooks/* useAppSelector */.C)((state)=>state.theme
    );
    const dispatch = (0,reduxHooks/* useAppDispatch */.T)();
    (0,external_react_.useEffect)(()=>{
        const t = localStorage.getItem('theme');
        if (t !== null) {
            dispatch((0,themeSlide/* switchTheme */.t)(JSON.parse(t) === 'dark' ? Theme/* darkTheme */.$ : Theme/* lightTheme */.W));
        }
    }, [
        dispatch
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_styled_components_namespaceObject.ThemeProvider, {
        theme: theme,
        children: children
    }));
};
/* harmony default export */ const ThemeProviderComponent_0 = (ThemeProviderComponent);

;// CONCATENATED MODULE: ./styles/Global.ts

const GlobalStyle = external_styled_components_namespaceObject.createGlobalStyle`
*, *:after, *:before {
    box-sizing:border-box;
    margin: 0;
    padding:0;
    outline:none;

}
body: {
    font-size: calc(14px + .5vm);
    font-family: 'Roboto', sans-serif;
   
}
a {
    text-decoration:none;
    color: ${({ theme  })=>theme.TEXT_COLOR
}
}
p, h1, h2, h3, h4, h5, h6, span {
    color: ${({ theme  })=>theme.TEXT_COLOR
}
}
.container {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;

    background-color: ${({ theme  })=>theme.BACKGROUND_COLOR
};
}
.card {
    box-shadow: 12px 8px 10px rgba(0, 0, 0, 0.12);
    padding: 12px;
    border-radius: 12px;
    position: relative;
    height: fit-content;
    background-color: ${({ theme  })=>theme.CARD_BACKGROUND
};
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
    background-color: ${({ theme  })=>theme.CARD_BACKGROUND
};
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
/* harmony default export */ const Global = (GlobalStyle);

;// CONCATENATED MODULE: ./pages/_app.tsx





function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: store,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ThemeProviderComponent_0, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Global, {})
            ]
        })
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 184:
/***/ ((module) => {

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 22:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [367,121], () => (__webpack_exec__(289)));
module.exports = __webpack_exports__;

})();