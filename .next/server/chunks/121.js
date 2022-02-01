"use strict";
exports.id = 121;
exports.ids = [121];
exports.modules = {

/***/ 121:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ setCurrentFiosCustomer),
/* harmony export */   "lo": () => (/* binding */ setNumbersOfLines),
/* harmony export */   "Nu": () => (/* binding */ setAutoPay),
/* harmony export */   "GT": () => (/* binding */ setWithin30Days),
/* harmony export */   "GI": () => (/* binding */ setPlansPrice),
/* harmony export */   "Hw": () => (/* binding */ setIsFirstResponder),
/* harmony export */   "dG": () => (/* binding */ increaseLine),
/* harmony export */   "ZE": () => (/* binding */ decreaseLine),
/* harmony export */   "jx": () => (/* binding */ setInternet),
/* harmony export */   "Q8": () => (/* binding */ setDiscount),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports InterestedOn, setCurrentWirelessCustomer, setInterestedOn, setLineDiscount */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(184);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

var InterestedOn;
(function(InterestedOn) {
    InterestedOn["Fios"] = 'fios';
    InterestedOn["Wireless"] = 'wireless';
    InterestedOn["Both"] = 'both';
})(InterestedOn || (InterestedOn = {}));
const initialState = {
    currentFios: undefined,
    currentWireless: undefined,
    interestedOn: undefined,
    numberOfLines: 4,
    discount: 0,
    isFirstResponder: false,
    mobilePlusHomeDiscountAmount: 20,
    internet: undefined,
    within30Days: false,
    plansPrice: {
        start: 80,
        play_more: 90,
        do_more: 90,
        get_more: 100
    },
    auto_pay: 10,
    lineDiscont: 0
};
const dataSlide = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: 'data',
    initialState,
    reducers: {
        setCurrentFiosCustomer: (state, { payload  })=>{
            state.currentFios = payload;
        },
        setCurrentWirelessCustomer: (state, { payload  })=>{
            state.currentWireless = payload;
        },
        setInterestedOn: (state, { payload  })=>{
            state.interestedOn = payload;
        },
        setNumbersOfLines: (state, { payload  })=>{
            state.numberOfLines = payload;
        },
        setWithin30Days: (state, { payload  })=>{
            state.within30Days = payload;
        },
        increaseLine: (state, { payload  })=>{
            switch(true){
                case payload === 1:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 70,
                        get_more: 80,
                        play_more: 80,
                        start: 90
                    };
                    break;
                case payload === 2:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 75,
                        get_more: 75,
                        play_more: 65,
                        start: 55
                    };
                    break;
                case payload === 3:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 55,
                        get_more: 65,
                        play_more: 55,
                        start: 45
                    };
                    break;
                case payload >= 4 && payload <= 10:
                    state.numberOfLines++;
                    state.plansPrice = {
                        do_more: 50,
                        get_more: 60,
                        play_more: 50,
                        start: 40
                    };
                    break;
                default:
                    break;
            }
        },
        decreaseLine: (state, { payload  })=>{
            switch(true){
                case payload === 2:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 90,
                        get_more: 100,
                        play_more: 90,
                        start: 80
                    };
                    break;
                case payload === 3:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 80,
                        get_more: 90,
                        play_more: 80,
                        start: 70
                    };
                    break;
                case payload === 4:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 65,
                        get_more: 75,
                        play_more: 65,
                        start: 55
                    };
                    break;
                case payload === 5:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 55,
                        get_more: 65,
                        play_more: 55,
                        start: 45
                    };
                    break;
                case payload > 5 && payload <= 10:
                    state.numberOfLines--;
                    state.plansPrice = {
                        do_more: 50,
                        get_more: 60,
                        play_more: 50,
                        start: 40
                    };
                    break;
                default:
                    break;
            }
        },
        setPlansPrice: (state, { payload  })=>{
            state.plansPrice = payload;
        },
        setAutoPay: (state, { payload  })=>{
            state.auto_pay = payload;
        },
        setLineDiscount: (state, { payload  })=>{
            state.lineDiscont = payload;
        },
        setInternet: (state, { payload  })=>{
            state.internet = payload;
        },
        setIsFirstResponder: (state, { payload  })=>{
            state.isFirstResponder = payload;
        },
        setDiscount: (state, { payload  })=>{
            state.discount = payload;
        }
    }
});
const { setCurrentFiosCustomer , setCurrentWirelessCustomer , setInterestedOn , setNumbersOfLines , setAutoPay , setWithin30Days , setPlansPrice , setIsFirstResponder , increaseLine , decreaseLine , setInternet , setLineDiscount , setDiscount ,  } = dataSlide.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dataSlide.reducer);


/***/ })

};
;