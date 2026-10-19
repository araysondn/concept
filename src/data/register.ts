export const registerSteps = [
{ label: 'Setup', sub: 'Choose products' },
{ label: 'Details', sub: 'About you' },
{ label: 'Finances', sub: 'Income & funds' },
{ label: 'Your account', sub: 'Review' }];


export const accountOptions = [
{ id: 'mmf', name: 'CIC Money Market Fund', price: '(from KES 5,000)', note: 'Low risk, daily interest, withdraw at short notice', tip: 'Top up from KES 1,000 any time' },
{ id: 'dollar', name: 'CIC Dollar Fund', price: '(USD)', note: 'Save and invest in US dollars', tip: '' },
{ id: 'balanced', name: 'CIC Balanced Fund', price: '(unit trust)', note: 'A mix of shares and fixed income for medium-term growth', tip: '' },
{ id: 'academia', name: 'CIC Academia', price: '(education plan)', note: "Save towards your child's school and university fees", tip: '' },
{ id: 'jipange', name: 'Jipange Plus', price: '(retirement plan)', note: 'Build a personal pension for your sunset years', tip: '' }];


export const detailFields = [
{ id: 'firstName', label: 'First name', placeholder: 'e.g. Wanjiru', type: 'text' },
{ id: 'surname', label: 'Surname', placeholder: 'e.g. Kamau', type: 'text' },
{ id: 'idNumber', label: 'National ID number', placeholder: 'e.g. 12345678', type: 'text' },
{ id: 'mobile', label: 'Mobile number (M-PESA)', placeholder: 'e.g. 0712 345 678', type: 'tel' }];


export const employmentOptions = ['Employed full-time', 'Self-employed', 'Student', 'Retired', 'Unemployed'];
export const incomeOptions = ['Under KES 25,000', 'KES 25,000 – 74,999', 'KES 75,000 – 149,999', 'KES 150,000+'];
export const fundSourceOptions = ['Salary', 'Savings', 'Business income', 'Chama / SACCO', 'Inheritance', 'Investments'];
