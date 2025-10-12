//
//  RCTNativeCalculator.mm
//  Matthew3dgNewArcTest
//
//  Реализация нативного модуля калькулятора для iOS
//  Расширение .mm указывает, что это Objective-C++ файл
//

#import "RCTNativeCalculator.h"

@implementation RCTNativeCalculator

// Указываем, что модуль не требует инициализации на главном потоке
// Это улучшает производительность, так как модуль может быть инициализирован в фоновом потоке
+ (BOOL)requiresMainQueueSetup {
  return NO;
}

/**
 * Метод getTurboModule - это связующее звено между JS и нативным кодом
 * Он возвращает shared_ptr на TurboModule, который генерируется Codegen
 * Этот метод вызывается React Native при первом обращении к модулю из JS
 */
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeCalculatorSpecJSI>(params);
}

/**
 * Синхронный метод: сложение двух чисел
 * Возвращает результат сразу, без использования Promise или callback
 * В JS это можно вызвать как: NativeCalculator.add(5, 3)
 */
- (double)add:(double)a b:(double)b {
  NSLog(@"[NativeCalculator] add called with a=%f, b=%f", a, b);
  return a + b;
}

/**
 * Синхронный метод: умножение двух чисел
 * В JS: NativeCalculator.multiply(4, 7)
 */
- (double)multiply:(double)a b:(double)b {
  NSLog(@"[NativeCalculator] multiply called with a=%f, b=%f", a, b);
  return a * b;
}

/**
 * Асинхронный метод: вычисление факториала
 * Использует RCTPromiseResolveBlock и RCTPromiseRejectBlock для работы с Promise в JS
 * В JS это возвращает Promise: await NativeCalculator.factorial(5)
 * 
 * Параметры:
 * - n: число для вычисления факториала
 * - resolve: блок для возврата успешного результата
 * - reject: блок для возврата ошибки
 */
- (void)factorial:(double)n
          resolve:(RCTPromiseResolveBlock)resolve
           reject:(RCTPromiseRejectBlock)reject {
  NSLog(@"[NativeCalculator] factorial called with n=%f", n);
  
  // Проверка на отрицательные числа
  if (n < 0) {
    reject(@"INVALID_INPUT", @"Factorial is not defined for negative numbers", nil);
    return;
  }
  
  // Проверка на слишком большие числа (чтобы избежать переполнения)
  if (n > 20) {
    reject(@"TOO_LARGE", @"Number is too large to calculate factorial", nil);
    return;
  }
  
  // Вычисляем факториал
  NSInteger intN = (NSInteger)n;
  long long result = 1;
  for (NSInteger i = 2; i <= intN; i++) {
    result *= i;
  }
  
  // Возвращаем результат через resolve
  resolve(@(result));
}

/**
 * Метод с callback: вычисление квадратного корня
 * Использует RCTResponseSenderBlock для передачи результата обратно в JS
 * В JS: NativeCalculator.squareRoot(16, (result) => console.log(result))
 * 
 * Параметры:
 * - value: число для извлечения корня
 * - callback: функция обратного вызова, которая получит результат
 */
- (void)squareRoot:(double)value callback:(RCTResponseSenderBlock)callback {
  NSLog(@"[NativeCalculator] squareRoot called with value=%f", value);
  
  // Проверка на отрицательные числа
  if (value < 0) {
    // Для callback мы передаем массив с результатом или ошибкой
    // В данном случае возвращаем NaN
    callback(@[@(NAN)]);
    return;
  }
  
  // Вычисляем квадратный корень
  double result = sqrt(value);
  
  // Callback всегда принимает массив аргументов
  callback(@[@(result)]);
}

/**
 * Синхронный метод: возвращает информацию о модуле
 * Демонстрирует работу с NSString
 * В JS: NativeCalculator.getModuleInfo()
 */
- (NSString *)getModuleInfo {
  NSLog(@"[NativeCalculator] getModuleInfo called");
  return @"NativeCalculator v1.0 - iOS Implementation using TurboModules and Codegen";
}

/**
 * Метод moduleName требуется для регистрации модуля в React Native
 * Это имя должно совпадать с именем, указанным в TurboModuleRegistry.getEnforcing()
 * в TypeScript спецификации
 */
+ (NSString *)moduleName {
  return @"NativeCalculator";
}

@end

