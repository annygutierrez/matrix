import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
  openModal(title: string, message?: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);