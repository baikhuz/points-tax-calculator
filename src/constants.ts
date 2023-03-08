export const TAX_INFO_INIT = {
  taxRate: 0,
  taxOwed: 0,
  taxPerBand: [
    {
      min: 0,
      max: 0,
      rate: 0,
      amount: 0,
    },
  ],
  effectiveTaxRate: 0,
};

export const GET_BRACKETS_URL =
  "http://localhost:5001/tax-calculator/brackets/";

export const GET_YEAR_RADIO_BUTTONS = [
  {
    value: "2019",
    required: true,
  },
  {
    value: "2020",
    required: true,
  },
  {
    value: "2021",
    required: true,
  },
];