import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

/**
 * Спецификация нативного модуля калькулятора
 * Этот интерфейс описывает типы и методы, которые будут доступны из JS
 */
export interface Spec extends TurboModule {
  // Метод сложения - теперь асинхронный для стабильности
  add(a: number, b: number): Promise<number>;

  // Метод умножения - теперь асинхронный для стабильности
  multiply(a: number, b: number): Promise<number>;

  // Асинхронный метод - вычисляет факториал числа
  // Возвращает Promise, так как может быть долгой операцией
  factorial(n: number): Promise<number>;

  // Метод с callback - вычисляет квадратный корень
  squareRoot(value: number, callback: (result: number) => void): void;

  // Метод, который возвращает строку с информацией о модуле
  getModuleInfo(): string;
}

/**
 * Регистрируем модуль в TurboModuleRegistry
 * 'NativeCalculator' - это имя модуля, которое будет использоваться для связи с нативным кодом
 */
export default TurboModuleRegistry.getEnforcing<Spec>('NativeCalculator');
