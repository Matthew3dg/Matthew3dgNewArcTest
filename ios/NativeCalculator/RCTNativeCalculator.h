//
//  RCTNativeCalculator.h
//  Matthew3dgNewArcTest
//
//  Заголовочный файл для нативного модуля калькулятора
//

#import <Foundation/Foundation.h>
#import <NativeCalculatorSpec/NativeCalculatorSpec.h>

NS_ASSUME_NONNULL_BEGIN

/**
 * Объявление класса RCTNativeCalculator
 * Этот класс будет реализовывать протокол NativeCalculatorSpec,
 * который автоматически генерируется Codegen на основе нашей TypeScript спецификации
 */
@interface RCTNativeCalculator : NSObject <NativeCalculatorSpec>

@end

NS_ASSUME_NONNULL_END

