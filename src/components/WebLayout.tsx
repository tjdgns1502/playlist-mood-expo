import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle, useWindowDimensions } from 'react-native';

import { spacing } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
};

export function WebLayout({ children, style, maxWidth = 480 }: Props) {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const horizontalPadding = width >= 420 ? spacing.s24 : spacing.s16;
  const targetWidth = isWeb ? Math.max(0, Math.min(maxWidth, width - horizontalPadding * 2)) : undefined;

  return (
    <View
      style={[
        styles.base,
        isWeb && styles.web,
        isWeb && targetWidth ? { width: targetWidth, maxWidth } : styles.mobile,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
  web: {
    alignSelf: 'center',
  },
  mobile: {
    alignSelf: 'stretch',
  },
});
