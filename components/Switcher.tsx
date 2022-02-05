import { Switch } from '@mui/material';
import { FC } from 'react';

interface Props {
    onChange: () => void;
    value: string | boolean | number;
    checked: boolean;
    text: string;
    savingText?: string | number;
    saving?: boolean;
}

const Switcher: FC<Props> = ({
    onChange,
    value,
    checked,
    text,
    saving,
    savingText,
}) => {
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
            {checked && saving && (
                <span
                    style={{
                        textDecoration: 'underline',
                        fontSize: '1.2rem',
                    }}
                >
                    ${savingText} saving
                </span>
            )}
        </div>
    );
};

export default Switcher;
