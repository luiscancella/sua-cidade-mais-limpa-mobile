module.exports = {
  expo: {
    name: "sua-cidade-mais-limpa",
    slug: "sua-cidade-mais-limpa",
    version: "1.0.0",
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
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.anonymous.suacidademaislimpa",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
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
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Permitir que $(PRODUCT_NAME) use sua localização.",
          isAndroidForegroundServiceEnabled: true
        }
      ],
    ]
  }
};
