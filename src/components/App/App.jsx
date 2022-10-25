import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Section } from 'components/Section';
import { Title } from 'components/Title';
import { Container } from 'components/App/App.styled';
import { Notification } from 'components/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const visibleContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter);
      return result;
    });
    return visibleContacts;
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Title title={'Phonebook'} />
      <ContactForm />
      <Section title={'Contacts'}>
        <Filter />
        {visibleContacts.length !== 0 ? (
          <ContactList
            visibleContacts={visibleContacts}
            deleteContact={handleDeleteContact}
          />
        ) : (
          <Notification message="You don't have contacts yet..." />
        )}
      </Section>
      <ToastContainer autoClose={5000} />
    </Container>
  );
};
