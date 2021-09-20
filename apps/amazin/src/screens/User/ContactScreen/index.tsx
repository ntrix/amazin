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
  const [status, setStatus] = useState<StatusType>({});
  useContact(setName, setEmail, setSubject, setStatus);
  const { submitContact } = useSubmitContact(setStatus);

  return (
    <>
      <SuccessModal className="form" msg={status.msg} label="Back To Home Page" />
      {!status.msg && (
        <Form
          header="Contact Us"
          statusOf={status}
          onSubmit={(e: EventType) => submitContact(e, { name, email, subject, text })}
          btn="Send Your Message"
        >
          <CustomInput text="Your Name" type="name" hook={[name, setName]} />
          <CustomInput text="Email" type="email" hook={[email, setEmail]} />
          <ContactSubject hook={[subject, setSubject]} />
          <CustomInput textarea rows={10} text="Your Message" type="message" hook={[text, setText]} />
        </Form>
      )}
    </>
  );
}
