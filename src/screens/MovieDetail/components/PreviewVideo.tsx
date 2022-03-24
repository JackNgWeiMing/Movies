import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import {PlayIcon} from './PlayIcon';
import {styles} from '../MovieDetailScreen';

export const PreviewVideo = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.playIconWrapper}
      onPress={() => {
        setModalVisible(true);
      }}>
      <PlayIcon />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../images/preview-image.gif')}
            style={{width: 300, height: 300}}
            resizeMode="contain"
          />
          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#69c2d8',
            }}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};
