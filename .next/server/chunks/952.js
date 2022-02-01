"use strict";
exports.id = 952;
exports.ids = [952];
exports.modules = {

/***/ 952:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _redux_hooks_reduxHooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(305);
/* harmony import */ var _mui_icons_material_DarkMode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(262);
/* harmony import */ var _mui_icons_material_DarkMode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_DarkMode__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_icons_material_LightMode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(684);
/* harmony import */ var _mui_icons_material_LightMode__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_LightMode__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _redux_themeSlide__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(374);
/* harmony import */ var _Theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(791);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_8__);









const MainContainer = ({ children , title  })=>{
    const theme = (0,_redux_hooks_reduxHooks__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .C)((state)=>state.theme
    );
    const dispatch = (0,_redux_hooks_reduxHooks__WEBPACK_IMPORTED_MODULE_3__/* .useAppDispatch */ .T)();
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            backgroundColor: theme.BACKGROUND_COLOR,
            display: 'flex',
            width: '100vw',
            height: '100vh',
            maxWidth: '1440px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_8___default()), {
                children: title
            }),
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_1__.Fab, {
                onClick: ()=>dispatch((0,_redux_themeSlide__WEBPACK_IMPORTED_MODULE_6__/* .switchTheme */ .t)(theme.mode === 'dark' ? _Theme__WEBPACK_IMPORTED_MODULE_7__/* .lightTheme */ .W : _Theme__WEBPACK_IMPORTED_MODULE_7__/* .darkTheme */ .$))
                ,
                style: {
                    position: 'absolute',
                    right: '30px',
                    bottom: '30px',
                    backgroundColor: theme.TEXT_COLOR
                },
                children: theme.mode === 'light' ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_DarkMode__WEBPACK_IMPORTED_MODULE_4___default()), {
                    color: "secondary",
                    style: {
                        backgroundColor: theme.TEXT_COLOR
                    }
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_LightMode__WEBPACK_IMPORTED_MODULE_5___default()), {
                    style: {
                        backgroundColor: theme.TEXT_COLOR
                    }
                })
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainContainer);


/***/ })

};
;