import { FC } from 'react';
import { useAppSelector } from '../redux/hooks/reduxHooks';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AnimatedNumber from 'animated-number-react';
interface Props {
    planName: string;
    price: number;
    lines: number;
    onAdd: () => void;
    onRemove: () => void;
}

const PlanLine: FC<Props> = ({ planName, price, lines, onAdd, onRemove }) => {
    const theme = useAppSelector((state) => state.theme);
    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                padding: '12px',
                width: '100%',
                boxShadow: '12px 10px 8px rgba(0,0,0,0.125)',
                backgroundColor: theme.BACKGROUND_COLOR,
                margin: '10px 0px',
                borderRadius: '15px',
            }}
        >
            <div style={{ display: 'flex', flex: 0.33, alignItems: 'center' }}>
                <h2 style={{ paddingLeft: '10px' }}>{planName}</h2>
            </div>
            <div
                style={{
                    display: 'flex',
                    flex: 0.33,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: '70%',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        display: 'flex',
                        backgroundColor: theme.CARD_BACKGROUND,
                        borderRadius: '35px',
                        boxShadow: '6px 8px 6px rgba(0,0,0,0.136)',
                    }}
                >
                    <div
                        onClick={onRemove}
                        style={{ cursor: 'pointer', padding: '8px' }}
                    >
                        <RemoveIcon fontSize="large" />
                    </div>
                    <div>
                        <h2>{lines}</h2>
                    </div>
                    <div
                        onClick={onAdd}
                        style={{ cursor: 'pointer', padding: '8px' }}
                    >
                        <AddIcon fontSize="large" />
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flex: 0.33,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h2>
                    ${' '}
                    <AnimatedNumber
                        duration={300}
                        formatValue={(n: number) => n.toFixed(0)}
                        value={Math.fround(price)}
                    />
                </h2>
            </div>
        </div>
    );
};

export default PlanLine;
