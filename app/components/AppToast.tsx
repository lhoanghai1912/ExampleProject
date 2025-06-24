import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Spacing } from '../utils/spacing';
import { Fonts } from '../utils/fontSize';
import { Colors } from '../utils/color';

interface AppToastProps {
  message: string;
  visible: boolean;
  duration: number;
  onHide: () => void;
}

const AppToast: React.FC<AppToastProps> = ({
  message,
  visible,
  duration,
  onHide,
}) => {
  const fadeAnim = new Animated.Value(0); // 0 means invisible, 1 means fully visible

  useEffect(() => {
    if (visible) {
      // Show Toast
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Hide Toast after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // Hide Toast
      hideToast();
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    onHide();
  };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    backgroundColor: Colors.primary,
    padding: Spacing.medium,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  toastText: {
    color: Colors.white,
    fontSize: Fonts.normal,
  },
});

export default AppToast;
