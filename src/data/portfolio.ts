export type PortfolioAccount = {
  id: string;
  name: string;
  number: string;
  value: string;
  gain: number;
  share: number;
  color: string;
  actions: ('topup' | 'statements' | 'withdraw')[];
  cash: string;
  opened: string;
  lastTrade: string;
};

export type Trade = {
  id: string;
  name: string;
  code: string;
  purchaseTotal: string;
  purchasePerShare: string;
  currentTotal: string;
  currentPerShare: string;
  gain: string;
  up: boolean;
  status: string;
  account: string;
  action: 'cancel' | 'withdraw';
};

// Illustrative demo investor; all values are sample data for the design concept.
export const investor = { name: 'Wanjiru Kamau', totalValue: 'KES 2,486,350.00', actionsRequired: 2 };

export const portfolioAccounts: PortfolioAccount[] = [
{ id: 'mmf', name: 'Money Market Fund', number: 'UT-0042-118734', value: 'KES 1,240,500.00', gain: 6.42, share: 50, color: '#AC232D', actions: ['topup', 'statements', 'withdraw'], cash: 'KES 6,820.15', opened: '14 Mar 2021', lastTrade: '02 Oct 2026' },
{ id: 'balanced', name: 'Balanced Fund', number: 'UT-0042-118735', value: 'KES 612,300.00', gain: 3.18, share: 25, color: '#86191F', actions: ['topup', 'statements'], cash: 'KES 0.00', opened: '01 Jun 2022', lastTrade: '15 Sep 2026' },
{ id: 'equity', name: 'Equity Fund', number: 'UT-0042-118736', value: 'KES 386,150.00', gain: -1.24, share: 15, color: '#E0646C', actions: ['topup', 'statements'], cash: 'KES 0.00', opened: '22 Aug 2023', lastTrade: '28 Aug 2026' },
{ id: 'dollar', name: 'Dollar Fund', number: 'UT-0042-118737', value: 'USD 1,912.00', gain: 2.05, share: 10, color: '#FEBE10', actions: ['topup', 'withdraw'], cash: 'USD 14.30', opened: '09 Jan 2024', lastTrade: '11 Oct 2026' }];


export const activeTrades: Trade[] = [
{ id: 't1', name: 'Money Market Fund', code: 'Top-up · M-PESA', purchaseTotal: 'KES 25,000.00', purchasePerShare: 'KES 1.00', currentTotal: 'KES 25,000.00', currentPerShare: 'KES 1.00', gain: 'Interest from next day', up: true, status: 'Awaiting confirmation', account: 'UT-0042-118734', action: 'cancel' },
{ id: 't2', name: 'Balanced Fund', code: 'Switch from Money Market Fund', purchaseTotal: 'KES 50,000.00', purchasePerShare: 'KES 1.41', currentTotal: 'KES 50,640.00', currentPerShare: 'KES 1.43', gain: '+ KES 640.00 (+1.3%)', up: true, status: 'Processing', account: 'UT-0042-118735', action: 'cancel' },
{ id: 't3', name: 'Equity Fund', code: 'Monthly standing order', purchaseTotal: 'KES 10,000.00', purchasePerShare: 'KES 1.12', currentTotal: 'KES 9,880.00', currentPerShare: 'KES 1.11', gain: '- KES 120.00 (-1.2%)', up: false, status: 'Completed', account: 'UT-0042-118736', action: 'withdraw' },
{ id: 't4', name: 'Dollar Fund', code: 'Top-up · bank transfer', purchaseTotal: 'USD 500.00', purchasePerShare: 'USD 1.00', currentTotal: 'USD 504.10', currentPerShare: 'USD 1.00', gain: '+ USD 4.10 (+0.8%)', up: true, status: 'Completed', account: 'UT-0042-118737', action: 'withdraw' }];


export const portfolioNav = ['My portfolio', 'Top up', 'Statements', 'Claims', 'Policies'];

export const tradeWomanImage = "/04fbb304-f647-46e9-b229-2e5497528707.jpg";
