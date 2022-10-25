import { useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Section } from 'components/Section';
import { Title } from 'components/Title';
import { Container } from 'components/App/App.styled';
import { Notification } from 'components/Notification';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Container>
      <Title title={'Phonebook'} />
      <ContactForm />
      <Section title={'Contacts'}>
        <Filter />
        {contacts.length !== 0 ? (
          <ContactList />
        ) : (
          <Notification message="You don't have contacts yet..." />
        )}
      </Section>
      <ToastContainer autoClose={5000} />
    </Container>
  );
};
