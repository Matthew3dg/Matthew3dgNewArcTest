/**
 * Оптимизированный WebView компонент с современными настройками
 * Включает обработку ошибок, состояния загрузки и производительность
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { WebView } from 'react-native-webview';

interface OptimizedWebViewProps {
  url: string;
  title?: string;
  onNavigationStateChange?: (navState: any) => void;
  onError?: (error: any) => void;
  onLoadEnd?: () => void;
  style?: any;
}

const OptimizedWebView: React.FC<OptimizedWebViewProps> = ({
  url,
  title = 'WebView',
  onNavigationStateChange,
  onError,
  onLoadEnd,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef<WebView>(null);

  // Обработка начала загрузки
  const handleLoadStart = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  // Обработка завершения загрузки
  const handleLoadEnd = useCallback(() => {
    setLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  // Обработка ошибок
  const handleError = useCallback(
    (syntheticEvent: any) => {
      const { nativeEvent } = syntheticEvent;
      const errorMessage = `Ошибка загрузки: ${
        nativeEvent.description || 'Неизвестная ошибка'
      }`;
      setError(errorMessage);
      setLoading(false);
      onError?.(nativeEvent);
      console.error('WebView Error:', nativeEvent);
    },
    [onError],
  );

  // Обработка изменения состояния навигации
  const handleNavigationStateChange = useCallback(
    (navState: any) => {
      setCanGoBack(navState.canGoBack);
      setCanGoForward(navState.canGoForward);
      onNavigationStateChange?.(navState);
    },
    [onNavigationStateChange],
  );

  // Навигация назад
  const goBack = useCallback(() => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  }, [canGoBack]);

  // Навигация вперед
  const goForward = useCallback(() => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  }, [canGoForward]);

  // Перезагрузка страницы
  const reload = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, []);

  // JavaScript код для инжекции (оптимизация производительности)
  const injectedJavaScript = `
    // Отключаем контекстное меню для лучшей производительности
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    
    // Оптимизация скролла
    document.addEventListener('touchstart', function(e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Уведомляем React Native о готовности
    window.ReactNativeWebView.postMessage('pageLoaded');
    
    true; // Обязательно возвращаем true
  `;

  // Обработка сообщений от WebView
  const handleMessage = useCallback((event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      console.log('Message from WebView:', message);
    } catch {
      console.log('Message from WebView:', event.nativeEvent.data);
    }
  }, []);

  return (
    <View style={[styles.container, style]}>
      {/* Панель навигации */}
      <View
        style={[styles.navigationBar, isDarkMode && styles.darkNavigationBar]}
      >
        <Text style={[styles.title, isDarkMode && styles.darkText]}>
          {title}
        </Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, !canGoBack && styles.disabledButton]}
            onPress={goBack}
            disabled={!canGoBack}
          >
            <Text style={[styles.navButtonText, isDarkMode && styles.darkText]}>
              ←
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, !canGoForward && styles.disabledButton]}
            onPress={goForward}
            disabled={!canGoForward}
          >
            <Text style={[styles.navButtonText, isDarkMode && styles.darkText]}>
              →
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={reload}>
            <Text style={[styles.navButtonText, isDarkMode && styles.darkText]}>
              ↻
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Индикатор загрузки */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>
            Загрузка...
          </Text>
        </View>
      )}

      {/* Обработка ошибок */}
      {error && (
        <View
          style={[
            styles.errorContainer,
            isDarkMode && styles.darkErrorContainer,
          ]}
        >
          <Text style={[styles.errorText, isDarkMode && styles.darkText]}>
            {error}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={[styles.webview, loading && styles.webviewLoading]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        // Оптимизации производительности
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // Безопасность
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // Кэширование
        cacheEnabled={true}
        cacheMode="LOAD_DEFAULT"
        // Отключение ненужных функций для производительности
        allowsBackForwardNavigationGestures={true}
        allowsLinkPreview={false}
        // Настройки для iOS
        bounces={false}
        scrollEnabled={true}
        // Настройки для Android
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={false}
        // Дополнительные оптимизации
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkNavigationBar: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  darkText: {
    color: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    zIndex: 1000,
  },
  darkErrorContainer: {
    backgroundColor: '#2a2a2a',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  webview: {
    flex: 1,
  },
  webviewLoading: {
    opacity: 0.3,
  },
});

export default OptimizedWebView;
