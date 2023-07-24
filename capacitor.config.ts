import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'time-since',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
