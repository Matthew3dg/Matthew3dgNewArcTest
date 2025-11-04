import messaging from '@react-native-firebase/messaging';
import { Platform, Alert, PermissionsAndroid } from 'react-native';

export interface PushNotificationData {
  title?: string;
  body?: string;
  data?: { [key: string]: string };
}

class PushNotificationService {
  private fcmToken: string | null = null;
  private onTokenRefreshCallback?: (token: string) => void;
  private onNotificationReceivedCallback?: (remoteMessage: any) => void;
  private onNotificationOpenedCallback?: (remoteMessage: any) => void;

  /**
   * Инициализация сервиса push уведомлений
   */
  async initialize(): Promise<void> {
    try {
      // Запрашиваем разрешения
      await this.requestPermissions();

      // Получаем FCM токен
      await this.getFCMToken();

      // Настраиваем слушатели
      this.setupMessageHandlers();

      console.log('Push notification service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize push notification service:', error);
      throw error;
    }
  }

  /**
   * Запрос разрешений на push уведомления
   */
  private async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        return true;
      } else {
        console.log('Push notification permission denied');
        return false;
      }
    } else {
      // Android
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Push Notifications',
            message: 'This app needs access to send you push notifications',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
  }

  /**
   * Получение FCM токена
   */
  private async getFCMToken(): Promise<void> {
    try {
      this.fcmToken = await messaging().getToken();
      console.log('FCM Token:', this.fcmToken);

      if (this.onTokenRefreshCallback) {
        this.onTokenRefreshCallback(this.fcmToken);
      }
    } catch (error) {
      console.error('Failed to get FCM token:', error);
    }
  }

  /**
   * Настройка обработчиков сообщений
   */
  private setupMessageHandlers(): void {
    // Обработка уведомлений когда приложение в foreground
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);

      if (this.onNotificationReceivedCallback) {
        this.onNotificationReceivedCallback(remoteMessage);
      }

      // Показываем локальное уведомление
      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title || 'Уведомление',
          remoteMessage.notification.body || '',
          [{ text: 'OK' }],
        );
      }
    });

    // Обработка нажатия на уведомление когда приложение в background/terminated
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );

      if (this.onNotificationOpenedCallback) {
        this.onNotificationOpenedCallback(remoteMessage);
      }
    });

    // Проверяем, было ли приложение открыто из-за уведомления
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );

          if (this.onNotificationOpenedCallback) {
            this.onNotificationOpenedCallback(remoteMessage);
          }
        }
      });

    // Слушатель обновления токена
    messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
      this.fcmToken = token;

      if (this.onTokenRefreshCallback) {
        this.onTokenRefreshCallback(token);
      }
    });
  }

  /**
   * Получение текущего FCM токена
   */
  getToken(): string | null {
    return this.fcmToken;
  }

  /**
   * Установка callback для обновления токена
   */
  onTokenRefresh(callback: (token: string) => void): void {
    this.onTokenRefreshCallback = callback;
  }

  /**
   * Установка callback для получения уведомлений
   */
  onNotificationReceived(callback: (remoteMessage: any) => void): void {
    this.onNotificationReceivedCallback = callback;
  }

  /**
   * Установка callback для открытия уведомлений
   */
  onNotificationOpened(callback: (remoteMessage: any) => void): void {
    this.onNotificationOpenedCallback = callback;
  }

  /**
   * Подписка на топик
   */
  async subscribeToTopic(topic: string): Promise<void> {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to subscribe to topic ${topic}:`, error);
      throw error;
    }
  }

  /**
   * Отписка от топика
   */
  async unsubscribeFromTopic(topic: string): Promise<void> {
    try {
      await messaging().unsubscribeFromTopic(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error(`Failed to unsubscribe from topic ${topic}:`, error);
      throw error;
    }
  }

  /**
   * Проверка разрешений
   */
  async hasPermission(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().hasPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } else {
      return true; // Android разрешения проверяются автоматически
    }
  }

  /**
   * Отправка локального уведомления (для тестирования)
   */
  async sendLocalNotification(
    title: string,
    body: string,
    data?: { [key: string]: string },
  ): Promise<void> {
    // В реальном приложении здесь можно использовать react-native-push-notification
    // или другую библиотеку для локальных уведомлений
    console.log('Local notification:', { title, body, data });
  }
}

// Экспортируем singleton instance
export const pushNotificationService = new PushNotificationService();
export default pushNotificationService;
