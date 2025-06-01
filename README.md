```text
Project Structure
📦 my-task-sync-app/
├── 📁 android/                    # Android native code
├── 📁 ios/                        # iOS native code
├── 📁 api/                        # API functions (token, task fetch)
│   └── Api.ts
├── 📁 components/                 # components
│   └── TaskItem.tsx
    └── FetchWorker.tsx
├── 📁 navigation/                # Navigation logic
│   └── AppNavigator.tsx
├── 📁 screens/                    # App screens
│   ├── 📁 HomeScreen/
│   │   ├── HomeScreen.tsx
│   │   └── styles.ts
│   └── 📁 QRScreen/
│       ├── QRScreen.tsx
│       └── styles.ts
├── 📁 storage/                    # AsyncStorage helpers
│   └── Storage.ts
├── 📁 types/                      # TypeScript interfaces
│   └── Interface.ts
├── 📁 assets/                     # Images, icons, fonts
│   ├── fonts/
│   └── icons/
├── 📁 background/                # Background service logic
│   └── BackgroundTask.ts
├── App.tsx                        # App root entry point
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies and scripts
├── README.md                      # Project overview
└── .gitignore                     # Git ignored files
```

**Technologies Used**
This React Native project utilizes a combination of modern libraries and tools for functionality, UI, and background operations:
```text
1.React Native CLI – Framework for building native mobile apps using JavaScript/TypeScript.
2. TypeScript – Static typing to enhance code reliability and maintainability.
3. React Navigation – For seamless screen navigation in the app.
4. Axios – To make HTTP requests to external APIs.
5. AsyncStorage – For local persistent storage of data.
6. react-native-background-actions – To perform background task syncing every 60 minutes.
7. react-native-image-picker – To capture or select an image from the device.
8. @react-native-ml-kit/text-recognition – For text extraction from scanned images.
9. react-native-elements – For prebuilt UI components (e.g., icons).
10. Custom Fonts & Colors – UI is styled using consistent font and color systems.
```
**To Start App**
Run: npx react-native run-android
