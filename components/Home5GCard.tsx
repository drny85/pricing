import { Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../redux/hooks/reduxHooks';
import AnimatedNumber from 'animated-number-react';

type Props = {
    id: string;
    title: string;
    price: number;
    subtitle: string;
    details: string[];
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const Home5GCard = ({ title, id, subtitle, details, price }: Props) => {
    const theme = useAppSelector((state) => state.theme);
    const {
        home5GAutoPay,
        wirelessPlan,
        home5GHasWireless,
        home5GACPCustomer,
    } = useAppSelector((state) => state.home5G);

    const discount = (): number => {
        if (
            (wirelessPlan === 'do_more' ||
                wirelessPlan === 'get_more' ||
                wirelessPlan === 'one_unlimited' ||
                wirelessPlan === 'play_more') &&
            home5GHasWireless
        )
            return 2;

        return 1;
    };

    const ACPdiscount = (): number => {
        return home5GACPCustomer && id === 'home' && discount() === 1
            ? 30
            : home5GACPCustomer && id !== 'home' && discount() === 1
            ? 30
            : 0;
    };
    const autopayDiscount = (): number => {
        return home5GAutoPay && wirelessPlan !== undefined && discount() === 2
            ? 5
            : home5GAutoPay && wirelessPlan === undefined
            ? 10
            : home5GAutoPay
            ? 10
            : 0;
    };

    return (
        <Card
            style={{
                backgroundColor: theme.CARD_BACKGROUND,
                minWidth: '15rem',
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
                <h1>
                    $
                    <AnimatedNumber
                        duration={300}
                        formatValue={(n: number) => n.toFixed(2)}
                        value={
                            home5GACPCustomer &&
                            discount() === 2 &&
                            id === 'home'
                                ? 0
                                : price / discount() -
                                  autopayDiscount() -
                                  ACPdiscount()
                        }
                    />
                </h1>

                {details.map((d, index) => (
                    <p
                        style={{
                            padding: '8px 4px',

                            textDecorationStyle: 'solid',
                        }}
                        key={index}
                    >
                        {d}
                    </p>
                ))}
            </CardContent>
        </Card>
    );
};

export default Home5GCard;
