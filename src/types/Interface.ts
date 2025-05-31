export interface Task {
  task: string;
  title: string;
  description: string;
  colorCode: string;
  [key: string]: any; 
}

export type RootStackParamList = {
  Home: { scannedCode: string };
  QRScanner: undefined;

};
