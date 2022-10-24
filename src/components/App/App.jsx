import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { Section } from 'components/Section';
import { Title } from 'components/Title';
import { Container } from 'components/App/App.styled';
import { Notification } from 'components/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';
import { getContacts, getFilter } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleAddContact = contact => {
    if (checkDublicate(contact)) {
      toast.error(
        `${contact.name} is already in contacts. Please add a new contact.`
      );
      return;
    }

    dispatch(addContact(contact));
  };

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

  const changeFilter = evt => {
    const { value } = evt.target;
    dispatch(setFilter(value));
  };

  const checkDublicate = ({ name, number }) => {
    const result = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    return result;
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Title title={'Phonebook'} />
      <ContactForm addContact={handleAddContact} />
      <Section title={'Contacts'}>
        <Filter value={filter} changeFilter={changeFilter} />
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
