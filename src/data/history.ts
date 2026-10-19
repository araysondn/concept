// Source: cicinsurancegroup.com/cic-group-history/ (entries verbatim, including the site's own wording).
export type HistoryYear = {year: string;events: (string | {text: string;items: string[];})[];};

/** Newest first, as on the site. The site's timeline ends at 2022. */
export const historyYears: HistoryYear[] = [
{
  year: '2022',
  events: [
  'CIC launches new medical product for cooperative members dubbed “CIC CoopCare” to offer solution for the Cooperatives and Sacco markets',
  'CIC launches Motoring Assist in conjunction with AA Kenya',
  'Launch of revamped website including regional sites',
  'CIC introduces Ushirika Gardens and started the sale of its 200 acres of land',
  'Winner – AKI Group Life Company of the Year 2021',
  'Winner – Medical Underwriter of the Year – Group medical – CIC General Insurance',
  'Overall Winner – Champion of Governance Award',
  'Winner – Company Secretary of the Year Award',
  'Third runners up – minimum loss ratio',
  'Third runners up – Most Improved company']

},
{
  year: '2021',
  events: [
  'Awarded 2nd Runners up – FIRE Awards Insurance Category 2021',
  'Decade of Excellence Insurance Kenya – Global Banking and Finance Awards 2021',
  'Best General Insurance Company Kenya – International Business Magazine Awards 2021',
  'Best Life Insurance Company Kenya – International Business Magazine Awards 2021',
  'Best Asset Management Company Kenya – International Business Magazine Awards 2021']

},
{
  year: '2020',
  events: [
  'CIC Goes Cashless',
  'Customer Digital Motor Certificates',
  'CIC launches Records and Information Management System',
  'Winner – AKI Group Life Company of the Year',
  'Second runners up AKI Motor Data System Award',
  'CIC General awarded Best Automotive Insurer – Automotive Industry Excellence Awards',
  'Best Motor Insurer – Cheki Awards']

},
{
  year: '2019',
  events: [
  'Marked 50 Years of service to the people',
  'AKI Awards: Overall Winner 2019 Group Life Company of the Year – AKI Group Life Best Practice',
  'AKI Awards: CIC General – second runners, Insurance Motor Data System Award.',
  'Name change to Public Listed Company (PLC) in compliance with the requirements of the Companies Act',
  'Successfully paid the 2014 KShs 5b Corporate Bond upon maturity.']

},
{
  year: '2018',
  events: [
  'AKI Awards – Overall Winner 2018 Group Life Company of the Year',
  'AKI Group Life Best Practice.',
  'Fire Award Winner Insurance Category 2018.']

},
{
  year: '2017',
  events: [{ text: 'AKI Awards:', items: ['Overall Winner 2017 Group Life Company of the Year', 'AKI Group Life Best Practice.'] }]
},
{
  year: '2016',
  events: [
  'Successful launch of a the CIC Foundation.',
  'CIC Group awarded Best Company to Work for, Deloitte – 2016.',
  'CIC Life awarded Group Life Company of the Year – AKI.']

},
{ year: '2015', events: ['Successful implementation of a unified CIC Brand.'] },
{
  year: '2014',
  events: [
  'Opening of CIC Plaza II and Successful Corporate Bond issue (oversubscribed by 111%).',
  'Entry into Malawi and Uganda markets.']

},
{ year: '2013', events: ['Entry into Southern Sudan and commencement of Regional Expansion.'] },
{
  year: '2012',
  events: ['CIC Insurance Group listed its shares by introduction at the Nairobi Securities Exchange on Thursday 19th July 2012.']
},
{
  year: '2011',
  events: [
  {
    text: 'We fully demerge resulting in the formation of :-',
    items: ['CIC Life Assurance Limited,', 'CIC General Insurance Limited', 'CIC Asset Management Limited.']
  }]

},
{
  year: '2010',
  events: ['Name change to CIC Insurance Group Limited in preparation for the demerger of our Life and General Business operations.']
},
{ year: '1999', events: ['Name change from CIS to the Cooperative Insurance of Kenya Ltd (CIC).'] },
{ year: '1978', events: ['Incorporated and licensed as Co-operative Insurance Services Ltd (CIS).'] },
{ year: '1968', events: ['CIS started as an insurance agency within the Kenya National Federation of Co-operatives (KNFC).'] }];
