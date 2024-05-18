import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import assets from '../assets';
import {DARK_GREY, GREY, WHITE} from '../constants/colors';
import { SEARCH_PLACEHOLDER } from '../constants/strings';

const Dropdown = () => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([
    {id: 1, name: 'AEON'},
    {id: 2, name: 'Showcase'},
    {id: 3, name: 'Docs'},
    {id: 4, name: 'Blog'},
    {id: 5, name: 'Analytics'},
    {id: 6, name: 'Templates'},
    {id: 7, name: 'Enterprise'},
    // Add more items as needed
  ]);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const handleSearch = text => {
    setSearchText(text);
    setVisible(true); // Show dropdown whenever text changes
  };

  const handleSelectItem = item => {
    setSelectedItem(item);
    setSearchText(item.name);
    toggleDropdown();
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          placeholder={SEARCH_PLACEHOLDER}
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => setVisible(true)} // Show dropdown on focus
        />
        <TouchableOpacity style={styles.iconRight}>
          {/* Icon on the right side */}
          <Image style={styles.icon} source={assets.isSearch} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDropdown} style={styles.iconRight}>
          <Image
            style={styles.icon}
            source={visible ? assets.isBlackClose : assets.isMenu}
          />
        </TouchableOpacity>

        {visible && (
          <View style={styles.dropdown}>
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleSelectItem(item)}
                    style={styles.item}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                style={styles.list}
              />
            ) : (
              <Text style={styles.noItemsText}>No items found</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    height: 40,
    margin: 5,
  },
  icon: {width: 25, height: 25},
  input: {
    flex: 1,
    borderColor: GREY,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 0,
  },
  iconRight: {
    padding: 3,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Adjust position as needed
    left: 0, // Adjust position as needed
    right: 0, // Adjust position as needed
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: DARK_GREY,
    borderRadius: 5,
    maxHeight: 400, // Increased height
    zIndex: 1,
  },
  list: {
    maxHeight: 400, // Increased height
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  noItemsText: {
    textAlign: 'center',
    padding: 10,
  },
});

export default Dropdown;
