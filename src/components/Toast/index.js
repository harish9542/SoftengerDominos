import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useSafeArea} from 'react-native-safe-area-context';

// import {DARK_GREY, GREEN, RED, WHITE} from '@constants/colors';

import assets from '../../assets';
import {DARK_GREY, RED} from '../../constants/colors';

export const errorToastProp = ({
  message = 'Something is wrong',
  duration = 5000,
  autoHide = true,
  hideOnPress = true,
  ...props
}) => ({
  ...props,
  message,
  duration,
  autoHide,
  hideOnPress,
  animationDuration: 280,
  style: styles.errorContainer,
  position: 'bottom',
});

export const infoToastProp = ({
  message = 'Info',
  duration = 5000,
  autoHide = true,
  hideOnPress = true,
  ...props
}) => ({
  ...props,
  message,
  duration,
  autoHide,
  hideOnPress,
  animationDuration: 280,
  style: styles.infoContainer,
  position: 'bottom',
});

export const showErrorToast = ({
  message,
  duration,
  autoHide,
  onToastPress,
  ...props
}) => {
  showMessage(
    errorToastProp({message, duration, autoHide, onToastPress, ...props}),
  );
};

export const hideToast = () => hideMessage();

const Toast = ({
  position,
  style,
  message: {message: toastMessage, onToastPress},
  onClose,
}) => {
  const safeArea = useSafeArea();

  function handleClosePress() {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      hideMessage();
    }
  }

  function handleToastPress() {
    if (typeof onToastPress === 'function') {
      onToastPress();
      hideMessage();
    } else {
      hideMessage();
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleToastPress}
      style={[
        styles.toastContainer,
        styles.topToast,
        styles.bottomToast,
        position === 'bottom' &&
          safeArea.bottom > 0 && {
            paddingBottom: safeArea.bottom,
          },
        position === 'top' &&
          safeArea.top > 0 && {
            paddingTop: safeArea.top,
          },
        style,
      ]}>
      <View style={styles.toastContent}>
        <TouchableOpacity onPress={handleToastPress} style={styles.toastCopy}>
          <Text style={styles.baseText} color={'white'}>
            {toastMessage}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClosePress} style={styles.toastClose}>
          <Image source={assets.isClosee} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Toast;

const styles = StyleSheet.create({
  baseText: {
    fontSize: 14,
  },
  bottomToast: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    zIndex: 1000,
  },
  errorContainer: {
    backgroundColor: RED,
    justifyContent: 'center',
  },
  infoContainer: {
    backgroundColor: DARK_GREY,
  },
  toastClose: {
    height: 20,
    width: 20,
  },
  toastContainer: {
    minHeight: 90,
    paddingHorizontal: 24,
  },
  toastContent: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toastCopy: {
    flex: 0.95,
  },
});
