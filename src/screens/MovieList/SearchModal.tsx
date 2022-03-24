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
import {Spinner} from '../../components/Spinner';
import {useAppDispatch, useRootState} from '../../redux';
import {searchThunk} from '../../redux/reducer/searchSlice';

const SearchModal = () => {
  const inputRef = useRef<TextInput>();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const {errorMessage, status} = useRootState().search;
  useEffect(() => {
    if (modalVisible) {
      // Keyboard.
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
      // Failed case , print the error message
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
            <Pressable
              disabled={status === 'loading'}
              style={[styles.button, styles.buttonClose]}
              onPress={onSubmit}>
              {status === 'loading' && <Spinner color="white" />}
              <Text style={styles.textStyle}>Search</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width * 0.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 15,
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
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
    marginBottom: 5,
  },
  errorMessage: {paddingVertical: 10, color: 'red'},
});

export default SearchModal;
