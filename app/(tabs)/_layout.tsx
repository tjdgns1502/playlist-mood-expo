import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontFamily: "Pretendard-Bold", fontSize: 18 },
        tabBarStyle: {
          backgroundColor: "#0a0e18",
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: { fontFamily: "Pretendard", fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarLabel: "홈",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: "분석",
          tabBarLabel: "분석",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "리포트",
          tabBarLabel: "리포트",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarLabel: "설정",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
