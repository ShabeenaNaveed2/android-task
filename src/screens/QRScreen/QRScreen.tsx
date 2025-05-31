import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/Interface';
import { styles } from './styles'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QRScanner'>;

const QRScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const navigation = useNavigation<NavigationProp>();
  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take photos',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleImageResponse = async (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Unknown error');
    } else if (response.assets && response.assets[0].uri) {
      const uri = response.assets[0].uri;
      setImageUri(uri);
      recognizeTextFromImage(uri);
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      launchCamera({ mediaType: 'photo' }, handleImageResponse);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to take pictures');
    }
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, handleImageResponse);
  };

  const recognizeTextFromImage = async (uri: string) => {
    try {
      const result = await TextRecognition.recognize(uri);
      const extractedText = result.text.trim();
      setRecognizedText(extractedText);

      if (extractedText.length > 0) {
        navigation.navigate('Home', { scannedCode: extractedText });
      } else {
        Alert.alert('No text found', 'No recognizable text was found in the image.');
      }
    } catch (error) {
      console.error('Text recognition failed:', error);
      Alert.alert('Error', 'Text recognition failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Text Scanner</Text>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Scan Options</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={openCamera} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}> Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}> Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
      {imageUri && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        </View>
      )}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Recognized Text</Text>
        <Text style={styles.resultText}>
          {recognizedText || 'No text recognized yet.'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default QRScreen;
