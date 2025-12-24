import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // НЕ показывать основной header/footer на партнёрских и админских страницах
  const isPartnerArea = location.pathname.startsWith('/partners');
  const isAdminArea = location.pathname.startsWith('/admin');
  const hideMainLayout = isPartnerArea || isAdminArea;
  
  // Исключение: лендинг партнёрки показываем с основным header
  const isPartnerLanding = location.pathname === '/partners';
  
  if (hideMainLayout && !isPartnerLanding) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

