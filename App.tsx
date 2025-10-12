/**
 * Sample React Native App - Testing NativeCalculator Module
 * Демонстрация работы с Turbo Native Module и Codegen
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  useColorScheme,
} from 'react-native';

// Импортируем наш нативный модуль
import NativeCalculator from './specs/NativeCalculator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [num1, setNum1] = useState('5');
  // const [num2, setNum2] = useState('3');
  const [result, setResult] = useState('');
  const [moduleInfo, setModuleInfo] = useState('');

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

  return (
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
            <Text style={styles.buttonText}>🔢 Факториал (async/Promise)</Text>
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
          <Text style={[styles.descriptionText, isDarkMode && styles.darkText]}>
            • <Text style={styles.bold}>Асинхронные (Promise)</Text>: add,
            multiply, factorial используют async/await
          </Text>
          <Text style={[styles.descriptionText, isDarkMode && styles.darkText]}>
            • <Text style={styles.bold}>Callback</Text>: squareRoot передаёт
            результат через функцию
          </Text>
          <Text style={[styles.descriptionText, isDarkMode && styles.darkText]}>
            • <Text style={styles.bold}>Синхронные</Text>: getModuleInfo
            возвращает строку сразу
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  darkText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  darkInput: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
    color: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  asyncButton: {
    backgroundColor: '#34C759',
  },
  callbackButton: {
    backgroundColor: '#FF9500',
  },
  infoButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  darkResultContainer: {
    backgroundColor: '#2a2a2a',
    borderColor: '#007AFF',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  infoContainer: {
    backgroundColor: '#E8E8ED',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  darkInfoContainer: {
    backgroundColor: '#2a2a2a',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  descriptionContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default App;
