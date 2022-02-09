import {
    Button,
    ButtonGroup,
    Switch,
    Box,
    Tabs,
    Tab,
    Typography,
} from '@mui/material';
import Head from 'next/head';
import MainContainer from '../components/MainContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AnimatedNumber from 'animated-number-react';

import {
    decreaseLine,
    increaseLine,
    setAutoPay,
    setCurrentFiosCustomer,
    setInternet,
    setIsFirstResponder,
    setWithin30Days,
    setNumbersOfLines,
    setPlansPrice,
    setDiscount,
    dataReset,
} from '../redux/dataSlide';
import PlanCard from '../components/PlanCard';
import plansDetails from '../plansDetails';

import React, { FC, useEffect, useState } from 'react';

import {
    fiosReset,
    setFiosAutoPay,
    setFiosFirstResponder,
    setHasWireless,
    setIsUnlimited,
    setJustSignedUpForWireless,
    setWirelessWithin30Days,
} from '../redux/fiosData';
import fiosPlans from '../fiosPlans';
import FiosCard from '../components/FiosCard';
import TvCard from '../components/TvCard';
import tvPlans from '../tvPlans';
import Switcher from '../components/Switcher';
import {
    setExpressAutoPay,
    setExpressFirstResponder,
    setExpressHasFios,
    setExpressInternet,
    setExpressReset,
    setExpressWithin30Days,
} from '../redux/wirelessSlide';
import PlanLine from '../components/PlanLine';
import { firstResponderDiscount } from '../utils/firstResponderDiscount';
import {
    bonusOfferDiscount,
    mobilePlusHomeRewards,
    welcomeOffer,
} from '../utils/mobilePlusHomeRewards';

interface Props {
    children: React.ReactChild;
    value: number;
    index: number;
    others?: any;
}
enum PlanId {
    start = 'start',
    play_more = 'play_more',
    do_more = 'do_more',
    get_more = 'get_more',
}

const TabPanel: FC<Props> = ({ children, others, value, index }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...others}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const Plans = () => {
    const [loading, setLoading] = useState(true);
    const [lines, setLines] = useState(0);
    const [value, setValue] = useState(0);
    const [start, setStart] = useState(0);
    const [playMore, setPlayMore] = useState(0);
    const [doMore, setDoMore] = useState(0);
    const [getMore, setGetMore] = useState(0);
    const [jk, setJk] = useState(0);
    const {
        currentFios,
        isFirstResponder,
        internet,
        numberOfLines,
        discount,
        within30Days,
        plansPrice,
        auto_pay,
    } = useAppSelector((state) => state.data);
    const {
        hasWireless,
        isFiosFirstResponder,
        fiosPrice,
        fiosAutoPay,
        isUnlimited,
        wirelessWithin30Days,
        justSigned,
    } = useAppSelector((state) => state.fiosData);
    const {
        expressAutoPay,
        expressFirstResponder,
        expressHasFios,
        expressInternet,
        expressWhithin30Days,
        expressBonus,
    } = useAppSelector((state) => state.wireless);
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
    const activationFee = (lines: number, amount: number = 35) => {
        return lines * amount;
    };

    const autoPayDiscount = (lines: number, amount: number) => {
        return lines * amount;
    };

    const plans = [
        {
            id: 'start',
            name: '5G Start',
            line: start,
            details: [
                '5G Access',
                '5G Nationwide',
                'Apple Arcade for 6 months on us',
                'Google Play Pass for 6 months on us',
                'Apple Music for 6 months on us',
            ],
            price:
                lines === 1
                    ? 80 - expressAutoPay
                    : lines === 2
                    ? 70 - expressAutoPay
                    : lines === 3
                    ? 55 - expressAutoPay
                    : lines === 4
                    ? 45 - expressAutoPay
                    : lines >= 5
                    ? 40 - expressAutoPay
                    : 0,
        },
        {
            id: 'play_more',
            name: '5G Play More',
            line: playMore,
            details: [
                '5G Total Access',
                '5G Ultra Wideband',
                '5G Nationwide',
                '50 GB Premium Network Access',
                '25 GB premium mobile hotspot data, then unlimited lower-speed data',
                'Hulu, Disney+ and ESPN+ included',
                'Apple Arcade or Google Play Pass',
                'Apple Music for 6 months on us',
            ],
            price:
                lines === 1
                    ? 90 - expressAutoPay
                    : lines === 2
                    ? 80 - expressAutoPay
                    : lines === 3
                    ? 65 - expressAutoPay
                    : lines === 4
                    ? 55 - expressAutoPay
                    : lines >= 5
                    ? 50 - expressAutoPay
                    : 0,
        },
        {
            id: 'do_more',
            name: '5G Do More',
            line: doMore,
            details: [
                '5G Total Access',
                '5G Ultra Wideband',
                '5G Nationwide',
                '50 GB Premium Network Access',
                '25 GB premium mobile hotspot data, then unlimited lower-speed data',
                '600 GB of Verizon Cloud Storage',
                'Up to 50% off select connected device plans',
                'Apple Music, Disney+, Apple Arcade, and Google Play Pass for 6 months on us',
            ],
            price:
                lines === 1
                    ? 90 - expressAutoPay
                    : lines === 2
                    ? 80 - expressAutoPay
                    : lines === 3
                    ? 65 - expressAutoPay
                    : lines === 4
                    ? 55 - expressAutoPay
                    : lines >= 5
                    ? 50 - expressAutoPay
                    : 0,
        },
        {
            id: 'get_more',
            name: '5G Get More',
            line: getMore,
            details: [
                '5G Total Access',
                '5G Ultra Wideband',

                '5G Nationwide',
                'Unlimited Premium Network Access',
                '50 GB premium mobile hotspot data, then unlimited lower-speed data',
                'Hulu, Disney+ and ESPN+ included',
                'Apple Arcade or Google Play Pass for 12 months on us',
                'Apple Music included',
                '600 GB of Verizon Cloud Storage',
                'Up to 50% off select connected device plans',
            ],
            price:
                lines === 1
                    ? 100 - expressAutoPay
                    : lines === 2
                    ? 90 - expressAutoPay
                    : lines === 3
                    ? 75 - expressAutoPay
                    : lines === 4
                    ? 65 - expressAutoPay
                    : lines >= 5
                    ? 60 - expressAutoPay
                    : 0,
        },
    ];
    const calculateGrandTotal = (lines: number, isFirst: boolean) => {
        const total = plans.reduce((pre, acc) => acc.line * acc.price + pre, 0);
        return total - firstResponderDiscount(lines, isFirst);
    };

    const calculatePriceByLineMinus = (plan_id: PlanId) => {
        switch (plan_id) {
            case 'start':
                if (start > 0) {
                    setLines((prev) => prev - 1);
                    setStart((prev) => prev - 1);
                }
                break;
            case 'play_more':
                if (playMore > 0) {
                    setLines((prev) => prev - 1);
                    setPlayMore((prev) => prev - 1);
                }
                break;
            case 'do_more':
                if (doMore > 0) {
                    setLines((prev) => prev - 1);
                    setDoMore((prev) => prev - 1);
                }
                break;
            case 'get_more':
                if (getMore > 0) {
                    setLines((prev) => prev - 1);
                    setGetMore((prev) => prev - 1);
                }
                break;
            default:
                break;
        }
    };
    const calculatePriceByLinePlus = (plan_id: PlanId) => {
        switch (plan_id) {
            case 'start':
                if (start < 10) {
                    setStart((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'play_more':
                if (playMore < 10) {
                    setPlayMore((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'do_more':
                if (doMore < 10) {
                    setDoMore((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            case 'get_more':
                if (getMore < 10) {
                    setGetMore((prev) => prev + 1);
                    setLines((prev) => prev + 1);
                }
                break;
            default:
                break;
        }
    };
    const calculateTotalPriceBeforeTaxes = () => {
        return plans.reduce((pre, acc) => acc.line * acc.price + pre, 0);
    };

    const resetAll = () => {
        setPlayMore(0);
        setDoMore(0);
        setStart(0);
        setGetMore(0);
        setLines(0);
    };

    useEffect(() => {
        dispatch(
            setPlansPrice({
                get_more: 65,
                do_more: 55,
                play_more: 55,
                start: 45,
            })
        );
        dispatch(setNumbersOfLines(4));
        setLoading(false);
    }, [dispatch]);
    if (loading) return null;
    return (
        <MainContainer>
            <Head>
                <title>Plans</title>
            </Head>
            <div
                style={{
                    margin: '15px auto',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0px 20px',
                }}
            >
                <Box
                    alignItems="center"
                    width="100%"
                    justifyContent="center"
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                    <Tabs
                        value={value}
                        variant="fullWidth"
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            icon={<NetworkCheckIcon />}
                            iconPosition="start"
                            label="Fios Internet"
                        />
                        <Tab
                            icon={<SignalCellularAltIcon />}
                            iconPosition="start"
                            label="Wireless"
                        />
                        <Tab
                            icon={<LiveTvIcon />}
                            iconPosition="start"
                            label="Fios TV"
                        />
                        <Tab
                            icon={<AddShoppingCartIcon />}
                            iconPosition="start"
                            label="Express Store"
                        />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={1}>
                    <div>
                        <div>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '1rem',
                                }}
                                className="center"
                            >
                                Thank you for your interest in Verizon Wireless
                            </h2>

                            {/* DISCOUNTS */}
                            <div
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    borderRadius: '15px',
                                    backgroundColor: theme.CARD_BACKGROUND,
                                    overflow: 'hidden',
                                    minHeight: '3.5rem',
                                }}
                            >
                                <div
                                    style={{
                                        flex: '0.5',
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Switcher
                                        value={auto_pay}
                                        checked={auto_pay === 10}
                                        text="Auto Pay"
                                        saving={auto_pay !== 0}
                                        savingText={(
                                            auto_pay * numberOfLines
                                        ).toString()}
                                        onChange={() =>
                                            dispatch(
                                                setAutoPay(
                                                    auto_pay === 0 ? 10 : 0
                                                )
                                            )
                                        }
                                    />
                                    <Switcher
                                        value={isFirstResponder}
                                        text="Is First Responder"
                                        checked={isFirstResponder}
                                        saving={isFirstResponder}
                                        savingText={
                                            numberOfLines === 1
                                                ? 10
                                                : numberOfLines === 2
                                                ? 25
                                                : numberOfLines === 3
                                                ? 25
                                                : 20
                                        }
                                        onChange={() =>
                                            dispatch(
                                                setIsFirstResponder(
                                                    !isFirstResponder
                                                )
                                            )
                                        }
                                    />
                                </div>

                                <div
                                    style={{
                                        flex: '0.5',
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'self-start',
                                        }}
                                    >
                                        <Switcher
                                            value={currentFios!}
                                            text="Has Fios Internet"
                                            checked={currentFios!}
                                            onChange={() => {
                                                const res = dispatch(
                                                    setCurrentFiosCustomer(
                                                        !currentFios
                                                    )
                                                );
                                                if (!res.payload) {
                                                    dispatch(
                                                        setInternet(undefined)
                                                    );
                                                    dispatch(setDiscount(0));
                                                }
                                            }}
                                        />
                                        {currentFios && (
                                            <Switcher
                                                value={within30Days}
                                                saving={discount > 0}
                                                savingText={discount}
                                                checked={within30Days}
                                                text={`Signed up after ${moment()
                                                    .subtract(30, 'days')
                                                    .format('ll')}`}
                                                onChange={() =>
                                                    dispatch(
                                                        setWithin30Days(
                                                            !within30Days
                                                        )
                                                    )
                                                }
                                            />
                                        )}
                                    </div>

                                    {currentFios && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-end',
                                            }}
                                        >
                                            <Switcher
                                                value={'200'}
                                                text="200 or 300 Mbps"
                                                checked={internet === '200'}
                                                onChange={() =>
                                                    dispatch(setInternet('200'))
                                                }
                                            />
                                            <Switcher
                                                value={'400'}
                                                text="400 or 500 Mbps"
                                                checked={internet === '400'}
                                                onChange={() =>
                                                    dispatch(setInternet('400'))
                                                }
                                            />
                                            <Switcher
                                                value={'gig'}
                                                text="Up to 940/880 Mbps"
                                                checked={internet === 'gig'}
                                                onChange={() =>
                                                    dispatch(setInternet('gig'))
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="card" style={{ width: '100%' }}>
                                    {/* #LINES */}
                                    <div
                                        style={{
                                            alignSelf: 'center',
                                            width: '100%',
                                            margin: '10px auto',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <ButtonGroup variant="contained">
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        theme.PRIMARY_BUTTON_COLOR,
                                                    color:
                                                        theme.mode === 'dark'
                                                            ? '#212121'
                                                            : '#ffffff',
                                                }}
                                                disabled={numberOfLines === 1}
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseLine(
                                                            numberOfLines
                                                        )
                                                    )
                                                }
                                            >
                                                <RemoveIcon />
                                            </Button>
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        theme.PRIMARY_BUTTON_COLOR,
                                                }}
                                            >
                                                <h2
                                                    style={{
                                                        color:
                                                            theme.mode ===
                                                            'dark'
                                                                ? '#212121'
                                                                : '#ffffff',
                                                    }}
                                                >
                                                    {numberOfLines}
                                                </h2>
                                            </Button>
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        theme.PRIMARY_BUTTON_COLOR,
                                                    color:
                                                        theme.mode === 'dark'
                                                            ? '#212121'
                                                            : '#ffffff',
                                                }}
                                                disabled={numberOfLines === 10}
                                                onClick={() =>
                                                    dispatch(
                                                        increaseLine(
                                                            numberOfLines
                                                        )
                                                    )
                                                }
                                            >
                                                <AddIcon />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '100%',
                                            margin: '0 auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {plansDetails.map((plan) => (
                                            <PlanCard
                                                key={plan.id}
                                                price={
                                                    plansPrice[
                                                        plan.id as
                                                            | 'do_more'
                                                            | 'get_more'
                                                            | 'start'
                                                            | 'play_more'
                                                    ]
                                                }
                                                title={plan.name}
                                                details={plan.details}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={{ width: '100%' }}>
                                <h2 style={{ textAlign: 'center' }}>
                                    All plans include
                                </h2>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: '20px',
                                        padding: '12px',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                            <p style={{ paddingLeft: '6px' }}>
                                                Unlimited Talk & Text & Data
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                            <p style={{ padding: '8px' }}>
                                                Mexico & Canada talk, text &
                                                data
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                            <p style={{ paddingLeft: '6px' }}>
                                                4G LTE
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                            <p style={{ padding: '8px' }}>
                                                International Texting
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                            <p style={{ paddingLeft: '6px' }}>
                                                Verizon Up rewards
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                            <p style={{ padding: '8px' }}>
                                                Call Filter spam blocker
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        height: '120px',
                                        justifyContent: 'space-evenly',
                                        alignItems: 'center',
                                    }}
                                >
                                    {currentFios && (
                                        <p
                                            style={{
                                                fontSize: '1rem',
                                                fontStyle: 'italic',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Must Enroll in Mobile + Home Rewards
                                            through Verizon Up by downloading My
                                            Verizon App
                                        </p>
                                    )}

                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            dispatch(dataReset());
                                            dispatch(
                                                setCurrentFiosCustomer(false)
                                            );
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: '#445cc4',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Start Over
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={0}>
                    {/* INTERNET INFO */}
                    <div>
                        <h2
                            style={{
                                textAlign: 'center',
                                marginBottom: '1rem',
                            }}
                            className="center"
                        >
                            Thank you for your interest in Verizon Fios Internet
                        </h2>
                        <div
                            style={{
                                display: 'flex',
                                flex: 1,
                                borderRadius: '15px',
                                backgroundColor: theme.CARD_BACKGROUND,
                                overflow: 'hidden',
                                marginBottom: '12px',
                                padding: '12px 2px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flex: '0.3',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        flexDirection: 'column',
                                        paddingLeft: '12px',
                                        paddingBottom: '8px',
                                    }}
                                >
                                    <Switcher
                                        value={fiosAutoPay}
                                        checked={fiosAutoPay === 10}
                                        text={'Auto Pay'}
                                        saving={fiosAutoPay === 10}
                                        savingText={10}
                                        onChange={() =>
                                            dispatch(
                                                setFiosAutoPay(
                                                    fiosAutoPay === 0 ? 10 : 0
                                                )
                                            )
                                        }
                                    />
                                    <Switcher
                                        value={isFiosFirstResponder}
                                        checked={isFiosFirstResponder}
                                        text={'Is First Responder'}
                                        onChange={() =>
                                            dispatch(
                                                setFiosFirstResponder(
                                                    !isFiosFirstResponder
                                                )
                                            )
                                        }
                                        saving={isFiosFirstResponder}
                                        savingText={'Up to $15'}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    flex: '0.7',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'flex-end',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Switcher
                                        value={hasWireless}
                                        text="Has Verizon Wireless?"
                                        checked={hasWireless}
                                        onChange={() => {
                                            const d = dispatch(
                                                setHasWireless(!hasWireless)
                                            );
                                            if (!d.payload) {
                                                dispatch(
                                                    setWirelessWithin30Days(
                                                        false
                                                    )
                                                );
                                                dispatch(
                                                    setJustSignedUpForWireless(
                                                        false
                                                    )
                                                );
                                            }
                                        }}
                                    />

                                    {hasWireless && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '2px',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Switcher
                                                value={isUnlimited}
                                                text="Unlimited Data Plan?"
                                                checked={isUnlimited}
                                                onChange={() => {
                                                    dispatch(
                                                        setIsUnlimited(
                                                            !isUnlimited
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                {hasWireless && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',

                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <p
                                                style={{
                                                    fontWeight: 'bold',
                                                    paddingBottom: '8px',
                                                    textDecoration: 'underline',
                                                    fontSize: '1.1rem',
                                                }}
                                            >
                                                When Signed Up For Wireless?
                                            </p>
                                        </div>
                                        <div>
                                            <Switcher
                                                text="Just Signed Or Signing Up Today"
                                                value={justSigned}
                                                checked={justSigned}
                                                onChange={() => {
                                                    dispatch(
                                                        setWirelessWithin30Days(
                                                            false
                                                        )
                                                    );
                                                    dispatch(
                                                        setJustSignedUpForWireless(
                                                            !justSigned
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Switcher
                                                text={`After ${moment()
                                                    .subtract(30, 'days')
                                                    .format(
                                                        'll'
                                                    )} But Before Today`}
                                                value={wirelessWithin30Days}
                                                checked={wirelessWithin30Days}
                                                onChange={() => {
                                                    dispatch(
                                                        setJustSignedUpForWireless(
                                                            false
                                                        )
                                                    );
                                                    dispatch(
                                                        setWirelessWithin30Days(
                                                            !wirelessWithin30Days
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <Switcher
                                                text={'More Than 30 Days Ago'}
                                                value={
                                                    !wirelessWithin30Days &&
                                                    !justSigned
                                                }
                                                checked={
                                                    !wirelessWithin30Days &&
                                                    !justSigned
                                                }
                                                onChange={() => {
                                                    dispatch(
                                                        setWirelessWithin30Days(
                                                            false
                                                        )
                                                    );
                                                    dispatch(
                                                        setJustSignedUpForWireless(
                                                            false
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                margin: '0 auto',
                                justifyContent: 'center',
                            }}
                        >
                            {fiosPlans.map((plan) => (
                                <FiosCard
                                    id={plan.id}
                                    subtitle={plan.subtitle}
                                    key={plan.id}
                                    price={
                                        fiosPrice[
                                            plan.id as
                                                | 'fiosGig'
                                                | 'fios200'
                                                | 'fios400'
                                        ]
                                    }
                                    title={plan.name}
                                    details={plan.details}
                                />
                            ))}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                height: '120px',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}
                        >
                            {hasWireless && (
                                <p
                                    style={{
                                        fontSize: '1rem',
                                        fontStyle: 'italic',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Must Enroll in Mobile + Home Rewards through
                                    Verizon Up by downloading My Verizon App
                                </p>
                            )}

                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatch(fiosReset())}
                            >
                                <p
                                    style={{
                                        color: '#445cc4',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Start Over
                                </p>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <div>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    padding: '1.5rem',
                                }}
                            >
                                Thank you for in interest in Fios TV
                            </h2>
                        </div>
                        <hr />
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                margin: '0 auto',
                                justifyContent: 'center',
                            }}
                        >
                            {tvPlans.map((plan) => (
                                <TvCard
                                    perk={plan.perk}
                                    id={plan.id}
                                    subtitle={plan.subtitle}
                                    key={plan.id}
                                    price={plan.price}
                                    title={plan.name}
                                    details={plan.details}
                                />
                            ))}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                padding: '2rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <h2>Fios Tv Plans</h2>
                            <p style={{ padding: '1rem', fontSize: '1.2rem' }}>
                                Pick the package that works for you. And with no
                                surcharges, broadcast, regional sports network
                                fees, the price is the price.
                            </p>
                            <img
                                style={{
                                    width: '200px',
                                    height: '100px',
                                    aspectRatio: 'auto',
                                }}
                                src="https://ss7.vzw.com/is/image/VerizonWireless/fios-mixnmatch-200-062221-d?scl=1&extend=300,135,300,135&&bgc=f6f6f6"
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel index={3} value={value}>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-evenly',
                                padding: '1rem',
                                boxShadow: '6px 6px 10px 3px rgba(0,0,0,0.121)',
                                borderRadius: '15px',
                                backgroundColor: theme.CARD_BACKGROUND,
                            }}
                        >
                            <Switcher
                                text="Auto Pay"
                                value={expressAutoPay}
                                checked={expressAutoPay === 10}
                                saving={expressAutoPay === 10}
                                savingText={expressAutoPay * lines}
                                onChange={() =>
                                    dispatch(
                                        setExpressAutoPay(
                                            expressAutoPay === 0 ? 10 : 0
                                        )
                                    )
                                }
                            />
                            <Switcher
                                text="Is First Responder"
                                value={expressFirstResponder}
                                checked={expressFirstResponder}
                                saving={expressFirstResponder}
                                savingText={firstResponderDiscount(
                                    lines,
                                    expressFirstResponder
                                )}
                                onChange={() => {
                                    dispatch(
                                        setExpressFirstResponder(
                                            !expressFirstResponder
                                        )
                                    );
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                }}
                            >
                                <Switcher
                                    text="Has Fios Internet"
                                    value={expressHasFios}
                                    checked={expressHasFios}
                                    onChange={() => {
                                        dispatch(
                                            setExpressHasFios(!expressHasFios)
                                        );
                                        dispatch(setExpressInternet(undefined));
                                    }}
                                />
                                {expressHasFios && (
                                    <Switcher
                                        value={expressWhithin30Days}
                                        checked={expressWhithin30Days}
                                        onChange={() =>
                                            dispatch(
                                                setExpressWithin30Days(
                                                    !expressWhithin30Days
                                                )
                                            )
                                        }
                                        text={`Signed for Internet after ${moment()
                                            .subtract(30, 'days')
                                            .format('ll')}`}
                                    />
                                )}
                                {expressHasFios &&
                                    expressInternet !== undefined &&
                                    lines > 0 && (
                                        <p
                                            style={{
                                                fontStyle: 'italic',
                                                textDecoration: 'underline',
                                                fontSize: '1.2rem',
                                            }}
                                        >
                                            $
                                            {mobilePlusHomeRewards(
                                                lines,
                                                expressHasFios,
                                                expressInternet
                                            ) +
                                                welcomeOffer(
                                                    expressWhithin30Days,
                                                    expressHasFios,
                                                    numberOfLines
                                                )}{' '}
                                            saving
                                        </p>
                                    )}
                            </div>

                            {expressHasFios && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Switcher
                                        value={'200'}
                                        text="200 or 300 Mbps"
                                        checked={expressInternet === '200'}
                                        onChange={() =>
                                            dispatch(setExpressInternet('200'))
                                        }
                                    />
                                    <Switcher
                                        value={'400'}
                                        text="400 or 500 Mbps"
                                        checked={expressInternet === '400'}
                                        onChange={() =>
                                            dispatch(setExpressInternet('400'))
                                        }
                                    />
                                    <Switcher
                                        value={'gig'}
                                        text="Up to 940/880 Mbps"
                                        checked={expressInternet === 'gig'}
                                        onChange={() =>
                                            dispatch(setExpressInternet('gig'))
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        {/* WIRELESS LINES CONTAINER */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                boxShadow: '6px 6px 10px 3px rgba(0,0,0,0.121)',
                                borderRadius: '35px',
                                alignSelf: 'center',
                                width: 'fit-content',
                                margin: '10px',
                            }}
                        >
                            <h4>
                                Number of Lines{' '}
                                <b
                                    style={{
                                        fontSize: '1.2rem',
                                        paddingLeft: '6px',
                                    }}
                                >
                                    {lines}
                                </b>{' '}
                            </h4>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                padding: '1rem',
                                backgroundColor: theme.CARD_BACKGROUND,
                                borderRadius: '10px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                }}
                            >
                                {plans.map((p) => (
                                    <PlanLine
                                        key={p.id}
                                        price={p.price}
                                        lines={p.line}
                                        details={p.details}
                                        onAdd={() => {
                                            if (lines < 10) {
                                                calculatePriceByLinePlus(
                                                    p.id as PlanId
                                                );
                                            }
                                        }}
                                        onRemove={() => {
                                            if (lines > 0) {
                                                calculatePriceByLineMinus(
                                                    p.id as PlanId
                                                );
                                            }
                                        }}
                                        planName={p.name}
                                    />
                                ))}
                            </div>
                        </div>
                        {lines > 0 && (
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        padding: '12px',
                                        width: '100%',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        boxShadow:
                                            '6px 6px 10px 3px rgba(0,0,0,0.121)',
                                        borderRadius: '35px',
                                        margin: '15px 0px',
                                    }}
                                >
                                    <h4
                                        style={{
                                            textAlign: 'center',
                                            padding: '5px 12px',
                                            textDecoration: 'underline',
                                        }}
                                    >
                                        Price Before Discount / No Auto Pay /
                                        First Bill
                                    </h4>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ padding: '5px 0px' }}>
                                            Sub Total:{' '}
                                            <b>
                                                ${' '}
                                                <AnimatedNumber
                                                    duration={300}
                                                    formatValue={(n: number) =>
                                                        n.toFixed(0)
                                                    }
                                                    value={calculateTotalPriceBeforeTaxes()}
                                                />
                                            </b>
                                        </p>
                                        <p style={{ padding: '5px 0px' }}>
                                            Activation Fee ({lines}{' '}
                                            <i>
                                                {lines > 1 ? 'lines' : 'line'}):{' '}
                                            </i>
                                            <b>
                                                $
                                                <AnimatedNumber
                                                    duration={300}
                                                    formatValue={(n: number) =>
                                                        n.toFixed(0)
                                                    }
                                                    value={lines * 35}
                                                />
                                            </b>
                                        </p>
                                        <p
                                            style={{
                                                padding: '5px 0px',
                                                fontSize: '1.3rem',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Total before taxes:{' '}
                                            <b>
                                                $
                                                <AnimatedNumber
                                                    duration={300}
                                                    formatValue={(n: number) =>
                                                        n.toFixed(0)
                                                    }
                                                    value={
                                                        calculateTotalPriceBeforeTaxes() +
                                                        activationFee(lines) +
                                                        autoPayDiscount(
                                                            lines,
                                                            expressAutoPay ===
                                                                10
                                                                ? 10
                                                                : 0
                                                        )
                                                    }
                                                />
                                            </b>
                                        </p>
                                        <i>
                                            Note: this price above does not
                                            reflect any device payment
                                            agreement. Auto pay discount might
                                            not be applied within the first
                                            month
                                        </i>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        padding: '12px',
                                        width: '100%',
                                        flex: 1,
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between',
                                        boxShadow:
                                            '6px 6px 10px 3px rgba(0,0,0,0.121)',
                                        borderRadius: '35px',
                                    }}
                                >
                                    <div
                                        onClick={() => {
                                            resetAll();
                                            dispatch(setExpressReset());
                                        }}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',

                                            height: '100%',
                                            flex: 0.3,
                                            marginBottom: '20px',
                                            color: '#3d5bad',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Start Over
                                    </div>
                                    <div
                                        style={{
                                            flex: 0.7,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <h4
                                            style={{
                                                textAlign: 'end',
                                                padding: '5px 12px',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Price after Discount / Second or
                                            Third Bill
                                        </h4>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                padding: '12px',
                                            }}
                                        >
                                            <p style={{ padding: '5px 0px' }}>
                                                Sub Total:{' '}
                                                <span
                                                    style={{
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    {' '}
                                                    {expressAutoPay === 10 &&
                                                        '(include auto pay)'}
                                                </span>{' '}
                                                <b>
                                                    ${' '}
                                                    <AnimatedNumber
                                                        duration={300}
                                                        formatValue={(
                                                            n: number
                                                        ) => n.toFixed(0)}
                                                        value={calculateTotalPriceBeforeTaxes()}
                                                    />
                                                </b>{' '}
                                            </p>
                                            {expressAutoPay === 10 && (
                                                <p
                                                    style={{
                                                        padding: '5px 0px',
                                                    }}
                                                >
                                                    Auto Pay Discount ({lines}{' '}
                                                    <i>
                                                        {lines > 1
                                                            ? 'lines'
                                                            : 'line'}
                                                        ):{' '}
                                                    </i>
                                                    <b style={{ color: 'red' }}>
                                                        -$
                                                        {autoPayDiscount(
                                                            lines,
                                                            expressAutoPay ===
                                                                10
                                                                ? 10
                                                                : 0
                                                        )}
                                                    </b>
                                                </p>
                                            )}
                                            {expressFirstResponder && (
                                                <p
                                                    style={{
                                                        padding: '5px 0px',
                                                    }}
                                                >
                                                    First Responder Discount (
                                                    {lines}{' '}
                                                    {lines > 1
                                                        ? 'lines'
                                                        : 'line'}
                                                    ):
                                                    <b style={{ color: 'red' }}>
                                                        -$
                                                        {firstResponderDiscount(
                                                            lines,
                                                            expressFirstResponder
                                                        )}
                                                    </b>
                                                </p>
                                            )}

                                            {expressInternet &&
                                                lines > 0 &&
                                                expressInternet !==
                                                    undefined && (
                                                    <p
                                                        style={{
                                                            padding: '5px 0px',
                                                        }}
                                                    >
                                                        Mobile + Home Rewards
                                                        Discount:
                                                        <b
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            -$
                                                            {mobilePlusHomeRewards(
                                                                lines,
                                                                expressHasFios,
                                                                expressInternet!
                                                            )}
                                                        </b>
                                                    </p>
                                                )}
                                            {expressBonus > 0 &&
                                                expressHasFios && (
                                                    <p
                                                        style={{
                                                            padding: '5px 0px',
                                                        }}
                                                    >
                                                        Limited Time Bonus:{' '}
                                                        <b
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            -$
                                                            {bonusOfferDiscount(
                                                                expressHasFios,
                                                                expressBonus,
                                                                numberOfLines
                                                            )}
                                                        </b>
                                                    </p>
                                                )}

                                            {expressWhithin30Days &&
                                                expressHasFios && (
                                                    <p
                                                        style={{
                                                            padding: '5px 0px',
                                                        }}
                                                    >
                                                        Welcome Offer:{' '}
                                                        <b
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            -$
                                                            {welcomeOffer(
                                                                expressWhithin30Days,
                                                                expressHasFios,
                                                                numberOfLines
                                                            )}
                                                        </b>
                                                    </p>
                                                )}

                                            <p
                                                style={{
                                                    padding: '5px 0px',
                                                    fontSize: '1.8rem',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textDecorationStyle:
                                                        'double',
                                                }}
                                            >
                                                Total before taxes: ${' '}
                                                <b>
                                                    <AnimatedNumber
                                                        duration={300}
                                                        formatValue={(
                                                            n: number
                                                        ) => n.toFixed(0)}
                                                        value={
                                                            calculateGrandTotal(
                                                                lines,
                                                                expressFirstResponder
                                                            ) -
                                                            mobilePlusHomeRewards(
                                                                lines,
                                                                expressHasFios,
                                                                expressInternet!
                                                            ) -
                                                            welcomeOffer(
                                                                expressWhithin30Days,
                                                                expressHasFios,
                                                                numberOfLines
                                                            )! -
                                                            bonusOfferDiscount(
                                                                expressHasFios,
                                                                expressBonus,
                                                                numberOfLines
                                                            )!
                                                        }
                                                    />
                                                </b>
                                            </p>
                                            <p
                                                style={{
                                                    fontStyle: 'italic',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.6rem',
                                                    padding: '8px',
                                                    textAlign: 'right',
                                                    color: theme.DANGER,
                                                }}
                                            >
                                                Total Saving: $
                                                <AnimatedNumber
                                                    duration={300}
                                                    formatValue={(n: number) =>
                                                        n.toFixed(0)
                                                    }
                                                    value={
                                                        autoPayDiscount(
                                                            lines,
                                                            expressAutoPay ===
                                                                10
                                                                ? 10
                                                                : 0
                                                        ) +
                                                        firstResponderDiscount(
                                                            lines,
                                                            expressFirstResponder
                                                        ) +
                                                        mobilePlusHomeRewards(
                                                            lines,
                                                            expressHasFios,
                                                            expressInternet!
                                                        ) +
                                                        welcomeOffer(
                                                            expressWhithin30Days,
                                                            expressHasFios,
                                                            numberOfLines
                                                        )! +
                                                        bonusOfferDiscount(
                                                            expressHasFios,
                                                            expressBonus,
                                                            numberOfLines
                                                        )!
                                                    }
                                                />
                                            </p>
                                            <i>
                                                Note: this price above does not
                                                reflect any device payment
                                                agreement.
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </TabPanel>
            </div>
        </MainContainer>
    );
};

export default Plans;
