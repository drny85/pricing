import { Card, CardContent, CardHeader } from '@mui/material';
import React, { FC, useState } from 'react';
import { setDiscount } from '../redux/dataSlide';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';
import { setFiosPrices } from '../redux/fiosData';

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
    // const {
    //     auto_pay,
    //     numberOfLines,
    //     internet,
    //     within30Days,
    //     mobilePlusHomeDiscountAmount,
    // } = useAppSelector((state) => state.data);
    const {
        fiosAutoPay,
        isFiosFirstResponder,
        hasWireless,
        wirelessDiscount,
        wirelessWithin30Days,
        wirelessBonus,
        isUnlimited,
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
    const mobilePlusHomeDiscount = () => {
        if (hasWireless && isUnlimited) {
            if (id === 'fiosGig') return 10 + wirelessBonus;
            if (id === 'fios400') return 5 + wirelessBonus;
            if (id === 'fios200') return 5 + wirelessBonus;
        } else if (hasWireless && !isUnlimited) {
            if (id === 'fiosGig') return 10;
            if (id === 'fios400') return 5;
            if (id === 'fios200') return 5;
        } else {
            return 0;
        }
    };

    const wirelessWithin30 = () => {
        if (wirelessWithin30Days) {
            return 5;
        }
        return 0;
    };

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
                    {/* <h1>
                        {Math.fround(
                            price -
                                auto_pay -
                                firstResponderDiscount()! -
                                mobilePlusHomeDiscount()!
                        ).toFixed(2)}
                    </h1> */}
                    <h1>
                        <AnimatedNumber
                            duration={300}
                            formatValue={(n: number) => n.toFixed(2)}
                            value={Math.fround(
                                price -
                                    fiosAutoPay -
                                    mobilePlusHomeDiscount()! -
                                    firstResponderDiscount()! -
                                    wirelessWithin30()
                            ).toFixed(2)}
                        />
                    </h1>

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
                            padding: '8px 4px',
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
