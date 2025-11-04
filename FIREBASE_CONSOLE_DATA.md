# Данные для Firebase Console

## iOS App Configuration

```
Bundle ID: com.matthew3dgnewarctest
App Nickname: Matthew3dgNewArcTest iOS
Team ID: [Ваш Apple Developer Team ID]
```

## Android App Configuration

```
Package Name: com.matthew3dgnewarctest
App Nickname: Matthew3dgNewArcTest Android
SHA-1 Certificate Fingerprint: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
```

## Команда для получения SHA-1 fingerprint (Android Debug)

```bash
keytool -list -v -keystore android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

## Файлы для скачивания

После добавления приложений в Firebase Console скачайте и поместите:

### iOS

- Файл: `GoogleService-Info.plist`
- Путь: `ios/Matthew3dgNewArcTest/GoogleService-Info.plist`

### Android

- Файл: `google-services.json`
- Путь: `android/app/google-services.json`

## Проверка настройки

1. Запустите приложение
2. Нажмите "📋 Показать FCM Token" для получения токена
3. Используйте токен для отправки тестовых уведомлений из Firebase Console
