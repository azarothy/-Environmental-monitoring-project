import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.GeoSense.app",
  appName: "GeoSense",
  webDir: "out",
  server: {
    androidScheme: "https"
  }
};

export default config;
  