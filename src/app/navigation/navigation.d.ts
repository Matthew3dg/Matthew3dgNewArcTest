import type { TabParamList } from './types';

declare global {
  // global namespace for the React Navigation types
  namespace ReactNavigation {
    // namespace for the React Navigation types
    interface RootParamList extends TabParamList {}
  }
}
export {}; // empty export to satisfy the type checker
