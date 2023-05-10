import React, { useState, useEffect } from 'react';
import { Container } from './App.styled';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

// const users = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addUser = user => {
    const existingName = contacts.find(({ name }) => name === user.name);
    const existingNumber = contacts.find(
      ({ number }) => number === user.number
    );

    if (existingName) {
      alert(`${user.name} is already in contacts`);
      return;
    } else if (existingNumber) {
      alert(`${user.number} is already in contacts`);
      return;
    }

    setContacts(p => [{ ...user }, ...p]);
  };

  const getVisibleItems = () => {
    return contacts.filter(el =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };
  const onInputChange = e => {
    const { value } = e.currentTarget;
    setFilter(() => value);
  };

  const onStatusChange = () => {
    setIsActive(!isActive);
  };

  const handleDelete = idUser => {
    setContacts(() => {
      return contacts.filter(({ id }) => idUser !== id);
    });
  };

  return (
    <>
      <Container>
        <h2>Phonebook</h2>

        <ContactForm onSubmit={addUser} />
      </Container>

      <Container>
        <h2>Contacts</h2>

        <Filter
          onChange={onInputChange}
          value={filter}
          isActive={isActive}
          onClick={onStatusChange}
        />
        <ContactList
          visibleList={getVisibleItems()}
          onDeleteUser={handleDelete}
          isActive={isActive}
        />
      </Container>
    </>
  );
};
// class OLDApp extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     isActive: true,
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts !== null) {
//       this.setState({ contacts: JSON.parse(savedContacts) });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addUser = ({ name, number }) => {
//     const user = {
//       id: nanoid(5),
//       name,
//       number,
//     };

//     const existing = this.state.contacts.find(({ name }) => name === user.name);

//     if (existing) {
//       alert(`${user.name} is already in contacts`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [user, ...prevState.contacts],
//     }));
//   };

//   onInputChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   getVisibleItems = () => {
//     return this.state.contacts.filter(el =>
//       el.name
//         .toLocaleLowerCase()
//         .includes(this.state.filter.toLocaleLowerCase())
//     );
//   };

//   handleDelete = idUser => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(({ id }) => idUser !== id),
//     }));
//   };

//   onStatusChange = () => {
//     this.setState({ isActive: !this.state.isActive });
//   };

//   render() {
//     return (
//       <>
//         <Container>
//           <h2>Phonebook</h2>

//           <ContactForm onSubmit={this.addUser} />
//         </Container>

//         <Container>
//           <h2>Contacts</h2>

//           <Filter
//             onChange={this.onInputChange}
//             value={this.state.filter}
//             isActive={this.state.isActive}
//             onClick={this.onStatusChange}
//           />
//           <ContactList
//             visibleList={this.getVisibleItems()}
//             onDeleteUser={this.handleDelete}
//             isActive={this.state.isActive}
//           />
//         </Container>
//       </>
//     );
//   }
// }

export default App;
