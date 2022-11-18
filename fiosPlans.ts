import moment from 'moment';
const isValid = moment().isBefore(moment('11-28-2022'));
console.log('VALID', isValid);
export default [
    {
        id: 'fiosGig',
        name: 'Up to 940 / 880 Mbps',
        subtitle: '1 GIG 3.0',
        details: [
            'Click to Show / Hide All New Gigabit Plans',
            '$200 Grubhub or DoorDash',
            'Starting at $89.99 with auto pay',
            '10 Yr Price Guarantee',

            'Verizon Router Rental Included',
            '$300 off Stream TV Soundbar or Soundbar Pro',
            `${
                isValid
                    ? 'Amazon Echo Show 10 on US or $150 Verizon E-Gift Card'
                    : ''
            }`,
        ],
    },
    {
        id: 'fios400',
        name: '500 / 500 Mbps',
        subtitle: 'Plan Perks',
        details: [
            '10 Yr Price Guarantee',
            '$100 Grubhub or DoorDash',
            'Verizon Router Rental Included',
            '$200 off Stream TV Soundbar or Soundbar Pro',
            `${
                isValid
                    ? 'Amazon Echo Show 5 on US or $100 Verizon E-Gift Card'
                    : ''
            }`,
        ],
    },
    {
        id: 'fios200',
        name: '300 / 300 Mbps',
        subtitle: 'Plan Perks',
        details: [
            '10 Yr Price Guarantee',
            '$50 Grubhub or DoorDash',
            'Verizon Router Rental Included',
            '$100 off Stream TV Soundbar or Soundbar Pro',
            `${
                isValid
                    ? 'Amazon Echo Dot on US or $50 Verizon E-Gift Card'
                    : ''
            }`,
        ],
    },
];
