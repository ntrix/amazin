import { useState } from 'react';

import { useContact } from './useContact';
import { useSubmitContact } from './useSubmitContact';
import Button from 'src/components/Button';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import ContactSubject from './ContactSubject';
import SuccessModal from 'src/components/SuccessModal';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState([]);
  useContact(setName, setEmail, setSubject, setMessage);
  const { submitContact } = useSubmitContact(setLoading, setMessage, setError);

  return (
    <div>
      <form className="form" onSubmit={(e) => submitContact(e, { name, email, subject, text })}>
        <h1>Contact Us</h1>
        <LoadingOrError xl statusOf={{ loading, error }} />

        <SuccessModal msg={message} label="Back To Home Page" />
        {!message && (
          <>
            <CustomInput text="Your Name" hook={[name, setName]} />
            <CustomInput text="Email" type="email" hook={[email, setEmail]} />
            <ContactSubject hook={[subject, setSubject]} />
            <CustomInput textarea rows="10" text="Your Message" hook={[text, setText]} />
            <Button primary type="submit" className="col-fill mt-1" label="Send Your Message" />
          </>
        )}
      </form>
    </div>
  );
}
