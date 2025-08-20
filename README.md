# Demo Secure Card Viewer: Security Wallet

El presente repositorio es una PoC de una Wallet que contiene un módulo nativo en Kotlin para manejar la visualización de datos sensibles en las tarjetas.
El módulo nativo sólo existe en Kotlin.

## Diseño inicial

<img width="913" height="545" alt="image" src="https://github.com/user-attachments/assets/47c56243-ff75-43bc-ab3a-d62205a4cb9d" />

<img width="875" height="533" alt="image" src="https://github.com/user-attachments/assets/2a5ea000-d316-4c56-a2a3-60ec5b66adc0" />

<img width="875" height="533" alt="image" src="https://github.com/user-attachments/assets/c1088a9f-b29b-4ccf-9d60-63270feb2baa" />


## Video del resultado final de la PoC

- https://drive.google.com/file/d/1SEqnO_hv7cE-2vnHh59ayJQyuVb0O-Bs/view?usp=sharing

<img width="406" height="872" alt="image" src="https://github.com/user-attachments/assets/f48bc1bd-f82c-4fbe-9bdc-d12ee9776f9a" />

<img width="406" height="872" alt="image" src="https://github.com/user-attachments/assets/baa63d94-f4f5-45f7-ac17-3e00f24078bb" />

<img width="406" height="872" alt="image" src="https://github.com/user-attachments/assets/c4310af3-4473-47c9-a307-06dbbd9582c8" />

## Native Module in Kotlin: SecureViewer

``` js
<SecureViewer
      {...selectedCard}
      visible={selectedCard.visible}
      hmacSignature={selectedCard.hmacSignature}
      onPresented={({nativeEvent}) => console.log('presented', nativeEvent)}
      onClosed={({nativeEvent}) => {
          onCloseModal()
      }}
      onTimeout={({nativeEvent}) => {
          onCloseModal()
      }}
      onError={({nativeEvent}) => {
          handleError(nativeEvent)
      }}
  />

```

### `SecureViewer Props`

> Extiende los props de React Native **ViewProps** (e.g., `style`, `testID`, accessibility props).

| Prop            | Type                                                 | Required | Default | Description |
|-----------------|------------------------------------------------------|----------|---------|-------------|
| `visible`       | `boolean`                                            | Yes      | —       | Controla la visibilidad del modal. |
| `cardId`        | `string`                                             | Yes      | —       | Identificador único de la tarjeta. |
| `cardNumber`    | `string`                                             | Yes      | —       | Número de tarjeta formateado (e.g., `**** **** **** 1234`). |
| `cardNumberRaw` | `string`                                             | Yes      | —       | Número de tarjeta. |
| `cvv`           | `string`                                             | Yes      | —       | Código de verificación de pagos de la tarjeta. |
| `expiryMonth`   | `Int32`                                              | Yes      | —       | Mes de vencimiento (1–12). |
| `expiryYear`    | `Int32`                                              | Yes      | —       | Año de vencimiento (Debe tener 4 dígitos). |
| `cardholder`    | `string`                                             | Yes      | —       | Nombre completo del cliente. |
| `sessionToken`  | `string`                                             | Yes      | —       | Token de session. |
| `tokenExpiresAt`| `Double`                                             | Yes      | —       | Timestamp del `sessionToken`. |
| `hmacKey`       | `string`                                             | Yes      | —       | Secret key HMAC. |
| `hmacSignature` | `string`                                             | Yes      | —       | HMAC sobre el payload. |
| `onPresented`   | `DirectEventHandler<{ cardId: string }>`             | No       | —       | Se dispara cuando el componente se abre. |
| `onClosed`      | `DirectEventHandler<{ cardId: string; reason?: string }>` | No  | —       | Se dispara cuando el modal se cierra. `reason` es la propiedad con el detalle. |
| `onTimeout`     | `DirectEventHandler<{ cardId: string }>`             | No       | —       | Se dispara cuando hay un times out por sesión. |
| `onError`       | `DirectEventHandler<{ cardId: string; code: string; message: string }>` | No | — | Se dispara cuando hay un error. |

#### Event payload shapes

| Event        | Payload shape                                              |
|--------------|------------------------------------------------------------|
| `onPresented`| `{ cardId: string }`                                       |
| `onClosed`   | `{ cardId: string; reason?: string }`                      |
| `onTimeout`  | `{ cardId: string }`                                       |
| `onError`    | `{ cardId: string; code: string; message: string }`        |




# Pasos para iniciar el proyecto

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
