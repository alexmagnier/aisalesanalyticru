import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { saveReferralCode } from '@/utils/referralTracking';

const ReferralTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    
    if (ref) {
      saveReferralCode(ref);
    }
  }, [location.search]);
  
  return null; // Невидимый компонент
};

export default ReferralTracker;

