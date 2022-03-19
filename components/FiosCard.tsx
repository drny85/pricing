import { Card, CardContent, CardHeader } from '@mui/material';
import React, { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';

interface Props {
    id: string;
    title: string;
    details: string[];
    price: number;
    subtitle?: string;
}
const FiosCard: FC<Props> = ({ title, details, price, id, subtitle }) => {
    const dispatch = useAppDispatch();

    const theme = useAppSelector((state) => state.theme);

    const {
        fiosAutoPay,
        isFiosFirstResponder,
        hasWireless,
        wirelessWithin30Days,
        isUnlimited,
        acpCustomer,
    } = useAppSelector((state) => state.fiosData);

    const firstResponderDiscount = () => {
        if (isFiosFirstResponder) {
            if (id === 'fiosGig') return 15;
            if (id === 'fios400') return 10;
            if (id === 'fios200') return 5;
        } else {
            return 0;
        }
    };

    const acpDiscountTotal = (): number => {
        if (acpCustomer) {
            if (id === 'fiosGig') return 50;
            if (id === 'fios400') return 50;
            if (id === 'fios200') return 49.99;
        }
        return 0;
    };

    const welcomeOffer = (hasWireless: boolean, within30: boolean) => {
        if (hasWireless && within30) {
            return 5;
        }
        return 0;
    };
    const mobilePlusHomeDiscount = () => {
        if (hasWireless && isUnlimited) {
            if (id === 'fiosGig') return 10;
            return 5;
        } else if (hasWireless && !isUnlimited) {
            if (id === 'fiosGig') 5;
            return 0;
        } else {
            return 0;
        }
    };

    const currentBonusOffer = (hasWireless: boolean, within30Days: boolean) => {
        if (hasWireless && isUnlimited && within30Days) {
            return 0;
        } else if (hasWireless && isUnlimited && !within30Days) {
            if (id === 'fiosGig') {
                return 20;
            } else if (id === 'fios200' || id === 'fios400') {
                return 15;
            }
        } else {
            return 0;
        }
    };
    console.log(mobilePlusHomeDiscount());

    return (
        <Card
            style={{
                backgroundColor: theme.CARD_BACKGROUND,
                minWidth: '12rem',
                width: '100%',
            }}
        >
            <CardHeader
                title={title}
                style={{
                    color: theme.TEXT_COLOR,
                    fontWeight: 'bold',
                }}
            />
            <CardContent>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                    }}
                >
                    <div>
                        {(fiosAutoPay === 10 || hasWireless || acpCustomer) && (
                            <h3
                                style={{
                                    textDecoration: 'line-through',
                                    textDecorationThickness: 1,
                                    color: '#964c43',
                                }}
                            >
                                was ${price}
                            </h3>
                        )}

                        <h1>
                            {fiosAutoPay === 10 && (
                                <i
                                    style={{
                                        fontSize: '18px',
                                        paddingRight: '6px',
                                    }}
                                >
                                    now
                                </i>
                            )}
                            ${' '}
                            <AnimatedNumber
                                duration={300}
                                formatValue={(n: number) => n.toFixed(2)}
                                value={
                                    id === 'fios200' && acpCustomer
                                        ? 0
                                        : Math.fround(
                                              price -
                                                  fiosAutoPay -
                                                  mobilePlusHomeDiscount()! -
                                                  firstResponderDiscount()! -
                                                  currentBonusOffer(
                                                      hasWireless,
                                                      wirelessWithin30Days
                                                  )! -
                                                  welcomeOffer(
                                                      hasWireless,
                                                      wirelessWithin30Days
                                                  ) -
                                                  acpDiscountTotal()
                                          ).toFixed(2)
                                }
                            />
                        </h1>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <p
                            style={{
                                paddingLeft: '8px',
                                fontStyle: 'italic',
                                fontSize: '13px',
                            }}
                        >
                            / Per month
                        </p>
                        <p
                            style={{
                                paddingLeft: '8px',
                                fontStyle: 'italic',
                                fontSize: '13px',
                            }}
                        >
                            {' '}
                            Plus taxes & fee
                        </p>
                    </div>
                </div>
                <div>
                    <h4 style={{ padding: '6px' }}>{subtitle}</h4>
                </div>

                {details.map((d, index) => (
                    <p
                        style={{
                            textDecoration:
                                id !== 'fiosGig' &&
                                acpCustomer &&
                                index === details.length - 1
                                    ? 'line-through'
                                    : 'none',
                            padding: '8px 4px',
                            textDecorationColor: '#b63535',
                            textDecorationThickness: 2,
                            textDecorationStyle: 'solid',
                            fontWeight:
                                index === 0 ||
                                (index === details.length - 1 &&
                                    d.includes('$99'))
                                    ? 'bold'
                                    : undefined,
                        }}
                        key={d}
                    >
                        {d}
                    </p>
                ))}
            </CardContent>
        </Card>
    );
};

export default FiosCard;
