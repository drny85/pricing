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

import {
    decreaseLine,
    increaseLine,
    setAutoPay,
    setCurrentFiosCustomer,
    setInternet,
    setIsFirstResponder,
    setLineDiscount,
    setWithin30Days,
    setNumbersOfLines,
    setWiressDiscount,
    setPlansPrice,
    setDiscount,
    setCurrentWirelessCustomer,
    setUnlimitedData,
    dataReset,
} from '../redux/dataSlide';
import PlanCard from '../components/PlanCard';
import plansDetails from '../plansDetails';

import React, { FC, useEffect, useState } from 'react';
import { has } from 'immer/dist/internal';
import {
    fiosReset,
    setFiosAutoPay,
    setFiosFirstResponder,
    setHasWireless,
    setIsUnlimited,
    setWirelessWithin30Days,
} from '../redux/fiosData';
import fiosPlans from '../fiosPlans';
import FiosCard from '../components/FiosCard';
import TvCard from '../components/TvCard';
import tvPlans from '../tvPlans';

interface Props {
    children: React.ReactChild;
    value: number;
    index: number;
    others?: any;
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
    const [value, setValue] = useState(0);
    const {
        currentFios,
        mobilePlusHomeDiscountAmount,
        isFirstResponder,
        internet,
        numberOfLines,
        discount,
        within30Days,
        plansPrice,
        auto_pay,
    } = useAppSelector((state) => state.data);
    const {
        wirelessDiscount,
        hasWireless,
        isFiosFirstResponder,
        fiosPrice,
        fiosAutoPay,
        isUnlimited,
        wirelessWithin30Days,
    } = useAppSelector((state) => state.fiosData);
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
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
                {/* <div
                    style={{ position: 'absolute', top: '20px', right: '20px' }}
                >
                    <h3
                        style={{
                            textDecoration: 'underline',
                            fontStyle: 'italic',
                        }}
                    >
                        Note: This pricing are good only through 02/28/22
                    </h3>
                </div> */}
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
                                    backgroundColor: theme.SHADOW_COLOR,
                                    overflow: 'hidden',
                                }}
                            >
                                <div
                                    style={{
                                        flex: '0.5',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold' }}>
                                            Auto Pay
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(
                                                    setAutoPay(
                                                        auto_pay === 0 ? 10 : 0
                                                    )
                                                )
                                            }
                                            value={auto_pay}
                                            checked={auto_pay === 10}
                                        />
                                        {auto_pay === 10 && (
                                            <span
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontSize: '1.2rem',
                                                }}
                                            >
                                                ${numberOfLines * 10} saving
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold' }}>
                                            Is First Responder
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(
                                                    setIsFirstResponder(
                                                        !isFirstResponder
                                                    )
                                                )
                                            }
                                            value={isFirstResponder}
                                            checked={isFirstResponder}
                                        />
                                        {isFirstResponder && (
                                            <span
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontSize: '1.2rem',
                                                }}
                                            >
                                                $
                                                {numberOfLines === 1
                                                    ? 10
                                                    : numberOfLines === 2
                                                    ? 25
                                                    : numberOfLines === 3
                                                    ? 25
                                                    : 20}{' '}
                                                saving
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        flex: '0.5',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold' }}>
                                            Has Fios Internet?
                                        </p>
                                        <Switch
                                            onChange={(e) => {
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
                                            value={currentFios}
                                            checked={currentFios}
                                        />
                                    </div>
                                    {currentFios && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '2px',
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
                                                    }}
                                                >
                                                    Signed up after{' '}
                                                    {moment()
                                                        .subtract(30, 'day')
                                                        .format('ll')}
                                                    ?
                                                </p>

                                                <Switch
                                                    onChange={(e) =>
                                                        dispatch(
                                                            setWithin30Days(
                                                                !within30Days
                                                            )
                                                        )
                                                    }
                                                    value={within30Days}
                                                    checked={within30Days}
                                                />
                                            </div>
                                            {discount > 0 && (
                                                <p
                                                    style={{
                                                        textDecoration:
                                                            'underline',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    Saving ${discount}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {currentFios && (
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '2px',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    200 or 300 Mbps
                                                </p>
                                                <Switch
                                                    onChange={(e) =>
                                                        dispatch(
                                                            setInternet('200')
                                                        )
                                                    }
                                                    value={'200'}
                                                    checked={internet === '200'}
                                                />
                                            </div>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '4px',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    400 or 500 Mbps
                                                </p>
                                                <Switch
                                                    onChange={(e) =>
                                                        dispatch(
                                                            setInternet('400')
                                                        )
                                                    }
                                                    value={'400'}
                                                    checked={internet === '400'}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '2px',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    Gigabit Up to 940
                                                </p>
                                                <Switch
                                                    onChange={(e) =>
                                                        dispatch(
                                                            setInternet('gig')
                                                        )
                                                    }
                                                    value={'gig'}
                                                    checked={internet === 'gig'}
                                                />
                                            </div>
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
                                                Unlimited Talk & Text
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
                                            Star Over
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
                                backgroundColor: theme.SHADOW_COLOR,
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    paddingLeft: '1rem',
                                    flex: '0.5',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',

                                        flexDirection: 'column',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',

                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold' }}>
                                            Auto Pay
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(
                                                    setFiosAutoPay(
                                                        fiosAutoPay === 0
                                                            ? 10
                                                            : 0
                                                    )
                                                )
                                            }
                                            value={fiosAutoPay}
                                            checked={fiosAutoPay === 10}
                                        />
                                        {fiosAutoPay && (
                                            <span
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontSize: '1.2rem',
                                                }}
                                            >
                                                $10 saving
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',

                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold' }}>
                                            Is First Responder
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(
                                                    setFiosFirstResponder(
                                                        !isFiosFirstResponder
                                                    )
                                                )
                                            }
                                            value={isFiosFirstResponder}
                                            checked={isFiosFirstResponder}
                                        />
                                        {isFiosFirstResponder && (
                                            <span
                                                style={{
                                                    textDecoration: 'underline',
                                                    fontSize: '1rem',
                                                }}
                                            >
                                                Up to $15 saving
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    flex: '0.5',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '12px',
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold' }}>
                                            Has Verizon Wireless?
                                        </p>
                                        <Switch
                                            onChange={(e) => {
                                                const res = dispatch(
                                                    setHasWireless(!hasWireless)
                                                );
                                            }}
                                            value={hasWireless}
                                            checked={hasWireless}
                                        />
                                    </div>
                                    {hasWireless && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '2px',
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
                                                    }}
                                                >
                                                    Unlimited Data?
                                                </p>

                                                <Switch
                                                    onChange={(e) =>
                                                        dispatch(
                                                            setIsUnlimited(
                                                                !isUnlimited
                                                            )
                                                        )
                                                    }
                                                    value={isUnlimited}
                                                    checked={isUnlimited}
                                                />
                                            </div>
                                            {wirelessDiscount > 0 && (
                                                <p
                                                    style={{
                                                        textDecoration:
                                                            'underline',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    Saving ${wirelessDiscount}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {hasWireless && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
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
                                                }}
                                            >
                                                Signed Up For Wireless After{' '}
                                                {moment()
                                                    .subtract(30, 'day')
                                                    .format('ll')}
                                            </p>

                                            <Switch
                                                onChange={(e) =>
                                                    dispatch(
                                                        setWirelessWithin30Days(
                                                            !wirelessWithin30Days
                                                        )
                                                    )
                                                }
                                                value={wirelessWithin30Days}
                                                checked={wirelessWithin30Days}
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
                                    Star Over
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
            </div>
        </MainContainer>
    );
};

export default Plans;
