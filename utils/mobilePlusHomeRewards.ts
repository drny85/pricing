import moment from 'moment';

export const mobilePlusHomeRewards = (
    totalLines: number,
    hasFios: boolean,
    within30: boolean,
    bonusOffer: number,
    internetSpeed: '200' | '400' | 'gig'
) => {
    if (totalLines === 0 || !hasFios) return 0;

    switch (true) {
        case hasFios && internetSpeed === 'gig':
            if (within30) {
                return bonusOffer + 10 + 5;
            }
            return bonusOffer + 10;
        case hasFios && internetSpeed === '400':
            if (within30) {
                return bonusOffer + 5 + 5;
            }
            return bonusOffer + 5;
        case hasFios && internetSpeed === '200':
            if (within30) {
                return bonusOffer + 5 + 5;
            }
            return bonusOffer + 5;

        default:
            return 0;
    }
};
