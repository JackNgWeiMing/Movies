import * as React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  ButtonProps,
  View,
  Dimensions,
} from 'react-native';
import {authAPI} from '../../apis';
import {Container} from '../../components';
import {SafeAreaView} from '../../components/SafeAreaView';
import {useSafeNavigation} from '../../hooks/useSafeNavigation';

export function SignInScreen() {
  const navigation = useSafeNavigation();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [username, onUsernameChange] = React.useState('fcs123');
  const [password, onPasswordChange] = React.useState('fcsuser');

  const onSubmit: ButtonProps['onPress'] = () => {
    // Basic Validation
    if (!username || !onUsernameChange) {
      setErrorMessage('Please enter both username & password');
      return;
    }

    // Reset
    setErrorMessage('');
    setLoading(true);

    // Calling API
    authAPI
      .login(username, password)
      .then(() => {
        setLoading(false);
        navigation.navigate('MovieList');
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage(error?.message || 'Failed to login');
      });
  };

  return (
    <SafeAreaView>
      <View style={[StyleSheet.absoluteFill, styles.center]}>
        <Container>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={onUsernameChange}
            value={username}
            placeholder="useless placeholder"
          />
        </Container>

        {/* Password Input */}
        <Container>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onPasswordChange}
            value={password}
            placeholder="useless placeholder"
          />
        </Container>

        {/* Failed Login Message */}
        {errorMessage ? (
          <Container style={styles.alertBox}>
            <Text style={styles.alertText}>{errorMessage}</Text>
          </Container>
        ) : null}

        <Container>
          <Button title="Login" disabled={loading} onPress={onSubmit} />
        </Container>
      </View>

      {/* Username Input */}
    </SafeAreaView>
  );
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: width * 0.8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
  },
  alertBox: {
    backgroundColor: '#ddc7c7',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  alertText: {
    color: '#c41212',
    textAlign: 'center',
  },
});
