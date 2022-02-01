"use strict";
exports.id = 367;
exports.ids = [367];
exports.modules = {

/***/ 791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "W": () => (/* binding */ lightTheme),
/* harmony export */   "$": () => (/* binding */ darkTheme)
/* harmony export */ });
const lightTheme = {
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
    ASCENT: '#ede0d4'
};
const darkTheme = {
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
    ASCENT: '#ede0d4'
};


/***/ }),

/***/ 305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ useAppDispatch),
/* harmony export */   "C": () => (/* binding */ useAppSelector)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = ()=>(0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)()
;
const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector;


/***/ }),

/***/ 374:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ switchTheme),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(791);


const initialState = _Theme__WEBPACK_IMPORTED_MODULE_1__/* .lightTheme */ .W;
const themeSlide = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'theme',
    initialState,
    reducers: {
        switchTheme: (state, { payload  })=>{
            localStorage.setItem('theme', JSON.stringify(payload.mode));
            return payload;
        }
    }
});
const { switchTheme  } = themeSlide.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (themeSlide.reducer);


/***/ })

};
;