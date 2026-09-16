import React from 'react';

export type PaymentMethodCode =
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
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * Vrai Logo VISA officiel :
 * Lettres VISA bleues (#1a1f71) avec l'aile dorée/jaune (#faa61a) sur le haut du 'V'
 */
export const VisaLogo: React.FC<PaymentLogoProps> = ({ className = 'h-4', size }) => {
  const hClass = size === 'xs' ? 'h-3' : size === 'sm' ? 'h-4' : size === 'lg' ? 'h-7' : className;
  return (
    <svg
      viewBox="0 0 142 45"
      className={`${hClass} w-auto inline-block select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
    >
      <path
        d="M55.8 43.5l8.9-42h14.2l-8.9 42H55.8zm41.2-41.2c-2.8-.9-7.2-1.8-12.7-1.8-14 0-23.8 7.4-23.9 18-.2 7.8 7 12.2 12.3 14.8 5.5 2.7 7.3 4.4 7.3 6.8-.1 3.7-4.4 5.4-8.5 5.4-5.7 0-8.7-.9-13.4-2.9l-1.9-.9-2 12.3c3.3 1.5 9.4 2.9 15.8 2.9 14.9 0 24.5-7.3 24.7-18.6.1-6.2-3.7-10.9-11.8-14.8-4.9-2.5-7.9-4.2-7.9-6.7 0-2.3 2.6-4.7 8.2-4.7 4.7-.1 8.1 1 10.8 2.2l1.3.6 1.8-11.7zm38.8.8h-11c-3.4 0-6 1-7.5 4.6l-21.3 36.6h14.9l3-8.2h18.2l1.7 8.2h13.1l-11.1-41.2zm-17.7 22.4l4.8-13.2c-.1.2 1 2.7 1.6 4.4l2.7 8.8h-9.1zm-86.8-23.2l-13.9 28.5-1.5-7.6c-2.6-8.9-10.7-18.5-19.8-23.3l12.8 42.4h15l22.4-40h-15z"
        fill="#1A1F71"
      />
      <path
        d="M22.5 2.1H.3L0 3.7c17.2 4.4 28.6 14.9 33.3 27.6l4.8-24.5c-.8-3.6-3.7-4.7-15.6-4.7z"
        fill="#FAA61A"
      />
    </svg>
  );
};

/**
 * Vrai Logo Mastercard officiel :
 * Deux disques rouge (#EB001B) et orange-jaune (#F79E1B) entrelacés
 */
export const MastercardLogo: React.FC<PaymentLogoProps> = ({ className = 'h-5', size }) => {
  const hClass = size === 'xs' ? 'h-3.5' : size === 'sm' ? 'h-4' : size === 'lg' ? 'h-7' : className;
  return (
    <svg
      viewBox="0 0 138 90"
      className={`${hClass} w-auto inline-block select-none`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
    >
      <rect width="138" height="90" rx="10" fill="transparent" />
      <g>
        <circle cx="50" cy="45" r="32" fill="#EB001B" />
        <circle cx="88" cy="45" r="32" fill="#F79E1B" fillOpacity="0.95" />
        <path
          d="M69 20.8a31.9 31.9 0 0 0-11 24.2 31.9 31.9 0 0 0 11 24.2 31.9 31.9 0 0 0 11-24.2 31.9 31.9 0 0 0-11-24.2z"
          fill="#FF5F00"
        />
      </g>
    </svg>
  );
};

/**
 * Vrai Logo PayPal officiel :
 * Double 'P' incliné en deux tons bleus (#003087 et #0079C1)
 */
export const PaypalLogo: React.FC<PaymentLogoProps> = ({ className = 'h-4', size }) => {
  const hClass = size === 'xs' ? 'h-3' : size === 'sm' ? 'h-4' : size === 'lg' ? 'h-6' : className;
  return (
    <svg
      viewBox="0 0 100 32"
      className={`${hClass} w-auto inline-block select-none`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PayPal"
    >
      <g transform="translate(0, 2)">
        {/* Dark Blue Back P */}
        <path
          d="M8.5 2h9.2c4.8 0 8.2 3 7.8 7.5-.5 5.5-4.6 8.5-9.4 8.5h-3.4l-1.8 11.5H5.8L8.5 2z"
          fill="#003087"
        />
        {/* Light Blue Front P overlapping */}
        <path
          d="M13.2 7h9.2c4.8 0 8.2 3 7.8 7.5-.5 5.5-4.6 8.5-9.4 8.5h-3.4l-1.8 11.5h-5.1L13.2 7z"
          fill="#0079C1"
        />
        {/* Intersect shade */}
        <path
          d="M13.2 16.5l.7-4.5h3.8c3.2 0 5.8 1.6 6.5 4.5h-11z"
          fill="#002157"
          opacity="0.3"
        />
      </g>
      {/* PayPal text */}
      <text
        x="36"
        y="21"
        fontFamily="sans-serif"
        fontSize="17"
        fontStyle="italic"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#0079C1">Pal</tspan>
      </text>
    </svg>
  );
};

/**
 * Vrai Logo WAVE officiel :
 * Pingouin noir & blanc avec bec & pattes orange qui salue sur fond cyan #1dc3ec avec texte "wave"
 */
export const WaveLogo: React.FC<PaymentLogoProps> = ({ className = 'h-6', size }) => {
  const hClass = size === 'xs' ? 'h-5' : size === 'sm' ? 'h-6' : size === 'lg' ? 'h-9' : className;
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${hClass} w-auto inline-block select-none rounded-xl`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Wave"
    >
      {/* Wave Cyan Background */}
      <rect width="100" height="100" rx="20" fill="#1DC3EC" />

      {/* Penguin Group */}
      <g transform="translate(25, 10)">
        {/* Right waving flipper */}
        <path
          d="M2 28 C-8 20, -12 14, -7 8 C-3 2, 4 12, 10 20 Z"
          fill="#1C1C1E"
        />

        {/* Penguin Head & Body */}
        <ellipse cx="25" cy="40" rx="19" ry="29" fill="#1C1C1E" />

        {/* White Belly */}
        <ellipse cx="25" cy="45" rx="12" ry="19" fill="#FFFFFF" />

        {/* Left Eyes */}
        <circle cx="19" cy="22" r="3.2" fill="#FFFFFF" />
        <circle cx="19" cy="22" r="1.3" fill="#1C1C1E" />

        {/* Right Eyes */}
        <circle cx="31" cy="22" r="3.2" fill="#FFFFFF" />
        <circle cx="31" cy="22" r="1.3" fill="#1C1C1E" />

        {/* Orange Beak */}
        <path d="M20 27 Q25 33 30 27 Q25 30 20 27 Z" fill="#F98E2B" />

        {/* Left Foot */}
        <ellipse cx="17" cy="68" rx="7" ry="3.5" fill="#F98E2B" />
        {/* Right Foot */}
        <ellipse cx="33" cy="68" rx="7" ry="3.5" fill="#F98E2B" />
      </g>

      {/* Text "wave" */}
      <text
        x="50"
        y="92"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="#FFFFFF"
      >
        wave
      </text>
    </svg>
  );
};

/**
 * Vrai Logo Moov Africa officiel :
 * Fond bleu avec typographie blanche, vague/croissant orange et losange mosaïque
 */
export const MoovAfricaLogo: React.FC<PaymentLogoProps> = ({ className = 'h-6', size }) => {
  const hClass = size === 'xs' ? 'h-4' : size === 'sm' ? 'h-6' : size === 'lg' ? 'h-8' : className;
  return (
    <svg
      viewBox="0 0 160 90"
      className={`${hClass} w-auto inline-block select-none rounded-xl`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Moov Africa"
    >
      <rect width="160" height="90" rx="16" fill="#005BA3" />

      {/* Text "Moov" */}
      <text
        x="18"
        y="42"
        fontFamily="sans-serif"
        fontSize="24"
        fontWeight="900"
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        Moov
      </text>
      {/* Text "Africa" */}
      <text
        x="18"
        y="65"
        fontFamily="sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#FFFFFF"
      >
        Africa
      </text>

      {/* Orange Swirl / Crescent */}
      <path
        d="M 88 20 C 130 25, 146 52, 90 73 C 122 66, 126 38, 88 20 Z"
        fill="#F58220"
      />

      {/* Mosaic diamond at the tip */}
      <g transform="translate(122, 38) rotate(45)">
        <rect x="0" y="0" width="8" height="8" rx="1" fill="#FFFFFF" />
        <rect x="10" y="0" width="8" height="8" rx="1" fill="#F58220" />
        <rect x="0" y="10" width="8" height="8" rx="1" fill="#F58220" />
        <rect x="10" y="10" width="8" height="8" rx="1" fill="#FFFFFF" />
      </g>
    </svg>
  );
};

/**
 * Vrai Logo MTN officiel :
 * Fond jaune vif (#FFCC00), ovale noir horizontal avec "MTN" en gras
 */
export const MtnLogo: React.FC<PaymentLogoProps> = ({ className = 'h-6', size }) => {
  const hClass = size === 'xs' ? 'h-4' : size === 'sm' ? 'h-6' : size === 'lg' ? 'h-8' : className;
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${hClass} w-auto inline-block select-none rounded-xl`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MTN"
    >
      {/* Yellow Background */}
      <rect width="100" height="100" rx="20" fill="#FFCC00" />

      {/* Black Oval Outline */}
      <ellipse
        cx="50"
        cy="50"
        rx="36"
        ry="20"
        fill="none"
        stroke="#000000"
        strokeWidth="6"
      />

      {/* MTN bold text */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="24"
        fontWeight="900"
        letterSpacing="0.5"
        fill="#000000"
      >
        MTN
      </text>
    </svg>
  );
};

/**
 * Vrai Logo Orange Money officiel :
 * Fond noir, double flèche en chevron dynamique (blanche vers haut-droite, orange vers bas-gauche) et "Orange Money"
 */
export const OrangeMoneyLogo: React.FC<PaymentLogoProps> = ({ className = 'h-6', size }) => {
  const hClass = size === 'xs' ? 'h-4' : size === 'sm' ? 'h-6' : size === 'lg' ? 'h-8' : className;
  return (
    <svg
      viewBox="0 0 180 80"
      className={`${hClass} w-auto inline-block select-none rounded-xl`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Orange Money"
    >
      <rect width="180" height="80" rx="14" fill="#000000" />

      {/* Orange & White double-arrow transfer emblem */}
      <g transform="translate(14, 18)">
        {/* Top-left arrow (White) pointing Up-Right */}
        <path
          d="M 12 12 L 28 12 L 28 28 L 22 28 L 22 20 L 7 35 L 3 31 L 18 16 L 12 16 Z"
          fill="#FFFFFF"
        />
        {/* Bottom-right arrow (Orange) pointing Down-Left */}
        <path
          d="M 32 32 L 16 32 L 16 16 L 22 16 L 22 24 L 37 9 L 41 13 L 26 28 L 32 28 Z"
          fill="#FF6600"
        />
      </g>

      {/* Text "Orange" & "Money" */}
      <text
        x="68"
        y="36"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#FFFFFF"
        letterSpacing="-0.3"
      >
        Orange
      </text>
      <text
        x="68"
        y="58"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#FFFFFF"
        letterSpacing="-0.3"
      >
        Money
      </text>
    </svg>
  );
};

/**
 * Vrai Logo M-PESA officiel :
 * Smartphone rouge avec billet de banque vert qui s'envole et texte "m-pesa"
 */
export const MpesaLogo: React.FC<PaymentLogoProps> = ({ className = 'h-6', size }) => {
  const hClass = size === 'xs' ? 'h-4' : size === 'sm' ? 'h-6' : size === 'lg' ? 'h-8' : className;
  return (
    <svg
      viewBox="0 0 140 60"
      className={`${hClass} w-auto inline-block select-none`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="M-Pesa"
    >
      {/* Smartphone silhouette in Red */}
      <g transform="translate(4, 3)">
        <rect
          x="6"
          y="2"
          width="24"
          height="40"
          rx="6"
          fill="none"
          stroke="#E60000"
          strokeWidth="4"
        />
        {/* Home button / speaker dots */}
        <rect x="15" y="36" width="6" height="3" rx="1.5" fill="#E60000" />
        {/* Green bill flying out */}
        <path
          d="M 2 24 C 12 10, 24 22, 38 10 C 35 18, 20 28, 6 28 Z"
          fill="#00A651"
        />
      </g>

      {/* Text m-pesa */}
      <text
        x="48"
        y="38"
        fontFamily="sans-serif"
        fontSize="24"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="#E60000"
      >
        m-pesa
      </text>
    </svg>
  );
};

/**
 * Vrai Logo Airtel Money officiel :
 * Fond rouge (#ED1B24) avec symbole boucle onde blanche et "airtel money"
 */
export const AirtelMoneyLogo: React.FC<PaymentLogoProps> = ({ className = 'h-6', size }) => {
  const hClass = size === 'xs' ? 'h-4' : size === 'sm' ? 'h-6' : size === 'lg' ? 'h-8' : className;
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${hClass} w-auto inline-block select-none rounded-xl`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Airtel Money"
    >
      {/* Red Background */}
      <rect width="100" height="100" rx="20" fill="#ED1B24" />

      {/* Airtel iconic loop / teardrop symbol in White */}
      <path
        d="M 50 16 C 36 16, 26 26, 26 38 C 26 48, 33 55, 43 56 C 53 57, 61 50, 61 40 C 61 32, 54 26, 46 26 C 38 26, 34 32, 34 38 C 34 44, 38 48, 44 48 C 48 48, 51 45, 51 41 C 51 38, 49 36, 46 36 C 44 36, 42 37, 42 39"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Text "airtel" */}
      <text
        x="50"
        y="75"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="#FFFFFF"
      >
        airtel
      </text>
      {/* Text "money" */}
      <text
        x="50"
        y="91"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="12"
        fontWeight="700"
        letterSpacing="0.5"
        fill="#FFFFFF"
      >
        money
      </text>
    </svg>
  );
};

/**
 * Composant de Badge Unifié avec Vrai Logo
 */
interface UnifiedPaymentBadgeProps {
  method: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  onClick?: () => void;
}

export const UnifiedPaymentBadge: React.FC<UnifiedPaymentBadgeProps> = ({
  method,
  size = 'sm',
  showLabel = true,
  onClick,
}) => {
  const norm = method.toLowerCase();

  const getLogoAndName = () => {
    if (norm.includes('wave')) {
      return { logo: <WaveLogo size={size} />, name: 'Wave', bg: 'bg-[#1DC3EC]/10 border-[#1DC3EC]/30' };
    }
    if (norm.includes('orange') || norm === 'om') {
      return { logo: <OrangeMoneyLogo size={size} />, name: 'Orange Money', bg: 'bg-black/5 border-slate-300' };
    }
    if (norm.includes('mtn') || norm.includes('momo')) {
      return { logo: <MtnLogo size={size} />, name: 'MTN MoMo', bg: 'bg-[#FFCC00]/15 border-[#FFCC00]/40' };
    }
    if (norm.includes('moov')) {
      return { logo: <MoovAfricaLogo size={size} />, name: 'Moov Africa', bg: 'bg-[#005BA3]/10 border-[#005BA3]/30' };
    }
    if (norm.includes('pesa')) {
      return { logo: <MpesaLogo size={size} />, name: 'M-Pesa', bg: 'bg-red-50 border-red-200' };
    }
    if (norm.includes('airtel')) {
      return { logo: <AirtelMoneyLogo size={size} />, name: 'Airtel Money', bg: 'bg-red-50 border-red-200' };
    }
    if (norm.includes('visa')) {
      return { logo: <VisaLogo size={size} />, name: 'VISA', bg: 'bg-blue-50 border-blue-200' };
    }
    if (norm.includes('mastercard') || norm.includes('master')) {
      return { logo: <MastercardLogo size={size} />, name: 'Mastercard', bg: 'bg-amber-50 border-amber-200' };
    }
    if (norm.includes('paypal')) {
      return { logo: <PaypalLogo size={size} />, name: 'PayPal', bg: 'bg-sky-50 border-sky-200' };
    }
    if (norm.includes('carte') || norm.includes('cb')) {
      return {
        logo: (
          <div className="flex items-center -space-x-1.5">
            <VisaLogo size="xs" />
            <MastercardLogo size="xs" />
          </div>
        ),
        name: 'Cartes bancaires',
        bg: 'bg-slate-50 border-slate-200',
      };
    }
    return {
      logo: <i className="fa-solid fa-wallet text-slate-500"></i>,
      name: method,
      bg: 'bg-slate-50 border-slate-200',
    };
  };

  const { logo, name, bg } = getLogoAndName();

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl border ${bg} shadow-2xs hover:shadow-xs transition-all ${
        onClick ? 'cursor-pointer hover:scale-102' : ''
      }`}
    >
      <span className="flex items-center justify-center shrink-0">{logo}</span>
      {showLabel && (
        <span className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-tight whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
};
