import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MainContainer from '../../components/MainContainer';
import {
    setCurrentFiosCustomer,
    setCurrentWirelessCustomer,
    setInternet,
} from '../../redux/dataSlide';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';

const Home = () => {
    const { currentFios, currentWireless, interestedOn, internet } =
        useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <MainContainer title="Current Service">
            <div>
                <h2 style={{ padding: '20px' }}>
                    Thank you for your interest in{' '}
                    {interestedOn === 'wireless'
                        ? 'Wireless'
                        : interestedOn === 'fios'
                        ? 'Fios'
                        : 'Our Services'}
                </h2>

                <div
                    className="card"
                    style={{ marginTop: '15px', padding: '20px' }}
                >
                    {interestedOn === 'wireless' && (
                        <>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Current Fios Customer?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={
                                        currentFios === undefined
                                            ? undefined
                                            : currentFios === true
                                            ? 'yes'
                                            : currentFios === false
                                            ? 'no'
                                            : null
                                    }
                                    label="Are you a current Fios Customer"
                                    onChange={(e) => {
                                        dispatch(
                                            setCurrentFiosCustomer(
                                                e.target.value !== undefined &&
                                                    e.target.value === 'yes'
                                                    ? true
                                                    : false
                                            )
                                        );
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        defaultChecked
                                        defaultValue={undefined}
                                    >
                                        None
                                    </MenuItem>
                                    <MenuItem value={'yes'}>
                                        Yes, I am a Fios Customer
                                    </MenuItem>
                                    <MenuItem value={'no'}>
                                        No, I do not have Fios
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {currentFios ? (
                                <div style={{ marginTop: '25px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            What is your internet speed?
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={internet}
                                            label="What Internet Speed?"
                                            onChange={(e) => {
                                                dispatch(
                                                    setInternet(e.target.value)
                                                );
                                            }}
                                        >
                                            <MenuItem
                                                disabled
                                                defaultChecked
                                                defaultValue={undefined}
                                            >
                                                None
                                            </MenuItem>
                                            <MenuItem value={'200'}>
                                                200 / 300 Mbps
                                            </MenuItem>
                                            <MenuItem value={'400'}>
                                                400 / 500 Mbps
                                            </MenuItem>
                                            <MenuItem value={'gig'}>
                                                Gigabit
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            ) : null}
                        </>
                    )}

                    {interestedOn === 'fios' && (
                        <div style={{ marginTop: '2rem' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Current Wireless Customer?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={
                                        currentWireless === undefined
                                            ? undefined
                                            : currentWireless === true
                                            ? 'yes'
                                            : currentWireless === false
                                            ? 'no'
                                            : null
                                    }
                                    label="Are you a current Wireless Customer"
                                    onChange={(e) => {
                                        dispatch(
                                            setCurrentWirelessCustomer(
                                                e.target.value !== undefined &&
                                                    e.target.value === 'yes'
                                                    ? true
                                                    : false
                                            )
                                        );
                                    }}
                                >
                                    <MenuItem
                                        disabled
                                        defaultChecked
                                        defaultValue={undefined}
                                    >
                                        None
                                    </MenuItem>
                                    <MenuItem value={'yes'}>
                                        Yes, I am a Wireless Customer
                                    </MenuItem>
                                    <MenuItem value={'no'}>
                                        No, I do not have Wireless
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    )}

                    <div
                        style={{
                            maxWidth: '60%',

                            alignSelf: 'center',
                            margin: '2rem auto',
                        }}
                    >
                        {interestedOn !== undefined && (
                            <Button
                                onClick={() => router.push('/plans')}
                                fullWidth
                                variant="contained"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Home;
