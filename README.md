
# Whatsapp Node

Con este proyecto se ha creado con el fin de buscar un chat interactivo entre usuarios y buscar una disponibilidad de los mensajes en tiempo real, así como la configuración e personalización del contenido personal de usuarios. Se permite el intercambio de archivos e imágenes así como descargar ambos contenidos.

Para acceder, [click aquí](https://whatsappnoderodrigo.onrender.com/)


## Contenido aprendido

Con este proyecto he aprendido:

- Gestión de eventos en nodeJs con socket.IO.
- Implementación de FireStore en nodeJs con librerías.
- Implementación de FireBase en React.
- Protección de rutas en React.
- Mensajes privados entre usuarios.
- Establecer imágenes propias de usuarios, así como almacenar y guardar la configuración de las mismas.
- Diferentes salas comunes donde los usuarios pueden interactuar de forma privada.
- Como permitir, gestionar y almacenar archivos así como la descarga de los mismos.
- Permitir a los usuarios configurar sus datos(nombre, estado y foto de perfil), a la hora de iniciar sesión y registrarse.

## Galería de imágenes
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/39772738-5b29-42c1-b4ff-ad08452e672b)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/42074bd2-fadd-4471-adb0-4cbf0a6ebd93)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/c9e11757-aefa-4c6a-98ad-3ad46c62def3)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/6f69c056-7d51-4be4-861d-344de817e240)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/eca9dc67-b935-4a8e-a14d-fc3336e9fa9b)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/339457cf-2e27-4d75-98f4-803338c8a743)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/414ed0d4-cfe5-46da-9ee1-e876eeee8b04)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/c4d2edcf-f4d6-4ca7-afda-66e914ceec6b)
![imagen](https://github.com/rodrigoespigares/WhatsappNode/assets/94736646/e7c33c17-ae50-4360-96ed-4149d9152172)


## Instalación

Para instalar este proyecto necesitaremos npm. Una vez clonado el repositorio:

```bash
  cd WhatsappNode
```

Dentro del proyecto deberemos:

```bash
  cd client
  npm install
  cd ..
  cd server
  npm install
  cd ..
```

De vuelta a la raíz podremos ejecutar el proyecto con los comandos, cada uno en una terminal diferente.

```bash
  npm run client
  npm run server
```


## Variables globales

Para este proyecto es imprescindible mantener una variable global de cara al hosting y publicación

`NODE_ENV = 'dev'`

`RENDER_EXTERNAL_URL = `  a la cadena con la url del proyecto en producción, deberá tener el formato: (protocolo)://(dominio):(puerto) 

>[!NOTE]
>En caso de no declarar la variable se pondrá "http://192.168.1.90:3000/" por defecto

`PORT = ` número de puerto libre en tu dominio

>[!NOTE]
>En caso de no declarar la variable se pondrá "3000" por defecto


## Autor

- [@rodrigoespigares](https://www.github.com/rodrigoespigares)

