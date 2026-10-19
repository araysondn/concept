// CIC Group Data Privacy Statement, Version 2.0 (20 November 2023), verbatim from
// cicinsurancegroup.com/data-privacy-statement/. Source typos are kept as published.
// Inline **bold** marks bold runs in the source; " • " separates bullet points inside table cells.

export type PrivacyBlock =
{kind: 'p';text: string;} |
{kind: 'ul';items: string[];} |
{kind: 'table';headers: string[];rows: ({cells: string[];} | {group: string;})[];};

export type PrivacySection = {id: string;title: string;blocks: PrivacyBlock[];};

export const privacyMeta = {
  title: 'CIC GROUP DATA PRIVACY STATEMENT',
  version: 'Version 2.0 Dated 20th November 2023'
};

export const privacySections: PrivacySection[] = [
{
  id: 'policy-statement',
  title: 'Policy Statement',
  blocks: [
  {
    kind: 'p',
    text: 'CIC Insurance Group PLC, (this includes all its subsidiaries and regional companies in Kenya, Uganda, Malawi and South Sudan) is committed to protecting the fundamental human right to privacy. CIC respects the personal information and data we collect from you through the different mediums.'
  },
  {
    kind: 'p',
    text: 'This Privacy Statement, applies to personal data that CIC Insurance Group PLC including all its subsidiary companies ("CIC", "we" "our" "us", "CIC Group") collects and handles for the purposes of maintaining and providing CIC related information to the vis. For the purposes of this Privacy Statement, "Personal data" means any information relating to an identified or identifiable natural person.'
  }]

},
{
  id: 'who-we-are',
  title: 'Who we are.',
  blocks: [
  {
    kind: 'p',
    text: 'CIC Group of P.O Box 59485-00200 is both a controller and a processor in respect of personal data it processes in connection with the services provided under the relevant engagement with its customers.'
  }]

},
{
  id: 'what-we-collect',
  title: 'What Personal Data Do We Collect About You?',
  blocks: [
  {
    kind: 'p',
    text: 'As a Data Controller and a Data Processor, CIC Group collects personal data directly from the Data Subject or indirectly through intermediaries, service providers and other third parties. We may collect the following personal information.'
  },
  {
    kind: 'table',
    headers: ['Types of Information', 'Examples'],
    rows: [
    {
      cells: [
      'Identification and Contact Information',
      'name, address (and proof of address), other contact details (e.g., email and telephone details), gender, marital status, date and place of birth, ,.']

    },
    {
      cells: ['Government Generated Information', 'National ID Number, Tax PIN, Passport Details, NHIF & NSSF Details,']
    },
    {
      cells: [
      'Employment and Educational Information',
      'Employment History, Educational Background including institutions attended and Professional Memberships']

    },
    {
      cells: [
      'Financial Information',
      'Bank Account, Investments, payment card number, bank account number and account details, income and other financial information']

    },
    {
      cells: [
      "Insured's Risk Information",
      'Information about the insured risk, which contains Personal Data and sensitive personal data only to the extent relevant to the risk being insured and may include: **Health data:** current or former physical or mental medical conditions, health status, injury or disability information, medical procedures performed, relevant personal habits (e.g., smoking or consumption of alcohol), prescription information, medical history. **Previous Claims** – information about previous claims, which may include health insurance claims, previous personal insurance including criminal records data for c, and other categories of sensitive personal data.']

    },
    {
      cells: [
      'Audio-Visual Information',
      'Photographs, Videos, Audios i.e. CCTV Devices are installed at strategic locations to provide a safe and secure environment in all our branches, CIC premises as a part of our commitment to security and crime prevention. **Telephone Recordings** – Collected during interactions with our customer service/experience teams.']

    },
    {
      cells: [
      'Online Activity Information',
      'CIC Group automatically logs information about you and your computer or device such as the IP address, pages viewed and action on our website through Cookies and Web Beacons']

    }]

  },
  {
    kind: 'p',
    text: 'The above list is not exhaustive, and CIC may collect additional personal data in the course of our interactions with you.'
  }]

},
{
  id: 'where-we-collect',
  title: 'Where We Collect Personal Information',
  blocks: [
  {
    kind: 'p',
    text: 'We use Personal Information to carry out our business activities. The purposes for which we use your Personal Information will differ based on our relationship (i.e. Members, Employees, Business Partners, Prospective Members, etc.) including the type of communications between us and the services we provide.'
  },
  {
    kind: 'p',
    text: 'We collect Personal Data from various sources, including (depending on the country you are in):'
  },
  {
    kind: 'ul',
    items: [
    'Individuals and their family members, online or by telephone, or in written correspondence',
    "Individuals' employers.",
    'In the event of a claim, third parties including the other party to the claim (claimant/ defendant), witnesses, experts (including medical experts), loss adjustors, lawyers and claims investigators etc.',
    'Other insurance market participants, such as Insurers, Reinsurers and other insurance sales Intermediaries.',
    'Credit reference agencies (to the extent CIC is taking any credit risk)',
    'Government agencies, such as motor vehicle registration authorities and tax authorities']

  },
  { kind: 'p', text: 'We obtain your personal data from sources such as;' },
  {
    kind: 'ul',
    items: [
    'Application forms, Claims Forms, Proposal Forms and other forms that you fill.',
    'Software applications (apps) made available by us to you',
    'Our Website (www.cic.co.ke)',
    'Meetings, Telephone conversations and other forms of communication',
    'Social Media applications and/or tools']

  }]

},
{
  id: 'use-of-data',
  title: 'Use of Your Personal Data',
  blocks: [
  { kind: 'p', text: 'CIC may use your personal data for the following purposes.' },
  {
    kind: 'ul',
    items: [
    'Know your Customer (KYC) and Customer Due Diligence (CDD)',
    'Communicating with customers, business partners and employees.',
    'Assessing and making determination on provision of financial products or services, employing persons as employees and such other business decisions.',
    'Enhancing and improving product and service offering including maintaining information security.',
    'Fulfilling regulatory requirements such as Filing Reports with various regulators such as Office of the Data Protection Commissioner (ODPC), Insurance Regulatory Authority (IRA), Financial Reporting Centre (FRC), Capital Markets Authority (CMA), Retirements Benefits Authority (RBA).',
    'To respond to feedback, queries and complaints that you submit through our feedback form.',
    'Facilitating business operations including information technology systems.',
    "Providing marketing information through communication channels such as email, texts, and other platforms. (here you have provided specific consent and opt-in/subscribe to receiving CIC Insurance Group marketing, products and services information, we will send you communication we think will be of interest to you. You can unsubscribe/opt-out from our marketing communication by clicking 'Unsubscribe' on the footer of a CIC Insurance marketing e-mail or any other marketing communication received.)",
    'To personalize and improve our services, including to provide or recommend, features, content, and advertisements. Where this is the case, we will take appropriate measures to protect your personal information in accordance with this Privacy Statement.']

  }]

},
{
  id: 'legal-justification',
  title: 'Legal Justification for Our Use of Personal Data',
  blocks: [
  {
    kind: 'p',
    text: 'The primary purpose for collecting and processing your personal data is to perform contractual and statutory tasks related to management of the financial products/solutions you have with us. We will also process your data in connection with other tasks as required by law and statutory regulations. In addition to these, personal data may be used in product and service development.'
  },
  {
    kind: 'p',
    text: 'We commit to always identify and document without prejudice the lawful basis of processing your personal data for each specific purpose and put necessary security measures to ensure safeguarding of your personal data and the lawful purpose consented to always applies.'
  }]

},
{
  id: 'store-and-protect',
  title: 'How We Store and Protect Your Data',
  blocks: [
  {
    kind: 'p',
    text: 'We have put in place appropriate physical, legal, technical and organization safeguards to protect the personal data we collect in connection with our services. Such measures include but are not limited to requiring confidentiality from employees and other persons authorize to handle personal data and implementing information technology security measures such as system rights, audit trails and firewalls.'
  },
  {
    kind: 'p',
    text: 'You should be aware that the Internet is not a secure form of communication and sending and receiving information over the Internet carries with it risks including the risk of access and interference by unauthorized third parties. We do not accept responsibility or liability for the confidentiality, security or integrity of your Personal Data in connection with its transmission over the Internet.'
  }]

},
{
  id: 'disclosure',
  title: 'Disclosure of Personal Data.',
  blocks: [
  {
    kind: 'p',
    text: 'CIC undertakes to keep your personal data confidential and where it is necessary to satisfy the purpose for which it was collected or as may be required by law CIC will share your data with third parties.'
  },
  {
    kind: 'p',
    text: 'In connection with the purposes described above we sometimes need to share your Personal Information with third parties. Please note that in addition to the disclosures we have identified in the table below, we may disclose Personal Data for the purposes we explain in this Privacy Statement to service providers, contractors, agents and CIC Group companies that perform activities on our behalf.'
  },
  {
    kind: 'table',
    headers: ['PURPOSE OF PROCESSING', 'LEGAL GROUNDS', 'DISCLOSURE'],
    rows: [
    {
      cells: [
      'Establishing a client relationship, including fraud, anti-money laundering and sanctions checks',
      '• Performance of our contract with the client. • Compliance with a legal obligation • Legitimate interests of CIC (to ensure that the client is within our acceptable risk profile and to assist with the prevention of crime and fraud). • Consent and Substantial public interest',
      'Anti-Fraud Database']

    },
    {
      cells: [
      'Checking credit where we are taking any credit risks.',
      'Legitimate interests of CIC (to ensure that the client is within our acceptable risk profile and to assist with the prevention of crime and fraud)',
      'Credit Reference Agencies']

    },
    {
      cells: [
      'Evaluating the risks to be covered And matching to appropriate insurer, policy and premium',
      '• Performance of our contract with the client. • Compliance with a legal obligation • Legitimate interests of CIC (to ensure that the client is within our acceptable risk profile and to assist with the prevention of crime and fraud. • Consent • Substantial public interest',
      'Insurers']

    },
    { group: 'POLICY ADMINISTRATION' },
    {
      cells: [
      'General client care, including communicating with client',
      '• Performance of our contract with the client. • Compliance with a legal obligation • Legitimate interests of CIC (to ensure that the client is within our acceptable risk profile and to assist with the prevention of crime and fraud. • Consent • Substantial public interest',
      'Telco Providers.']

    },
    {
      cells: [
      'Collection/ refunding of premiums, paying on claims, and processing and facilitating other payments',
      '• Performance of our contract with the client. • Legitimate CIC interests (to recover debts due to us)',
      'Insurers; Banks; Debt Recovery Providers']

    },
    { group: 'CLAIMS ADMINISTRATION' },
    {
      cells: [
      'Managing insurance claims',
      '• Performance of our contract with the client. • Legitimate interests of CIC (to assist our clients in assessing and making claims)',
      'Insurers; Claims Handlers; Lawyers; Loss Adjustors; Experts; Third parties involved in handling or otherwise addressing the claim, such as health care professionals']

    },
    {
      cells: [
      'Defending or prosecuting legal claims',
      '• Performance of our contract with client • Legitimate interests of CIC (to assist our client in assessing and making claims). • To establish, defend or prosecute legal claims',
      'Insurers; Lawyers; Police; Experts; Other insurers; Anti-fraud databases; Third parties involved in the investigation or prosecution, such as private investigators']

    },
    { group: 'RENEWALS' },
    {
      cells: [
      'Contacting you in order to arrange the renewal of the insurance policy',
      '• Performance of our contract with the client. • Legitimate interests of CIC (to correspond with clients to facilitate the continuation of insurance cover)',
      'Insurers; Intermediaries']

    },
    { group: 'THROUGHOUT THE INSURANCE LIFECYCLE' },
    {
      cells: [
      'Marketing analytics and direct marketing, including data anonymization.',
      '• Legitimate interests of CIC (to bring clients relevant offers) • Where we do not have an existing relationship with the individual, consent',
      'Insurers; Group Companies']

    },
    {
      cells: [
      'General risk modelling',
      '• Legitimate interests of CIC (to build risk models that allow placing of risk with appropriate insurers) • Consent',
      'Insurers']

    },
    {
      cells: [
      'Complying with our legal or regulatory obligations',
      '• Compliance with a legal obligation • Legitimate interests of CIC (to take pre-emptive steps to ensure legal and regulatory compliance)',
      'Regulatory/Supervisory Bodies']

    },
    {
      cells: ['Other Financial Services', '• Legitimate interests of CIC (to provide sale of land)', 'Group Companies']
    },
    {
      cells: ['Asset Management / Investment', '• Performance of our contract with the client', 'Group Companies']
    }]

  },
  {
    kind: 'p',
    text: 'CIC Group shall not disclose your personal information to any third parties such as service providers other than with your prior consent, for a legitimate reason or for the performance of a contract.'
  }]

},
{
  id: 'consent',
  title: 'Consent',
  blocks: [
  {
    kind: 'p',
    text: "In order to facilitate the provision of our financial solutions including asset management, investment, insurance cover, and administer insurance claims, we rely on the data subject's consent to process personal sensitive information, such as medical records and financial information. This consent allows us to share the information with other Insurers, Intermediaries and Reinsurers that may need to process the information in order to undertake their role in the insurance market (which in turn allows for the pooling and pricing of risk in a sustainable manner)."
  },
  {
    kind: 'p',
    text: 'You understand that by using our site services and our products you agree to be bound by this statement of privacy. If you agree to this statement on behalf of an entity, you represent and warrant that you have the authority to bind that entity to our privacy statement, by using our products and/or accessing our site, if you do not accept it in entirety you must inform us immediately indicating what part of our privacy statement you are not agreeable to.'
  },
  {
    kind: 'p',
    text: "The affected individual's consent to this processing of personal information is a necessary condition for CIC to be able to provide the services the client requests. Where you are providing us with information about a person other than yourself, you agree to notify them of our use of their Personal Data and to obtain such consent for us."
  },
  {
    kind: 'p',
    text: "Individuals may withdraw their consent to such processing at any time. However, doing so may prevent CIC from continuing to provide the services. In addition, if an individual withdraws consent to an Insurer's or Reinsurer's processing of their Personal Data, it may not be possible for the insurance cover to continue."
  }]

},
{
  id: 'transfer',
  title: 'Transfer of Your Personal Data',
  blocks: [
  {
    kind: 'p',
    text: 'CIC may transfer your personal information for the purpose of effecting/implementing, administering, and securing any product or service that you have applied for or for other purpose set out in this privacy statement. We may transfer or disclose the personal data we collect to regulatory, or supervisory authority, third party contractors, subcontractors, and/or their subsidiaries and affiliates who provides support to CIC in providing its services. The third-party providers may use their own third-party subcontractors that have access to personal data (sub-processors). It is our policy to use only third-party providers that are bound to maintain appropriate levels of security and confidentiality, to process personal information only as instructed by CIC, and to flow those same obligations down to their sub-processors.'
  }]

},
{
  id: 'cross-border',
  title: 'Cross-border Transmission of Your Personal Data',
  blocks: [
  {
    kind: 'p',
    text: 'Your data is primarily stored in our data centers located within the country where you are located. From time to time we may need to transfer your personal information outside the country where you are located. This includes countries that do not have laws that provide specific protection to your personal data.'
  },
  {
    kind: 'p',
    text: 'Where we send your information outside the country, we will make sure that there is proof of adequate data protection safeguards in the recipient country or consent from you on transfer of your personal information. Prior to transferring personal data outside the country where you are located, we shall ascertain that the transfer is based on the provided legal and regulatory standards. Circumstances in which we may transfer your personal data outside are highlighted in the table below;'
  },
  {
    kind: 'table',
    headers: ['Legal Basis', 'Example'],
    rows: [
    {
      cells: [
      'There being appropriate data protection safeguards with respect to the security and protection of personal data in respect to the jurisdiction to which the data is being transferred to.',
      'Storage of your personal data in a cloud whose data server is located in one of the European countries that has implemented the General Data Protection Regulation (GDPR).']

    },
    {
      cells: [
      'An adequacy decision having being made by the Office of the Data Commissioner',
      'Where the Data Commissioner has published a list of countries which have appropriate data protection safeguards and we decide to store your data in that jurisdiction in furtherance to our legitimate interest.']

    },
    {
      cells: [
      'Necessity',
      'When we reinsure your risk as part of our legitimate interest and the reinsurance company requests for your personal data in respect to the insurance policy']

    },
    {
      cells: ['Consent', 'When following your express consent, we transfer your personal data to another jurisdiction.']
    }]

  }]

},
{
  id: 'retention',
  title: 'Retention of Personal Data',
  blocks: [
  {
    kind: 'p',
    text: 'Personal Data is retained as long as necessary for the purpose for which it is collected and to meet legal, regulatory and operational requirements. Retention periods may differ for each financial product purchased. At the end of the retention period, anonymized data is kept for management information purposes. CIC Group has also put in place Data retention policy in line with Data Protection law.'
  },
  {
    kind: 'p',
    text: 'CIC Group may also retain your contact information for the purposes of inviting you to renew any of your insurance policy from time to time and may use your contact to send you notifications notifying you of our various products, renewal notice and claim updates.'
  },
  {
    kind: 'p',
    text: 'You are responsible for the confidentiality of any password you have put in place to allow you to access certain products or services. Please note our customer service agents will never request you to share your password.'
  }]

},
{
  id: 'your-rights',
  title: 'Your Data Protection Rights',
  blocks: [
  {
    kind: 'p',
    text: 'We will collect, process and store your personal data in accordance with your rights under the Data Protection Act and attendant Regulations. Under certain circumstances, you have the following rights in relation to your personal data:'
  },
  {
    kind: 'table',
    headers: ['DESCRIPTION OF RIGHT', 'APPLICABILITY'],
    rows: [
    {
      cells: [
      '**Right to object to processing of personal data** – You have a right to object to the processing of their personal data. In implementation of this right, you shall use the statutory form "Request for restriction or objection to the processing of personal data" provided in our website.',
      'The right is not an absolute right and we can reject the request where we demonstrate that we have justifiable reasons for processing that would negate your interests e.g. when we are required by a government agency exercising their legal mandate to provide your personal data against your request not to avail the same or in our defense of a legal claim. We will always inform you when we have decline your request and provide the reasons. This right is however absolute when it relates to direct marketing.']

    },
    {
      cells: [
      '**Right to restrict processing of personal data** – You have the right to request the suspension of processing of your personal data in certain circumstances. In implementation of this right, you shall use the statutory form "Request for restriction or objection to the processing of personal data" provided in our website',
      'This right is not an absolute right and shall be available when: • You contest the accuracy of your personal data • Your personal data has been unlawfully processed and you oppose the erasure and request restriction instead • You no longer need your personal data but we require the same to be kept in order to establish, exercise or defend a legal claim • You have objected to the processing, pending verification as to whether our use of your personal data is justifiable and overrides your interest.']

    },
    {
      cells: [
      '**Right to access personal data** – You have the right to access your personal data and obtain information of how the said personal data is used and processed. In implementation of this right, you shall use the statutory form "Request for access to personal data" provided in our website',
      'You may access your personal data through our Self-Service Portals. Should you want to access your personal data in any other format, you may use the form subject to availing us available notice and other circumstances as shall be communicated by us to you.']

    },
    {
      cells: [
      '**Right to rectification of personal data** – You have the right to request your personal data to be corrected in instances of inaccuracy or incompleteness. In implementation of this right, you shall use the statutory form "Request for rectification" provided in our website.',
      'The right is available always subject to the discretion accorded to us to decline with reasons']

    },
    {
      cells: [
      '**Right to data Portability** – You have the right to receive your personal data in a structured, commonly used and machine-readable format to transmit the said personal data obtained to another third party without any hindrance. In implementation of this right, you shall use the statutory form " Request for Data Portability" provided in our website',
      'This right is available always provided that it is technically feasible for us to provide the personal data in the required format.']

    },
    {
      cells: [
      '**Right to erasure** – This right is sometimes referred to as "the right to be forgotten" and entitles you to request deletion or removal of your personal data from our records. In implementation of this right, you shall use the statutory form "Request for erasure of personal data "provided in our website',
      'Right of erasure does not apply if processing of your personal data is necessary for one of the following reasons. • To exercise the right of freedom of expression and information • To comply with a legal obligation e.g. our requirement to hold on to your personal data in the event of an ongoing investigation. • For the performance of a task carried out in the public interest or in the exercise of social authority • For archiving purposes in the public interest, scientific research, historical research or statistical purposes where erasure is likely to render impossible or seriously impair the achievement of that processing. • For the establishment, exercise or defense of a legal claim.']

    },
    {
      cells: ['**Right to complain to the Office of the Data Commissioner**', 'This right is available always.']
    },
    {
      cells: [
      '**Right to withdraw consent to processing of personal data.**',
      'This right only applies where personal data is processed based upon your consent.']

    },
    {
      cells: [
      '**Rights relating to automated decision making and profiling** – You have a right not to be subjected to a decision based solely on our automated processing, including profiling, which legally and significantly affects you.',
      'This right is not applicable when a decision is: • Necessary for entering into, or performing, a contract between you and us • Authorized by a law to which we are subject and which lays down suitable measures to safeguard your rights, freedoms and legitimate interests • Based on your consent']

    }]

  },
  {
    kind: 'p',
    text: 'In exercising your right as provided above, we may request specific information from you to help us confirm your identity. This is a security measure to ensure that Personal Data is not disclosed to any person who has no right to receive it. We may also contact you to ask you for further information in relation to your request to speed up our response.'
  }]

},
{
  id: 'enforcing-rights',
  title: 'Enforcing Your Rights',
  blocks: [
  {
    kind: 'p',
    text: 'If you wish to enforce any of your rights as highlighted above as provided under the Data Protection Act and attendant Regulations, then please contact us on our details in clause 16 below. You may use the various statutory forms made available by us and we will respond to your request without undue delay and within the statutory timelines.'
  }]

},
{
  id: 'complaints',
  title: 'Complaints',
  blocks: [
  {
    kind: 'p',
    text: 'If you feel we have not complied with your right to privacy and other provided rights regarding your personal data, you have a right to complain to us through the provided tool available on our website or you may pay us a visit and fill the complaint form and we shall endeavor to resolve such a complain. You however have the right to contact the Office of the Data Commissioner or such other data supervisory authority in the jurisdiction we operate in.'
  }]

},
{
  id: 'cookies',
  title: 'Cookies',
  blocks: [
  {
    kind: 'p',
    text: 'Cookies are small text files which are stored on your computer when you visit certain web pages. CIC Insurance Group may use cookies and similar technologies on our websites and apps, and in our emails. When you return to the website or app, or visit websites and apps that use the same cookies, they recognize these cookies and your device.'
  },
  {
    kind: 'p',
    text: 'We use cookies to do many different jobs, like letting you navigate between pages efficiently, remembering your preferences, and generally improving your online experience. We also use cookies in some of our emails to help us understand how you interact with our emails, and to help us improve our future email communications. The cookies policy on our websites and apps give you more information on cookies, how and where we use them, and how you can control them.'
  }]

},
{
  id: 'changes',
  title: 'Changes to This Data Privacy Statement',
  blocks: [
  {
    kind: 'p',
    text: 'CIC Group reserves the right to change the provisions of this Privacy Statement at any time. Where the changes will have a fundamental impact on the nature of the processing of your data or your rights, we shall notify you in advance. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Statement.'
  },
  {
    kind: 'p',
    text: 'Your use of the Website and applications following the posting of such revised Statement shall constitute your acceptance of any such changes. We encourage you to review our Privacy Statement whenever you visit the Website and application(s) to guarantee your understanding of how your information may be collected, processed and used.'
  }]

},
{
  id: 'contact-information',
  title: 'Contact Information',
  blocks: [
  {
    kind: 'p',
    text: 'If you have any queries relating to your personal data and/or this Privacy Statement, contact us through dataprotection@Cic.co.ke'
  }]

}];


const uploads = 'https://www.cicinsurancegroup.com/wp-content/uploads/2024/03';

export const requestForms = [
{ title: 'REQUEST FOR DATA PORTABILITY', href: `${uploads}/Request-for-Data-Portability.pdf` },
{ title: 'REQUEST FOR ACCESS TO PERSONAL DATA', href: `${uploads}/Request-for-Access-to-Personal-Data.pdf` },
{
  title: 'REQUEST FOR RESTRICTION OR OBJECTION TO THE PROCESSING OF PERSONAL',
  href: `${uploads}/REQUEST-FOR-RESTRICTION-OR-OBJECTION-TO-THE-PROCESSING-OF-PERSONAL.pdf`
},
{ title: 'REQUEST FOR ERASURE OF PERSONAL DATA', href: `${uploads}/Request-for-Erasure-of-Personal-Data.pdf` },
{
  title: 'REQUEST FOR RECTIFICATION OF PERSONAL DATA FORM',
  href: `${uploads}/REQUEST-FOR-RECTIFICATION-OF-PERSONAL-DATA-Form-DPG-3-.pdf`
}];


export const dpoAddress = [
'Data Protection Officer',
'CIC Insurance Group Plc',
'CIC Plaza, Mara Road, Upper Hill',
'P.O. Box 59485 – 00200 Nairobi, Kenya',
'Tel 020 282 3000, 0703 099 120',
'dataprotection@Cic.co.ke | www.cic.co.ke'];
