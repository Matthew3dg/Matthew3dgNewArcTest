import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export const TAB = {
  Home: 'Home',
  Test: 'Test',
} as const; // as const makes the object immutable

export type TabParamList = {
  [TAB.Home]: undefined; // undefined means no params
  [TAB.Test]: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;
