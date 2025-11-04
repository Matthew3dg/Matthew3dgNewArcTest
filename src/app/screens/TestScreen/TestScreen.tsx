/**
 * Sample React Native App - Testing NativeCalculator Module
 * Демонстрация работы с Turbo Native Module и Codegen
 *
 * @format
 */

import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  useColorScheme,
} from 'react-native';

import { styles } from './styles';

// Импортируем наш нативный модуль
import NativeCalculator from '../../../../specs/NativeCalculator';

// Импортируем оптимизированный WebView
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import OptimizedWebView from '../../../shared/components/OptimizedWebView';
import { TabScreenProps } from '../../navigation/types';

function TestScreen(_props: TabScreenProps<'Test'>) {
  const isDarkMode = useColorScheme() === 'dark';
  const [num1, setNum1] = useState('5');
  // const [num2, setNum2] = useState('3');
  const [result, setResult] = useState('');
  const [moduleInfo, setModuleInfo] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('https://reactnative.dev');

  // Тест метода add (теперь асинхронный)
  // const testAdd = async () => {
  //   try {
  //     const a = parseFloat(num1);
  //     const b = parseFloat(num2);
  //     const sum = await NativeCalculator.add(a, b);
  //     setResult(`${a} + ${b} = ${sum}`);
  //     console.log('[JS] Add result:', sum);
  //   } catch {
  //     Alert.alert('Ошибка', 'Не удалось выполнить сложение');
  //   }
  // };

  // Тест метода multiply (теперь асинхронный)
  // const testMultiply = async () => {
  //   try {
  //     const a = parseFloat(num1);
  //     const b = parseFloat(num2);
  //     const product = await NativeCalculator.multiply(a, b);
  //     setResult(`${a} × ${b} = ${product}`);
  //     console.log('[JS] Multiply result:', product);
  //   } catch {
  //     Alert.alert('Ошибка', 'Не удалось выполнить умножение');
  //   }
  // };

  // Тест асинхронного метода factorial
  const testFactorial = async () => {
    try {
      const n = parseFloat(num1);
      setResult('Вычисляю факториал...');
      const fact = await NativeCalculator.factorial(n);
      setResult(`${n}! = ${fact}`);
      console.log('[JS] Factorial result:', fact);
    } catch (error: any) {
      Alert.alert('Ошибка', error.message || 'Не удалось вычислить факториал');
      setResult('Ошибка при вычислении факториала');
    }
  };

  // Тест метода с callback - squareRoot
  const testSquareRoot = () => {
    try {
      const value = parseFloat(num1);
      setResult('Вычисляю квадратный корень...');
      NativeCalculator.squareRoot(value, sqrt => {
        setResult(`√${value} = ${sqrt.toFixed(2)}`);
        console.log('[JS] Square root result:', sqrt);
      });
    } catch {
      Alert.alert('Ошибка', 'Не удалось вычислить квадратный корень');
    }
  };

  // Тест метода getModuleInfo
  const testModuleInfo = () => {
    try {
      const info = NativeCalculator.getModuleInfo();
      setModuleInfo(info);
      console.log('[JS] Module info:', info);
      Alert.alert('Информация о модуле', info);
    } catch {
      Alert.alert('Ошибка', 'Не удалось получить информацию о модуле');
    }
  };

  // Функции для работы с WebView
  const openWebView = (url: string) => {
    setWebViewUrl(url);
    setShowWebView(true);
  };

  const closeWebView = () => {
    setShowWebView(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.container, isDarkMode && styles.darkContainer]}
      >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Text style={[styles.title, isDarkMode && styles.darkText]}>
              🧮 Native Calculator
            </Text>
            <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
              Тестирование Turbo Native Module
            </Text>
          </View>

          {/* Поля ввода */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              {/* <Text style={[styles.label, isDarkMode && styles.darkText]}>
              Число 1:
            </Text> */}
              <TextInput
                style={[styles.input, isDarkMode && styles.darkInput]}
                value={num1}
                onChangeText={setNum1}
                keyboardType="numeric"
                placeholder="Введите число"
                placeholderTextColor={isDarkMode ? '#666' : '#999'}
              />
            </View>
            {/* <View style={styles.inputWrapper}>
            <Text style={[styles.label, isDarkMode && styles.darkText]}>
              Число 2:
            </Text>
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              value={num2}
              onChangeText={setNum2}
              keyboardType="numeric"
              placeholder="Введите число"
              placeholderTextColor={isDarkMode ? '#666' : '#999'}
            />
          </View> */}
          </View>

          {/* Кнопки операций */}
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.button} onPress={testAdd}>
            <Text style={styles.buttonText}>➕ Сложение (async)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={testMultiply}>
            <Text style={styles.buttonText}>✖️ Умножение (async)</Text>
          </TouchableOpacity> */}

            <TouchableOpacity
              style={[styles.button, styles.asyncButton]}
              onPress={testFactorial}
            >
              <Text style={styles.buttonText}>
                🔢 Факториал (async/Promise)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.callbackButton]}
              onPress={testSquareRoot}
            >
              <Text style={styles.buttonText}>
                √ Квадратный корень (callback)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.infoButton]}
              onPress={testModuleInfo}
            >
              <Text style={styles.buttonText}>ℹ️ Информация о модуле</Text>
            </TouchableOpacity>
          </View>

          {/* WebView кнопки */}
          <View style={styles.webViewSection}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              🌐 WebView Демонстрация
            </Text>
            <View style={styles.webViewButtons}>
              <TouchableOpacity
                style={[styles.button, styles.webViewButton]}
                onPress={() => openWebView('https://reactnative.dev')}
              >
                <Text style={styles.buttonText}>📱 React Native Docs</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.webViewButton]}
                onPress={() => openWebView('https://github.com')}
              >
                <Text style={styles.buttonText}>🐙 GitHub</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.webViewButton]}
                onPress={() => openWebView('https://www.google.com')}
              >
                <Text style={styles.buttonText}>🔍 Google</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Результат */}
          {result !== '' && (
            <View
              style={[
                styles.resultContainer,
                isDarkMode && styles.darkResultContainer,
              ]}
            >
              <Text style={[styles.resultLabel, isDarkMode && styles.darkText]}>
                Результат:
              </Text>
              <Text style={[styles.resultText, isDarkMode && styles.darkText]}>
                {result}
              </Text>
            </View>
          )}

          {/* Информация о модуле */}
          {moduleInfo !== '' && (
            <View
              style={[
                styles.infoContainer,
                isDarkMode && styles.darkInfoContainer,
              ]}
            >
              <Text style={[styles.infoText, isDarkMode && styles.darkText]}>
                {moduleInfo}
              </Text>
            </View>
          )}

          {/* Описание */}
          <View style={styles.descriptionContainer}>
            <Text
              style={[styles.descriptionTitle, isDarkMode && styles.darkText]}
            >
              Типы методов:
            </Text>
            <Text
              style={[styles.descriptionText, isDarkMode && styles.darkText]}
            >
              • <Text style={styles.bold}>Асинхронные (Promise)</Text>: add,
              multiply, factorial используют async/await
            </Text>
            <Text
              style={[styles.descriptionText, isDarkMode && styles.darkText]}
            >
              • <Text style={styles.bold}>Callback</Text>: squareRoot передаёт
              результат через функцию
            </Text>
            <Text
              style={[styles.descriptionText, isDarkMode && styles.darkText]}
            >
              • <Text style={styles.bold}>Синхронные</Text>: getModuleInfo
              возвращает строку сразу
            </Text>
          </View>
        </ScrollView>

        {/* WebView Modal */}
        {showWebView && (
          <SafeAreaView style={styles.webViewModal}>
            <View style={styles.webViewHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeWebView}
              >
                <Text style={styles.closeButtonText}>✕ Закрыть</Text>
              </TouchableOpacity>
            </View>
            <OptimizedWebView
              url={webViewUrl}
              title="WebView"
              onNavigationStateChange={navState => {
                console.log('Navigation state changed:', navState);
              }}
              onError={error => {
                console.error('WebView error:', error);
                Alert.alert('Ошибка WebView', 'Не удалось загрузить страницу');
              }}
              onLoadEnd={() => {
                console.log('WebView loaded successfully');
              }}
              style={styles.webViewContainer}
            />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default TestScreen;
