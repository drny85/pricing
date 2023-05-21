import { Box, Button, Container, Grid, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import MainContainer from '../components/MainContainer';

import GridItem from '../components/GridItem';
import MyPlanCard from '../components/MyPlanCard';
import TopSwicher from '../components/TopSwitch';
import { useAppDispatch, useAppSelector } from '../redux/hooks/reduxHooks';

import { Perk } from '../components/PerksView';
import { perks } from '../perks';
import { Line, setLinesData } from '../redux/wirelessSlide';

import AnimateElementIf from '../components/AnimateElementIf';
import LineItem from '../components/LineItem';
import LinesSelector from '../components/LinesSelector';
import ReviewModal from '../components/modals/ReviewModal';
import TotalView from '../components/TotalView';
import PerkAlertModal from '../components/modals/PerkAlertModal';
import { toogleHoverPlan } from '../redux/wirelessSlide';

const PREMIUM_BYOD_VALUE = 540 / 36;
const NON_PREMIUM_BYOD_VALUE = 180 / 36;

const MyPlan = () => {
    const theme = useAppSelector((state) => state.theme);
    const [unlimitedPlus, setUnlimitedPlus] = React.useState(95);
    const [unlimitedWelcome, setUnlimitedWelcome] = React.useState(75);
    const [getStarted, setGetStarted] = React.useState(false);
    const [showPerkAlertModal, setShowPerkAlertModal] = React.useState(false);
    const [perkToAdd, setPerkToAdd] = useState<{ perK: Perk; line: Line }>();

    const lines = useAppSelector((state) => state.wireless.lines);

    const {
        expressAutoPay,
        hoverPlan,
        expressHasFios,
        expressFirstResponder,
        expressInternet,
    } = useAppSelector((state) => state.wireless);
    const dispatch = useAppDispatch();
    const deleteLine = (id: string) => {
        const newLines = lines.filter((line) => line.id !== id);
        dispatch(setLinesData(newLines));
    };

    const removeAllPerks = () => {
        const newLines = lines.map((line) => {
            return {
                ...line,
                price: calculatePrice(line),
                perks: [...perks],
            };
        });
        dispatch(setLinesData(newLines));
    };

    const canPerkBeAdded = (perk: Perk): boolean => {
        const exists = lines
            .map((l) => l.perks)
            .flatMap((p) => p)
            .find(
                (i) =>
                    i.name.toLowerCase() === perk.name.toLowerCase() &&
                    i.selected
            );

        if (!exists) return true;
        return !exists.sharabled;
    };

    const addPerk = (line: Line, perk: Perk) => {
        const newPerks = line.perks.map((p) => {
            if (p.name.toLowerCase() === perk.name.toLowerCase()) {
                return {
                    ...p,
                    selected: !p.selected,
                };
            }
            return p;
        });

        const newLines = lines.map((l) => {
            if (l.id === line.id) {
                return {
                    ...l,
                    price: calculatePrice({ ...l, perks: newPerks }),
                    perks: newPerks,
                };
            }
            return l;
        });

        dispatch(setLinesData(newLines));
    };

    const cantAddPerkWarning = (perk: Perk, line: Line) => {
        setPerkToAdd({ perK: perk, line: line });
        setShowPerkAlertModal(true);
    };

    const onSelectPerk = (perk: Perk, line: Line) => {
        const exists = lines.find((l) => l.id === line.id);
        if (!exists) return;
        const canBeAdded = canPerkBeAdded(perk);

        if (canBeAdded) {
            addPerk(line, perk);
        } else {
            cantAddPerkWarning(perk, line);
        }
    };

    const onSwitchBYOD = (id: string) => {
        const newLines = lines.map((line) => {
            if (line.id === id) {
                return {
                    ...line,
                    price: calculatePrice({ ...line, byod: !line.byod }),
                    byod: !line.byod,
                };
            }
            return line;
        });
        // @ts-ignore

        dispatch(setLinesData(newLines));
    };

    const onSwitchLine = (id: string) => {
        const newLines = lines.map((line) => {
            const n = {
                ...line,
                name:
                    line.name === 'Unlimited Plus'
                        ? 'Unlimited Welcome'
                        : ('Unlimited Plus' as typeof line.name),
            };
            if (line.id === id) {
                return {
                    ...line,
                    price: calculatePrice(n),
                    name:
                        line.name === 'Unlimited Plus'
                            ? 'Unlimited Welcome'
                            : ('Unlimited Plus' as typeof line.name),
                };
            }
            return line;
        });

        dispatch(setLinesData(newLines));
    };

    const onSwitchAllLines = (name: Line['name']) => {
        const newLines = lines.map((line) => {
            const n = {
                ...line,
                name: name,
            };

            return {
                ...line,
                price: calculatePrice(n),
                name: name,
            };
        });

        dispatch(setLinesData(newLines));
    };

    const perksTotalAll = (): number => {
        return lines
            .map((line) =>
                line.perks.map((perk) => (perk.selected ? perk.price : 0))
            )
            .flat()
            .reduce((acc, perks) => acc + perks, 0);
    };

    const perksTotal = (line: Line): number => {
        return line.perks
            .map((i) => (i.selected ? i.price : 0))
            .reduce(
                (acc, p) => acc + p,

                0
            );
    };

    const mobilePlusHome = (line: Line): number => {
        if (
            expressInternet === 'gig' &&
            expressHasFios &&
            line.name === 'Unlimited Plus'
        ) {
            return 10;
        } else if (
            expressHasFios &&
            expressInternet === 'gig' &&
            line.name === 'Unlimited Welcome'
        ) {
            return 5;
        } else if (expressHasFios && expressInternet !== 'gig') {
            return 5;
        } else {
            return 0;
        }
    };

    const calculatePrice = useCallback(
        (line: Line): number => {
            switch (line.name) {
                case 'Unlimited Welcome':
                    return (
                        (lines.length === 1
                            ? 75
                            : lines.length === 2
                            ? 65
                            : lines.length === 3
                            ? 50
                            : lines.length === 4
                            ? 40
                            : lines.length >= 5
                            ? 40
                            : 0) -
                        expressAutoPay -
                        mobilePlusHome(line) -
                        (line.byod ? NON_PREMIUM_BYOD_VALUE : 0) +
                        perksTotal(line)
                    );
                case 'Unlimited Plus':
                    return (
                        (lines.length === 1
                            ? 90
                            : lines.length === 2
                            ? 80
                            : lines.length === 3
                            ? 65
                            : lines.length === 4
                            ? 55
                            : lines.length >= 5
                            ? 55
                            : 0) -
                        expressAutoPay -
                        mobilePlusHome(line) -
                        (line.byod ? PREMIUM_BYOD_VALUE : 0) +
                        perksTotal(line)
                    );
                default:
                    return 0;
            }
        },
        [
            lines,
            expressAutoPay,
            expressFirstResponder,
            expressInternet,
            expressHasFios,
        ]
    );

    useEffect(() => {
        const newLines = lines.map((line) => {
            return {
                ...line,
                price: calculatePrice(line),
            };
        });

        dispatch(setLinesData(newLines));
    }, [
        lines.length,
        expressAutoPay,
        expressFirstResponder,
        expressInternet,
        expressHasFios,
    ]);

    useEffect(() => {
        if (expressAutoPay === 0) {
            setUnlimitedPlus(95);
            setUnlimitedWelcome(75);
        } else if (expressAutoPay === 10) {
            setUnlimitedPlus(85);
            setUnlimitedWelcome(65);
        }
    }, [expressAutoPay]);
    return (
        <MainContainer>
            <div
                style={{
                    backgroundColor: theme.BACKGROUND_COLOR,
                    margin: '0 auto',
                    width: '100vw',
                    maxWidth: '880px',
                    position: 'relative',
                    height: '100%',
                }}
            >
                <AnimateElementIf show={lines.length > 0}>
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <Button
                            variant="text"
                            onClick={() => {
                                setGetStarted(!getStarted);
                            }}
                        >
                            Go Back
                        </Button>
                        <h2
                            style={{
                                margin: '0.8rem auto',
                                textAlign: 'center',
                            }}
                        >
                            My Plan
                        </h2>
                    </Box>
                    <TopSwicher />
                </AnimateElementIf>

                <AnimatePresence>
                    {!getStarted && (
                        <motion.div
                            style={{
                                //height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                margin: '1rem auto',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Container maxWidth={'md'}>
                                <Grid
                                    gap={3}
                                    container
                                    justifyContent={'center'}
                                    direction={{
                                        xs: 'column',
                                        md: 'row',
                                        lg: 'row',
                                    }}
                                    style={{ marginTop: '2rem' }}
                                >
                                    <MyPlanCard
                                        selected={hoverPlan === 'plus'}
                                        onClick={() =>
                                            dispatch(toogleHoverPlan('plus'))
                                        }
                                        title="Unlimited Plus"
                                        price={unlimitedPlus}
                                        description="Our reliable, fastest 5G, up to 10x faster than 4G LTE. No matter how much you use."
                                    />

                                    <MyPlanCard
                                        selected={hoverPlan === 'welcome'}
                                        onClick={() =>
                                            dispatch(toogleHoverPlan('welcome'))
                                        }
                                        title="Unlimited Welcome"
                                        price={unlimitedWelcome}
                                        description="Our reliable, fast 5G."
                                    />
                                </Grid>
                                {hoverPlan === 'plus' && (
                                    <div>
                                        <Grid
                                            sx={{
                                                width: '100%',
                                                boxShadow:
                                                    '0px 0px 5px 6px rgba(0, 0, 0, 0.25)',
                                                borderRadius: '0.5rem',
                                                marginTop: '1rem',
                                            }}
                                            container
                                            bgcolor={theme.BACKGROUND_COLOR}
                                        >
                                            <GridItem
                                                title="5G"
                                                subtitle="5G Ultra Wideband"
                                            />
                                            <GridItem
                                                title="Unlimited Premium Data"
                                                subtitle="Included"
                                            />
                                            <GridItem
                                                title="Mobile Hotspot"
                                                subtitle="30 GB"
                                            />
                                            <GridItem
                                                title="Home Internet"
                                                subtitle="Starting at $25/mo"
                                            />
                                            <GridItem
                                                title="Device Savings"
                                                subtitle="Eligible"
                                            />
                                            <GridItem
                                                title="Bring Your Own Device"
                                                subtitle="Up to $540 promo credit"
                                            />
                                            <GridItem
                                                title="Connected Device Plan"
                                                subtitle="Up to 50% off"
                                            />
                                            <GridItem
                                                title="Price Guarantee"
                                                subtitle="3 years"
                                            />
                                        </Grid>
                                    </div>
                                )}
                                {hoverPlan === 'welcome' && (
                                    <div>
                                        <Grid
                                            sx={{
                                                width: '100%',
                                                boxShadow:
                                                    '0px 0px 5px 6px rgba(0, 0, 0, 0.25)',
                                                borderRadius: '0.5rem',
                                                marginTop: '1rem',
                                            }}
                                            container
                                            bgcolor={theme.BACKGROUND_COLOR}
                                        >
                                            <GridItem
                                                title="5G"
                                                subtitle="5G"
                                            />
                                            <GridItem
                                                title="Unlimited Premium Data"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Mobile Hotspot"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Home Internet"
                                                subtitle="Starting at $40/mo"
                                            />
                                            <GridItem
                                                title="Device Savings"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Bring Your Own Device"
                                                subtitle="Up to $180 promo credit"
                                            />
                                            <GridItem
                                                title="Connected Device Plan"
                                                subtitle="-"
                                            />
                                            <GridItem
                                                title="Price Guarantee"
                                                subtitle="-"
                                            />
                                        </Grid>
                                    </div>
                                )}
                            </Container>
                            <div
                                style={{
                                    marginTop: '2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    onClick={() => setGetStarted(true)}
                                    variant="contained"
                                >
                                    Get Started!
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {getStarted && (
                        <motion.div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                margin: '0 auto',
                                height: '100%',
                                width: '100%',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <AnimatePresence>
                                {true && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -1000,
                                        }} // Initial position of the element
                                        animate={{
                                            opacity: 1,
                                            y: lines.length > 0 ? 0 : '30vh',
                                        }} // Final position of the element (center of the screen)
                                        transition={{
                                            duration: 0.7,
                                            type: 'tween',
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -1000,
                                            decelerate: 0.5,
                                        }} // Final position of the element (center of the screen)
                                    >
                                        <Box>
                                            <p
                                                style={{
                                                    fontSize: '1.5rem',
                                                    textAlign: 'center',
                                                    margin: '1rem',
                                                }}
                                            >
                                                How Many Lines
                                            </p>
                                            <LinesSelector />
                                        </Box>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <AnimateElementIf show={perksTotalAll() > 0}>
                                    <Button onClick={removeAllPerks}>
                                        Remove Perks
                                    </Button>
                                </AnimateElementIf>
                            </div>

                            <div>
                                <AnimateElementIf show={lines.length > 1}>
                                    <Grid
                                        container
                                        mt={2}
                                        direction={{ xs: 'column', sm: 'row' }}
                                        alignSelf={'center'}
                                        justifyContent={{
                                            xs: 'center',
                                            sm: 'space-evenly',
                                        }}
                                    >
                                        <Grid item>
                                            <Tooltip
                                                placement="top-start"
                                                title="Switch All LInes to Unlimited Plus"
                                            >
                                                <Button
                                                    onClick={() =>
                                                        onSwitchAllLines(
                                                            'Unlimited Plus'
                                                        )
                                                    }
                                                    color="warning"
                                                    variant="text"
                                                >
                                                    Switch To Unlimited PLus
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip
                                                placement="top-end"
                                                title="Switch All LInes to Unlimited Plus"
                                            >
                                                <Button
                                                    onClick={() =>
                                                        onSwitchAllLines(
                                                            'Unlimited Welcome'
                                                        )
                                                    }
                                                    color="warning"
                                                    variant="text"
                                                >
                                                    Switch To Unlimited Welcome
                                                </Button>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </AnimateElementIf>

                                {lines.map((line, index) => {
                                    return (
                                        <LineItem
                                            lineNumber={index + 1}
                                            onSwitchBYOD={onSwitchBYOD}
                                            onSwitch={onSwitchLine}
                                            onClick={deleteLine}
                                            onSelectPerk={(perk: Perk) =>
                                                onSelectPerk(perk, line)
                                            }
                                            key={index}
                                            line={line}
                                        />
                                    );
                                })}
                            </div>
                            <AnimatePresence>
                                {lines.length > 0 && (
                                    <motion.div
                                        style={{ width: '100%' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <TotalView lines={lines} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ReviewModal />
            <PerkAlertModal
                open={showPerkAlertModal}
                onClose={() => setShowPerkAlertModal(false)}
                perk={perkToAdd?.perK!}
                onSubmitted={() => {
                    if (!perkToAdd) return;

                    addPerk(perkToAdd.line, perkToAdd.perK);
                    setShowPerkAlertModal(false);
                    //setPerkToAdd(undefined);
                }}
            />
        </MainContainer>
    );
};

export default MyPlan;
