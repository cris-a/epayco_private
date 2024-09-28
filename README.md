<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Virtual Wallet API - NestJS</title>
</head>
<body>

  <h1>API Billetera Virtual - NestJS</h1>

  <h2>Descripción</h2>
  <p>
    Este proyecto es una <strong>API REST</strong> desarrollada con <strong>NestJS</strong> que simula una billetera virtual. 
    Permite a los usuarios gestionar su saldo, realizar recargas y confirmar pagos mediante un sistema de autenticación segura con <strong>JWT</strong>. 
    Además, incluye la funcionalidad de envío de códigos de confirmación por correo electrónico para validar transacciones.
  </p>

  <h3>Características principales:</h3>
  <ul>
    <li><strong>Registro de usuarios</strong>: Permite registrar nuevos usuarios con validación de datos únicos como, documento de identidad, email y teléfono.</li>
    <li><strong>Recarga de saldo</strong>: Los usuarios pueden recargar su saldo proporcionando su documento, número de teléfono y valor a recargar.</li>
    <li><strong>Confirmación de pagos</strong>: Al realizar una compra, se genera un token de 6 dígitos enviado por correo, el cual debe ser confirmado antes de completar la transacción.</li>
    <li><strong>Descuento de saldo</strong>: Una vez confirmado el código de la transacción, se descuenta el saldo de la billetera del usuario.</li>
    <li><strong>Autenticación con JWT</strong>: Autenticación segura utilizando tokens JWT para proteger los endpoints sensibles.</li>
    <li><strong>Envío de correos electrónicos</strong>: Uso de <strong>MailerService</strong> para enviar códigos de confirmación a los correos de los usuarios.</li>
  </ul>

  <h2>Requisitos</h2>
  <ul>
    <li>Node.js (v14 o superior)</li>
    <li>NestJS (v8 o superior)</li>
    <li>MongoDB</li>
    <li>Herramienta de envío de correos (p.ej. SMTP, Mailtrap)</li>
  </ul>

  <h2>Instalación</h2>
  <ol>
    <li>Clona este repositorio:
      <pre>
        <code>git clone https://github.com/tu-usuario/virtual-wallet-api.git
cd virtual-wallet-api</code>
      </pre>
    </li>

  <li>Instala las dependencias:
    <pre>
      <code>npm install</code>
    </pre>
  </li>

  <li>Configura las variables de entorno en un archivo <strong>.env</strong>:
      <pre>
        <code>MONGO_URI=mongodb://localhost:27017/walletDB

JWT_SECRET=your_jwt_secret
EMAIL_HOST=your_host
EMAIL_USERNAME=your_email_user
EMAIL_PASSWORD=your_email_pass</code>

</pre>
</li>

  <li>Inicia la aplicación:
    <pre>
        <code>npm run start:dev</code>
    </pre>
  </li>

  </ol>

  <h2>Endpoints principales</h2>
  <ul>
    <li><strong>POST</strong> <code>/api/v1/clients/create</code> - Registro de usuarios</li>
    <li><strong>POST</strong> <code>/api/v1/balance/recarga</code> - Recarga de saldo en la billetera</li>
    <li><strong>GET</strong> <code>/api/v1/balance/:documentId/:phone</code> - Consultar el saldo de la billetera</li>
    <li><strong>POST</strong> <code>/api/v1/payments/create</code> - Creación de pagos usando el passowrd y el email</li>
    <li><strong>POST</strong> <code>/api/v1/payments/confirm</code> - Confirmación de pagos mediante un token enviado por email</li>
    <li><strong>GET</strong> <code>/api/v1/docs</code> - Acceso al area de pruebas</li>
  </ul>

  <h2>Estructura del proyecto</h2>
  <pre>
    <code>src/
├── clients/               # Módulo de clientes (registro, validación)
├── payments/              # Módulo de pagos (generación de tokens, confirmación)
├── balance/               # Módulo de billetera (recargas, consulta de saldo)
├── dto/                   # Objetos de transferencia de datos (DTOs)
├── helpers/               # Funciones auxiliares
├── models/                # Esquemas de Mongoose
└── app.module.ts          # Módulo principal
    </code>
  </pre>

  <h2>Tecnologías utilizadas</h2>
  <ul>
    <li><strong>NestJS</strong> - Framework backend para la construcción de aplicaciones escalables.</li>
    <li><strong>MongoDB</strong> - Base de datos NoSQL para almacenar los datos de los clientes y transacciones.</li>
    <li><strong>Mongoose</strong> - ODM para interactuar con MongoDB.</li>
    <li><strong>JWT</strong> - Tokens de autenticación.</li>
    <li><strong>MailerService</strong> - Servicio de envío de correos electrónicos para códigos de confirmación.</li>
    <li><strong>bcrypt</strong> - Cifrado de contraseñas de los usuarios.</li>
  </ul>

  <h2>Cómo contribuir</h2>
  <ol>
    <li>Haz un fork del proyecto.</li>
    <li>Crea una nueva rama para tu funcionalidad (<code>git checkout -b nueva-funcionalidad</code>).</li>
    <li>Haz commit de tus cambios (<code>git commit -m 'Agregar nueva funcionalidad'</code>).</li>
    <li>Sube tus cambios a la rama (<code>git push origin nueva-funcionalidad</code>).</li>
    <li>Crea un pull request.</li>
  </ol>

  <h2>Licencia</h2>
  <p>Este proyecto está bajo la licencia <strong>MIT</strong>. Puedes ver más detalles en el archivo <a href="LICENSE">LICENSE</a>.</p>

</body>
</html>
