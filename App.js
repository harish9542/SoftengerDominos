import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Toast from './src/components/Toast';
import AppNavigator from './src/navigation/AppNavigator';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const toastRef = useRef();
  function renderToastComponent(props) {
    return <Toast {...props} />;
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppNavigator />
        <FlashMessage MessageComponent={renderToastComponent} ref={toastRef} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
