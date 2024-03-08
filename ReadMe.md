# My React Native App

This is a React Native application for demo Assignment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the application, make sure you have the following software installed on your development machine:

- Node.js (v12 or higher)
- npm (or yarn)
- React Native CLI
- Xcode (for iOS development, Mac only)
- Android Studio (for Android development)

### Installing
Navigate into the project directory:
cd SeqxDemo
npm install/yarn install

### iOS

1) npx react-native run-ios
2) This command will build the iOS app and launch it in the iOS Simulator. Make sure you have Xcode installed on your Mac.
3) Open the project in Xcode:
4) open ios/YourApp.xcworkspace
5) Select the target device and build configuration.
6) Click on "Product" in the top menu, then "Archive".
Follow the instructions in Xcode to distribute the app.


### Android

1) npx react-native run-android
2) Before running the app on an Android emulator or device, start an Android emulator or connect a physical device to your computer.
3) cd android && ./gradlew assembleRelease
4) The APK file will be generated in android/app/build/outputs/apk/release.
