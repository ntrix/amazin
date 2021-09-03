import { useState } from 'react';

import { useContact, useSubmitContact } from './useContact';
import Button from 'src/components/Button';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import ContactSubject from './ContactSubject';
import SuccessModal from 'src/components/SuccessModal';
import Header from 'src/layouts/Header';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState({});
  useContact(setName, setEmail, setSubject, setStatus);
  const { submitContact } = useSubmitContact(setStatus);

  return (
    <form className="form" onSubmit={(e) => submitContact(e, { name, email, subject, text })}>
      <Header label="Contact Us" />
      <LoadingOrError xl statusOf={status} />

      <SuccessModal msg={status.message} label="Back To Home Page" />
      {!status.message && (
        <>
          <CustomInput text="Your Name" hook={[name, setName]} />
          <CustomInput text="Email" type="email" hook={[email, setEmail]} />
          <ContactSubject hook={[subject, setSubject]} />
          <CustomInput textarea rows="10" text="Your Message" hook={[text, setText]} />
          <Button primary fill type="submit" label="Send Your Message" />
        </>
      )}
    </form>
  );
}
