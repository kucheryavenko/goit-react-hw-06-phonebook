import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import {
  Form,
  Label,
  InputName,
  InputNumber,
  Button,
} from 'components/ContactForm/ContactForm.styled';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (checkDublicate({ name, number })) {
      toast.error(`${name} is already in contacts. Please add a new contact.`);
      return;
    }

    dispatch(addContact({ name, number }));
    reset();
  };

  const checkDublicate = ({ name, number }) => {
    const result = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    return result;
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameId}>Name</Label>
      <InputName
        id={nameId}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        placeholder="Homer Simpson"
        required
        onChange={handleChange}
      />
      <Label htmlFor={numberId}>Number</Label>
      <InputNumber
        id={numberId}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        placeholder="742-98-74"
        required
        onChange={handleChange}
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};
