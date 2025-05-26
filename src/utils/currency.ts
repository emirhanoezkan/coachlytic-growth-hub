
export const formatCurrency = (amount: number, language: 'en' | 'tr'): string => {
  const locale = language === 'tr' ? 'tr-TR' : 'en-US';
  const currency = language === 'tr' ? 'TRY' : 'USD';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
