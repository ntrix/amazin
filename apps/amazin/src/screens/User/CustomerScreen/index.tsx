import './customerScreen.css';
import { useShadow } from 'src/hooks/useShadow';
import { customerMenuTemplate } from 'src/components/User/CustomerScreen/customerMenuTemplate';
import CustomerCard, { mapCustomerCardProp } from 'src/components/User/CustomerScreen/CustomerCard';
import CustomerHelpSection from 'src/components/User/CustomerScreen/CustomerHelpSection';
import Header from 'src/layouts/Header';

export default function CustomerScreen() {
  const { userInfo } = useShadow();

  return (
    <div className="c-screen customer">
      <header className="container">
        <Header title>We’re here to help, {userInfo?.name || ''}</Header>
        <h3 className="sub-title">
          We’ll walk you through fixing most things here or connect you to someone if you need more help.
        </h3>
      </header>
      <div className="divider" />

      <div className="container">
        <h2>What can we assist you with today?</h2>
        <div className="c-boxes">
          {customerMenuTemplate.map((args, id) => (
            <CustomerCard key={id} {...mapCustomerCardProp(args)} />
          ))}
          <div className="separator mb-1" />

          <CustomerHelpSection />
        </div>
      </div>
    </div>
  );
}
