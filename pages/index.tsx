import { Button, ButtonGroup, Switch } from '@mui/material';
import Head from 'next/head';
import MainContainer from '../components/MainContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment from 'moment';
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
    setPlansPrice,
    setDiscount,
} from '../redux/dataSlide';
import PlanCard from '../components/PlanCard';
import plansDetails from '../plansDetails';

import { useEffect, useState } from 'react';

const Plans = () => {
    const [loading, setLoading] = useState(true);
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
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

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
                    margin: '0 auto',
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0px 20px',
                }}
            >
                <div style={{position:'absolute', top:'20px', right:'20px'}}>
                    <h3 style={{textDecoration:'underline',fontStyle:'italic' }}>Note: This pricing are good only through 02/28/22</h3>
                </div>
                <div>
                    <h2
                        style={{ textAlign: 'center', marginBottom: '1rem' }}
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
                                <p style={{ fontWeight: 'bold' }}>Auto Pay</p>
                                <Switch
                                    onChange={(e) =>
                                        dispatch(
                                            setAutoPay(auto_pay === 0 ? 10 : 0)
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
                                            setCurrentFiosCustomer(!currentFios)
                                        );
                                        if (!res.payload) {
                                            dispatch(setInternet(undefined));
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
                                        <p style={{ fontWeight: 'bold' }}>
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
                                                textDecoration: 'underline',
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
                                        <p style={{ fontWeight: 'bold' }}>
                                            200 or 300 Mbps
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(setInternet('200'))
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
                                        <p style={{ fontWeight: 'bold' }}>
                                            400 or 500 Mbps
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(setInternet('400'))
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
                                        <p style={{ fontWeight: 'bold' }}>
                                            Gigabit Up to 940
                                        </p>
                                        <Switch
                                            onChange={(e) =>
                                                dispatch(setInternet('gig'))
                                            }
                                            value={'gig'}
                                            checked={internet === 'gig'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

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
                                        dispatch(decreaseLine(numberOfLines))
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
                                                theme.mode === 'dark'
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
                                        dispatch(increaseLine(numberOfLines))
                                    }
                                >
                                    <AddIcon />
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div
                            style={{
                                display: 'inline-flex',
                                width: '100%',
                                margin: '0 auto',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
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
                    <h2 style={{ textAlign: 'center' }}>All plans include</h2>
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
                                    Mexico & Canada talk, text & data
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
                                <p style={{ paddingLeft: '6px' }}>4G LTE</p>
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
                </div>
            </div>
        </MainContainer>
    );
};

export default Plans;
