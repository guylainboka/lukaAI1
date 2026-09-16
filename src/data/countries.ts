export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  timezones: string[];
  primaryPayments: string[]; // ids from PAYMENT_METHODS
  topCities: string[];
  bannerHighlight: string;
  localGuideTitle: string;
  phonePrefix: string;
}

export const COUNTRIES_DATA: CountryInfo[] = [
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    flag: '🇨🇮',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    timezones: ['Africa/Abidjan'],
    primaryPayments: ['wave', 'orange', 'mtn', 'moov', 'visa', 'mastercard'],
    topCities: ['Abidjan', 'Yamoussoukro', 'San-Pédro', 'Bouaké'],
    bannerHighlight: 'Paiements Wave, Orange Money, MTN & Moov actifs partout à Abidjan',
    localGuideTitle: 'Les meilleures adresses du Plateau, Cocody, Zone 4 & Marcory',
    phonePrefix: '+225',
  },
  {
    code: 'SN',
    name: 'Sénégal',
    flag: '🇸🇳',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    timezones: ['Africa/Dakar'],
    primaryPayments: ['wave', 'orange', 'visa', 'mastercard', 'paypal'],
    topCities: ['Dakar', 'Saly', 'Saint-Louis', 'Thiès'],
    bannerHighlight: 'Paiements Wave & Orange Money acceptés à Dakar et sur la Petite Côte',
    localGuideTitle: 'Sorties & bonnes tables aux Almadies, Plateau et Ngor',
    phonePrefix: '+221',
  },
  {
    code: 'CM',
    name: 'Cameroun',
    flag: '🇨🇲',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    timezones: ['Africa/Douala', 'Africa/Yaounde'],
    primaryPayments: ['mtn', 'orange', 'visa', 'mastercard', 'paypal'],
    topCities: ['Douala', 'Yaoundé', 'Kribi', 'Bafoussam'],
    bannerHighlight: 'Réglez en direct avec MTN MoMo et Orange Money à Douala & Yaoundé',
    localGuideTitle: 'Lieux incontournables à Bonanjo, Akwa et Bastos',
    phonePrefix: '+237',
  },
  {
    code: 'CD',
    name: 'R.D. Congo',
    flag: '🇨🇩',
    currency: 'USD / CDF',
    currencySymbol: 'CDF',
    timezones: ['Africa/Kinshasa', 'Africa/Lubumbashi'],
    primaryPayments: ['mpesa', 'airtel', 'orange', 'visa', 'mastercard'],
    topCities: ['Kinshasa', 'Lubumbashi', 'Goma', 'Matadi'],
    bannerHighlight: 'M-Pesa (Vodacom), Airtel Money et Orange Money acceptés à Kinshasa',
    localGuideTitle: 'Sorties branchées à Gombe, Bandalungwa et Ngaliema',
    phonePrefix: '+243',
  },
  {
    code: 'BJ',
    name: 'Bénin',
    flag: '🇧🇯',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    timezones: ['Africa/Porto-Novo'],
    primaryPayments: ['mtn', 'moov', 'visa', 'mastercard'],
    topCities: ['Cotonou', 'Porto-Novo', 'Ouidah', 'Parakou'],
    bannerHighlight: 'MTN MoMo & Moov Money disponibles à Cotonou et sur la côte',
    localGuideTitle: 'Adresses branchées à Haie Vive, Ganhi et Fidjrossè',
    phonePrefix: '+229',
  },
  {
    code: 'TG',
    name: 'Togo',
    flag: '🇹🇬',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    timezones: ['Africa/Lome'],
    primaryPayments: ['moov', 'mtn', 'visa', 'mastercard'],
    topCities: ['Lomé', 'Kpalimé', 'Kara', 'Aného'],
    bannerHighlight: 'Moov Africa (Flooz) et T-Money acceptés sur place à Lomé',
    localGuideTitle: 'Escapades côtières et rooftops à Nyékonakpoè et Baguida',
    phonePrefix: '+228',
  },
  {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    currency: 'KES',
    currencySymbol: 'KSh',
    timezones: ['Africa/Nairobi'],
    primaryPayments: ['mpesa', 'airtel', 'paypal', 'visa', 'mastercard'],
    topCities: ['Nairobi', 'Mombasa', 'Diani', 'Kisumu'],
    bannerHighlight: 'Lipa Na M-Pesa & Airtel Money live across Nairobi & coastal resorts',
    localGuideTitle: 'Top spots in Westlands, Kilimani, Karen and Diani Beach',
    phonePrefix: '+254',
  },
  {
    code: 'UG',
    name: 'Ouganda',
    flag: '🇺🇬',
    currency: 'UGX',
    currencySymbol: 'USh',
    timezones: ['Africa/Kampala'],
    primaryPayments: ['airtel', 'mtn', 'visa', 'mastercard'],
    topCities: ['Kampala', 'Entebbe', 'Jinja'],
    bannerHighlight: 'Airtel Money & MTN MoMo supported across Kampala and Jinja',
    localGuideTitle: 'Nightlife, dining and safaris around Kampala and Lake Victoria',
    phonePrefix: '+256',
  },
  {
    code: 'GLOBAL',
    name: 'International / Diaspora',
    flag: '🌍',
    currency: 'EUR / USD',
    currencySymbol: '€',
    timezones: ['Europe/Paris', 'Europe/London', 'America/New_York', 'America/Montreal'],
    primaryPayments: ['visa', 'mastercard', 'paypal', 'wave', 'orange'],
    topCities: ['Abidjan', 'Dakar', 'Douala', 'Kinshasa', 'Paris'],
    bannerHighlight: 'Réservez à l’avance pour vos voyages en Afrique avec Visa, Mastercard & PayPal',
    localGuideTitle: 'Le guide panafricain pour voyageurs, expatriés et diaspora',
    phonePrefix: '+33',
  },
];

export const DEFAULT_COUNTRY = COUNTRIES_DATA[0]; // Côte d'Ivoire
