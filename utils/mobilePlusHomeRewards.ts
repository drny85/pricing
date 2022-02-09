export const mobilePlusHomeRewards = (
    totalLines: number,
    hasFios: boolean,
    internetSpeed: '200' | '400' | 'gig'
) => {
    if (totalLines === 0 || !hasFios) return 0;

    switch (true) {
        case hasFios && internetSpeed === 'gig':
            return 10;
        case hasFios && internetSpeed === '400':
            return 5;
        case hasFios && internetSpeed === '200':
            return 5;

        default:
            return 0;
    }
};

export const bonusOfferDiscount = (
    hasFios: boolean,
    bonus: number,
    totalLines: number
) => {
    if (totalLines === 0 || !hasFios) return 0;

    if (hasFios) {
        return bonus;
    } else {
        return 0;
    }
};

export const welcomeOffer = (
    within30: boolean,
    hasFios: boolean,
    totalLines: number
) => {
    if (totalLines === 0 || !hasFios) return 0;

    if (hasFios && within30 && totalLines > 0) {
        return 5;
    } else {
        return 0;
    }
};
