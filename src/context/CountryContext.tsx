import React, { createContext, useContext, useState, useEffect } from 'react';
import { CountryInfo, COUNTRIES_DATA, DEFAULT_COUNTRY } from '../data/countries';
import { PaymentMethodInfo, PAYMENT_METHODS } from '../data/payments';

interface CountryContextType {
  currentCountry: CountryInfo;
  countryPayments: PaymentMethodInfo[];
  allPayments: PaymentMethodInfo[];
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState<CountryInfo>(DEFAULT_COUNTRY);

  // Silent automatic background detection (no toasts, no popups, no alerts)
  useEffect(() => {
    try {
      // 1. Check if user already had a saved preference silently
      const savedCode = localStorage.getItem('luka_selected_country');
      if (savedCode) {
        const found = COUNTRIES_DATA.find((c) => c.code === savedCode);
        if (found) {
          setCurrentCountry(found);
          return;
        }
      }

      // 2. Silent detection by browser timezone
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      let matchedCountry: CountryInfo | undefined;

      // Exact timezone match
      matchedCountry = COUNTRIES_DATA.find((country) =>
        country.timezones.some((t) => t.toLowerCase() === tz.toLowerCase())
      );

      // Heuristic timezone match
      if (!matchedCountry && tz) {
        if (tz.includes('Abidjan')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'CI');
        else if (tz.includes('Dakar')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'SN');
        else if (tz.includes('Douala') || tz.includes('Yaounde')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'CM');
        else if (tz.includes('Kinshasa') || tz.includes('Lubumbashi')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'CD');
        else if (tz.includes('Nairobi')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'KE');
        else if (tz.includes('Kampala')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'UG');
        else if (tz.includes('Porto-Novo') || tz.includes('Cotonou')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'BJ');
        else if (tz.includes('Lome')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'TG');
        else if (tz.includes('Bamako')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'ML');
        else if (tz.includes('Ouagadougou')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'BF');
        else if (tz.includes('Conakry')) matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'GN');
        else if (tz.includes('Paris') || tz.includes('London') || tz.includes('Brussels') || tz.includes('Montreal')) {
          matchedCountry = COUNTRIES_DATA.find((c) => c.code === 'CI');
        }
      }

      if (matchedCountry) {
        setCurrentCountry(matchedCountry);
      }
    } catch {
      setCurrentCountry(DEFAULT_COUNTRY);
    }
  }, []);

  // List of payment method info objects relevant for current country
  const countryPayments = currentCountry.primaryPayments
    .map((id) => PAYMENT_METHODS.find((p) => p.id === id))
    .filter((p): p is PaymentMethodInfo => Boolean(p));

  return (
    <CountryContext.Provider
      value={{
        currentCountry,
        countryPayments,
        allPayments: PAYMENT_METHODS,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
