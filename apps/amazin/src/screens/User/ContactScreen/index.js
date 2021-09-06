import { useState } from 'react';

import { useContact, useSubmitContact } from './useContact';
import Form from 'src/layouts/Form';
import SuccessModal from 'src/components/SuccessModal';
import CustomInput from 'src/components/CustomInput';
import ContactSubject from './ContactSubject';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState({});
  useContact(setName, setEmail, setSubject, setStatus);
  const { submitContact } = useSubmitContact(setStatus);

  return (
    <>
      <SuccessModal className="form" msg={status.message} label="Back To Home Page" />
      {!status.message && (
        <Form
          header="Contact Us"
          statusOf={status}
          onSubmit={(e) => submitContact(e, { name, email, subject, text })}
          btn="Send Your Message"
        >
          <CustomInput text="Your Name" hook={[name, setName]} />
          <CustomInput text="Email" type="email" hook={[email, setEmail]} />
          <ContactSubject hook={[subject, setSubject]} />
          <CustomInput textarea rows="10" text="Your Message" hook={[text, setText]} />
        </Form>
      )}
    </>
  );
}
