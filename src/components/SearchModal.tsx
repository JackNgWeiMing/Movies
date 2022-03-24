import React, {useEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Spinner} from '../components/Spinner';
import {useAppDispatch, useRootState} from '../redux';
import {searchThunk} from '../redux/reducer/searchSlice';
import {SearchIcon} from './SearchIcon';

const SearchModal = () => {
  const inputRef = useRef<TextInput>();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const {errorMessage, status} = useRootState().search;

  /**
   * Help auto focus input field when modal is shown
   */
  useEffect(() => {
    if (modalVisible) {
      setTitle('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 400);
    }
  }, [modalVisible]);

  const onSubmit = async () => {
    try {
      await dispatch(searchThunk({title: title}));
      setModalVisible(false);
    } catch (error) {
      // skip
      // error is display from redux state
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{marginBottom: 5, textAlign: 'left', width: '100%'}}>
              Search by Movie Title:
            </Text>
            <TextInput
              ref={inputRef as any}
              placeholder="Enter a movie title"
              onChangeText={setTitle}
              onSubmitEditing={onSubmit}
              style={styles.inputStyle}
            />
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <View style={{flexDirection: 'row'}}>
              <Pressable
                disabled={status === 'loading'}
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                disabled={status === 'loading'}
                style={[styles.button, styles.buttonOpen]}
                onPress={onSubmit}>
                {status === 'loading' && (
                  <View style={{marginRight: 5}}>
                    <Spinner color="white" />
                  </View>
                )}
                <Text style={styles.textStyle}>Search</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{padding: 5}}
        onPress={() => setModalVisible(true)}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginRight: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'pink',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputStyle: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
  },
  errorMessage: {paddingVertical: 10, color: 'red'},
});

export default SearchModal;
