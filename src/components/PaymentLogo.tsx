import React from 'react';
import {
  VisaLogo,
  MastercardLogo,
  PaypalLogo,
  WaveLogo,
  MoovAfricaLogo,
  MtnLogo,
  OrangeMoneyLogo,
  MpesaLogo,
  AirtelMoneyLogo,
} from './PaymentLogos';

export type PaymentType =
  | 'visa'
  | 'mastercard'
  | 'paypal'
  | 'wave'
  | 'moov'
  | 'mtn'
  | 'orange'
  | 'mpesa'
  | 'airtel';

interface PaymentLogoProps {
  type: PaymentType | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'responsive';
  variant?: 'card' | 'badge' | 'icon-only';
  className?: string;
  showLabel?: boolean;
}

export const PaymentLogo: React.FC<PaymentLogoProps> = ({
  type,
  size = 'md',
  className = '',
  showLabel = false,
}) => {
  const normalized = type.toLowerCase().replace(/[^a-z]/g, '');

  let detectedType: PaymentType = 'visa';
  if (normalized.includes('visa')) detectedType = 'visa';
  else if (normalized.includes('master')) detectedType = 'mastercard';
  else if (normalized.includes('paypal')) detectedType = 'paypal';
  else if (normalized.includes('wave')) detectedType = 'wave';
  else if (normalized.includes('moov') || normalized.includes('flooz')) detectedType = 'moov';
  else if (normalized.includes('mtn') || normalized.includes('momo')) detectedType = 'mtn';
  else if (normalized.includes('orange')) detectedType = 'orange';
  else if (normalized.includes('pesa') || normalized.includes('vodacom')) detectedType = 'mpesa';
  else if (normalized.includes('airtel')) detectedType = 'airtel';
  else if (normalized.includes('carte')) detectedType = 'visa';

  const logoSize = size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'sm';

  const renderLogo = () => {
    switch (detectedType) {
      case 'visa':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full">
            <VisaLogo size={logoSize} />
          </div>
        );
      case 'mastercard':
        return (
          <div className="flex items-center justify-center px-1.5 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full">
            <MastercardLogo size={logoSize} />
          </div>
        );
      case 'paypal':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full">
            <PaypalLogo size={logoSize} />
          </div>
        );
      case 'wave':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full gap-1.5">
            <WaveLogo size={logoSize} />
            <span className="text-xs font-bold text-slate-800">Wave</span>
          </div>
        );
      case 'moov':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full">
            <MoovAfricaLogo size={logoSize} />
          </div>
        );
      case 'mtn':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full gap-1">
            <MtnLogo size={logoSize} />
            <span className="text-xs font-bold text-slate-800">MTN</span>
          </div>
        );
      case 'orange':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full">
            <OrangeMoneyLogo size={logoSize} />
          </div>
        );
      case 'mpesa':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full">
            <MpesaLogo size={logoSize} />
          </div>
        );
      case 'airtel':
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-white rounded-lg border border-slate-200 shadow-2xs h-full gap-1">
            <AirtelMoneyLogo size={logoSize} />
            <span className="text-xs font-bold text-slate-800">Airtel</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center px-2 py-0.5 bg-slate-100 rounded-lg text-slate-800 font-bold text-xs">
            {type}
          </div>
        );
    }
  };

  const labelsMap: Record<PaymentType, string> = {
    visa: 'Carte VISA',
    mastercard: 'Mastercard',
    paypal: 'PayPal',
    wave: 'Wave',
    moov: 'Moov Africa',
    mtn: 'MTN MoMo',
    orange: 'Orange Money',
    mpesa: 'M-Pesa',
    airtel: 'Airtel Money',
  };

  return (
    <div
      className={`inline-flex items-center select-none transition-transform hover:scale-102 ${className}`}
      title={`Paiement accepté : ${labelsMap[detectedType]}`}
    >
      {renderLogo()}
      {showLabel && (
        <span className="ml-1.5 text-xs font-semibold text-slate-800">
          {labelsMap[detectedType]}
        </span>
      )}
    </div>
  );
};
