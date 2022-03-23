import * as React from 'react';
import {Text, TextInput, StyleSheet, Button, ButtonProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginAPI} from '../../apis';
import {Container} from '../../components';
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
    loginAPI(username, password)
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
    <SafeAreaView style={styles.root}>
      {/* Username Input */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
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
