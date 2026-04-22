const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY ?? process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

module.exports = {
  expo: {
    name: "Sua Cidade Mais Limpa",
    slug: "sua-cidade-mais-limpa",
    version: "1.0.1",
    buildNumber: "3",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      bundleIdentifier: "com.techurb.suacidademaislimpa",
      supportsTablet: true,
      config: {
        googleMapsApiKey: googleMapsApiKey
      }
    },
    android: {
      googleServicesFile: "./android/app/google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.techurb.suacidademaislimpa",
      config: {
        googleMaps: {
          apiKey: googleMapsApiKey
        }
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "804d6293-1977-4b0b-8863-1bb26e3a3945"
      },
      googleMapsApiKey: googleMapsApiKey
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/adaptive-icon.png",
          color: "#1CB788"
        }
      ],
      [
        "expo-location",
        {
          locationAlwaysPermission: "Permitir que $(PRODUCT_NAME) use sua localização para te enviar quando uma coleta chegará.",
          locationWhenInUsePermission: "Permitir $(PRODUCT_NAME) use sua localização para mostrar a coleta de lixo mais perto de você.",
          isAndroidForegroundServiceEnabled: true
        }
      ],
    ]
  }
};
