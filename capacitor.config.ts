import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2544c8e4f6c94da387b7e147b2c5bc12',
  appName: 'bankpros',
  webDir: 'dist',
  server: {
    url: 'https://2544c8e4-f6c9-4da3-87b7-e147b2c5bc12.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1f2937",
      showSpinner: false
    }
  }
};

export default config;