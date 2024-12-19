# Pokedex App

Este proyecto es una aplicación web desarrollada en **ReactJS** que utiliza la API [PokeAPI](https://pokeapi.co/) para mostrar información detallada sobre Pokémon. Incluye características como inicio de sesión, búsqueda de Pokémon, y un modal con información detallada.

---

## **Características principales**

1. **Pantalla de Login:**
   - Validación local de credenciales:
     - Usuario: `admin`
     - Contraseña: `admin`
   - Muestra mensajes claros si las credenciales son incorrectas.
   - Redirección automática según el estado de sesión.

2. **Página principal:**
   - Barra de búsqueda para encontrar Pokémon.
   - Consumo de la API de Pokémon con soporte para paginación.
   - Presentación de cada Pokémon con su nombre y foto.

3. **Vista detallada:**
   - Modal con detalles del Pokémon:
     - Habilidades (`abilities`).
     - Movimientos (`moves`).
     - Formas (`forms`).

4. **UI responsiva:**
   - Diseño atractivo utilizando **Material-UI** como base de CSS.

---

## **Tecnologías utilizadas**

- **ReactJS**: Framework principal para la creación de componentes y gestión de la UI.
- **Material-UI**: Librería de componentes estilizados para un diseño moderno y responsivo.
- **PokeAPI**: API pública utilizada para obtener datos de los Pokémon.
- **Context API**: Manejo del estado global para la autenticación y los datos de la aplicación.
- **Jest**: Framework de pruebas para garantizar la calidad del código.

---

## **Instalación y configuración**

Sigue los pasos a continuación para ejecutar el proyecto en tu máquina local:

### **Requisitos previos**

- Node.js instalado (versión 14 o superior).
- npm instalado (incluido con Node.js).

### **Pasos de instalación**

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu_usuario/pokedex-app.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd pokedex-app
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm i
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm start
   ```

   Esto abrirá la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000).

---

## **Pruebas**

Este proyecto incluye pruebas unitarias para garantizar el correcto funcionamiento de los componentes principales. Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm run test
```

---

## **Uso de la aplicación**

### **1. Iniciar sesión**
- Abre la aplicación y usa las credenciales:
  - Usuario: `admin`
  - Contraseña: `admin`

### **2. Buscar Pokémon**
- Usa la barra de búsqueda en la página principal para encontrar Pokémon por su nombre.
- Navega entre páginas utilizando los controles de paginación.

### **3. Ver detalles del Pokémon**
- Haz clic en cualquier Pokémon para abrir un modal con información detallada, como habilidades, movimientos y formas.

---

## **Arquitectura del proyecto**

El proyecto sigue una arquitectura basada en componentes, organizada en carpetas para facilitar el mantenimiento y la escalabilidad:

```
src/
├── components/       # Componentes reutilizables (barra de búsqueda, tarjetas de Pokémon, etc.)
├── pages/            # Páginas principales (Login, Página Principal, etc.)
├── context/          # Manejo del estado global con Context API
├── services/         # Servicios para consumir la API de Pokémon
├── styles/           # Estilos globales y personalizados con Material-UI
└── tests/            # Pruebas unitarias
```

---

## **API utilizada: PokeAPI**

El proyecto utiliza [PokeAPI](https://pokeapi.co/) para obtener datos sobre Pokémon, incluyendo:
- Información general (nombre, foto).
- Detalles avanzados (habilidades, movimientos, formas).

Consulta la documentación oficial de PokeAPI para más información.

---

## **Contribuciones**

¡Este proyecto está abierto a contribuciones! Si tienes ideas o mejoras, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu función o corrección:
   ```bash
   git checkout -b feature/nueva-funcion
   ```
3. Realiza tus cambios y sube los commits.
4. Envía un pull request con una descripción detallada de los cambios.

---

## **Contacto**

Si tienes preguntas o sugerencias, no dudes en contactarme:
- **Email:** tu_correo@example.com
- **GitHub:** [tu_usuario](https://github.com/tu_usuario)

---

¡Gracias por usar Pokedex App! 🚀