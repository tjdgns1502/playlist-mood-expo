import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { TopTabs } from '../../src/components/TopTabs';
import { colors, fonts } from '../../src/theme';

function TabIcon({ name, focused }: { name: keyof typeof Ionicons.glyphMap; focused: boolean }) {
  return <Ionicons name={name} size={20} color={focused ? colors.cyan : colors.muted} />;
}

export default function TabsLayout() {
  const isWeb = Platform.OS === 'web';

  return (
    <Tabs
      screenOptions={{
        headerShown: isWeb,
        header: isWeb ? () => <TopTabs /> : undefined,
        tabBarStyle: isWeb
          ? { display: 'none' }
          : {
              backgroundColor: colors.panelStrong,
              borderTopColor: colors.border,
              height: 72,
              paddingTop: 10,
              paddingBottom: 10,
            },
        tabBarLabelStyle: {
          fontFamily: fonts.bold,
          fontSize: 11,
        },
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: colors.muted,
        sceneStyle: {
          backgroundColor: colors.bg,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: '분석',
          tabBarIcon: ({ focused }) => <TabIcon name="analytics" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: '리포트',
          tabBarIcon: ({ focused }) => <TabIcon name="document-text" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ focused }) => <TabIcon name="settings" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
