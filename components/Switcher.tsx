import { Switch } from '@mui/material';
import { FC } from 'react';

interface Props {
    onChange: () => void;
    value: string | boolean;
    checked: boolean;
    text: string;
}

const Switcher: FC<Props> = ({ onChange, value, checked, text }) => {
    return (
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
                {text}
            </p>

            <Switch onChange={onChange} value={value} checked={checked} />
        </div>
    );
};

export default Switcher;
