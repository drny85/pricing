import { Line } from '../redux/wirelessSlide';

export const byodSavings = (lines: Line[]): number =>
    lines
        .map((line) =>
            line.byod && line.name === 'Unlimited Plus'
                ? { discount: 540 / 36 }
                : line.byod && line.name === 'Unlimited Welcome'
                ? { discount: 180 / 36 }
                : { discount: 0 }
        )
        .reduce((acc, line) => acc + line.discount, 0);
