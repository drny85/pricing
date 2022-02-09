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
                <p
                    style={{
                        fontSize: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {text}
                </p>

                <Switch onChange={onChange} value={value} checked={checked} />
            </div>
            <div>
                {checked && saving && (
                    <p
                        style={{
                            textDecoration: 'underline',
                            fontSize: '1rem',
                        }}
                    >
                        ${savingText} saving
                    </p>
                )}
            </div>
        </div>
    );
};

export default Switcher;
