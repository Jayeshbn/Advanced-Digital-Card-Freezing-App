import { Tabs } from 'expo-router';
import { Home, Wallet as Wallet2, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarActiveTintColor: '#ff3b30',
        tabBarInactiveTintColor: '#666666',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="yolo-pay"
        options={{
          title: 'Yolo Pay',
          tabBarIcon: ({ color, size }) => <Wallet2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ginie"
        options={{
          title: 'Ginie',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}