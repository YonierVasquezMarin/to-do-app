# To-Do App

Una aplicación de lista de tareas desarrollada con Ionic/Angular y Cordova para plataformas móviles.

## Descripción

To-Do App es una aplicación móvil híbrida que permite gestionar tareas diarias. Desarrollada con el framework Ionic/Angular y empaquetada con Cordova para su distribución en plataformas móviles.

## Características

-   Interfaz de usuario intuitiva y responsive
-   Gestión completa de tareas (crear, editar, eliminar)
-   Soporte para múltiples plataformas (Android, iOS)
-   Almacenamiento local con Dexie (IndexedDB)

## Requisitos previos

-   Node.js y npm
-   Ionic CLI
-   Cordova
-   Android Studio con SDK para desarrollo Android
-   Gradle

## Instalación

1. Clonar el repositorio

```bash
git clone [url-del-repositorio]
cd to-do-app
```

2. Instalar dependencias

```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run start
```

La aplicación estará disponible en `http://localhost:4200/`.

## Compilación

### Preparación del entorno para Android

1. Instalar Android Studio junto con el SDK

    - Descargar e instalar desde [https://developer.android.com/studio](https://developer.android.com/studio)
    - Durante la instalación, asegurarse de incluir el SDK de Android

2. Instalar Gradle

    - Descargar la última versión desde [https://gradle.org/releases/](https://gradle.org/releases/)
    - Extraer el archivo descargado en una ubicación de su elección (por ejemplo, `C:\Gradle`)

3. Configurar las variables de entorno
    - Agregar Gradle a la variable de entorno PATH:
        - Variable: `PATH`
        - Valor a agregar: `C:\Gradle\gradle-x.x\bin` (reemplazar x.x con la versión instalada)
    - Opcionalmente, crear la variable GRADLE_HOME:
        - Variable: `GRADLE_HOME`
        - Valor: `C:\Gradle\gradle-x.x` (reemplazar x.x con la versión instalada)

### Compilar para Android

1. Agregar la plataforma Android

```bash
cordova platform add android@latest
```

2. Generar recursos para Android (iconos, splash screens)

```bash
cordova-res android
```

3. Compilar la aplicación Angular

```bash
npm run build
```

4. Compilar la aplicación para Android

```bash
npm run build:android
```

El archivo APK resultante se encontrará en la carpeta `platforms/android/app/build/outputs/apk/debug/`.

## Estructura del proyecto

-   `src/`: Código fuente de la aplicación Angular/Ionic
-   `www/`: Archivos generados para la web
-   `resources/`: Recursos gráficos (iconos, splash screens)
-   `platforms/`: Código específico de plataforma (Android, iOS)
-   `plugins/`: Plugins de Cordova

## Autor

Yonier Vasquez - [Github](https://github.com/YonierVasquezMarin)
