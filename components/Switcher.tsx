import { Switch } from '@mui/material';
import { FC } from 'react';

interface Props {
    onChange: () => void;
    value: string | boolean | number;
    checked: boolean;
    text: string | React.ReactChild;
    savingText?: string | number;
    saving?: boolean;
    acp?: boolean;
}

const Switcher: FC<Props> = ({
    onChange,
    value,
    checked,
    text,
    saving,
    savingText,
    acp,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                position: 'relative',
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
            {acp && (
                <div
                    style={{
                        width: '90%',
                        height: '2px',
                        backgroundColor: '#b66b6b',
                        position: 'absolute',
                        top: '50%',
                        left: '10px',
                        right: '10px',
                        transform: 'translateY(-50%)',
                    }}
                ></div>
            )}
        </div>
    );
};

export default Switcher;
