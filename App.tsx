import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

const contactsData = [
  {name: 'Vishal', number: '8472911402'},
  {name: 'Gopala', number: '9876543220'},
  {name: 'Kapoor', number: '5555955555'},
  {name: 'swami', number: '9999999998'},
  {name: 'vanket', number: '1111111111'},
  {name: 'vivek', number: '1234567890'},
  {name: 'shivam', number: '9876543210'},
  {name: 'Arjun', number: '5555455555'},
  {name: 'Raju', number: '9999999899'},
  {name: 'Ravi', number: '1111211111'},
];




const App = () => {
  const [search, setSearch] = useState('');
  
  const [selectedContact, setSelectedContact] = useState(null);

  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const handleSearch = text => {
    setSearch(text);
  };

  
  
  const handleContactPress = contact => {
    setSelectedContact(contact);
  };

  const handleModalDismiss = () => {
    setSelectedContact(null);
  };

  const handleAddContact = () => {
    const newContact = {
      name: newContactName,
      number: newContactNumber,
    };


    contactsData.push(newContact);
    setNewContactName('');
    setNewContactNumber('');
  };

  const filteredContacts = contactsData.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderContactItem = ({item}) => (
    <TouchableOpacity onPress={() => handleContactPress(item)}>
      <View style={styles.contactItemContainer}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactNumber}>{item.number}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
          style={styles.searchInput}
        placeholder="Search contacts..."
          onChangeText={handleSearch}
        value={search}
      />
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.number}
      />



      <Modal visible={selectedContact !== null} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            <Text style={styles.modalTitle}>{selectedContact?.name}</Text>
            <Text style={styles.modalSubtitle}>{selectedContact?.number}</Text>
            <TouchableOpacity onPress={handleModalDismiss}>
              <Text style={styles.dismissButton}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.addContactContainer}>
        <TextInput
          style={styles.addContactInput}
          placeholder="Name"
          onChangeText={setNewContactName}
          value={newContactName}
        />
        <TextInput
          style={styles.addContactInput}
          placeholder="Number"
          onChangeText={setNewContactNumber}
          value={newContactNumber}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    
  },
  contactItemContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E6E6FA',
  },
  popupContainer: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  modalSubtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  dismissButton: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  addContactContainer: {
    marginTop: 20,
  },
  addContactInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
