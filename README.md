# 🚀 **User Management API**

## 📝 **Descripción General**

Esta API está diseñada para gestionar usuarios y permitir su autenticación.
Está desarrollada con **Express.js** y utiliza las siguientes herramientas y librerías principales:

- **Frameworks**: `passport.js`, `joi`, `jsonwebtoken (JWT)`
- **ORM**: `sequelize` (incluye migraciones para la base de datos PostgreSQL)
- **Encriptación**: Contraseñas codificadas con `bcrypt`

> La API permite el manejo de usuarios con roles: `admin`, `owner`, `director`, y `employee`.
> Además, los tokens de inicio de sesión tienen una duración de 15 minutos.

---

## 📌 **Base URL**

`inovateprowebapis.com/api/v1`
(URL ejemplificativa para proteger la real y evitar inserciones maliciosas)

---

## 📂 **Entidades**
### **/users**
Gestiona a los usuarios.

### **/auth**
Proporciona autenticación (login). No permite modificar o eliminar registros directamente.

---

## 🔑 **Endpoints**

### **1. Usuarios**
#### **GET** `/users`
Devuelve todos los usuarios registrados.

**Respuesta Ejemplo:**
```json
{
  "error": false,
  "status": 200,
  "body": [
    {
      "id": 1,
      "firstName": "Juan Pablo",
      "lastName": "Riglos",
      "role": "admin",
      "createdAt": "2024-12-18T12:53:50.540Z",
      "updatedAt": "2024-12-18T12:57:47.199Z"
    }
  ]
}
```

#### **GET** `/users/:id`
Obtiene un único usuario por su `id`.

#### **POST** `/users`
Crea un nuevo usuario. **Este endpoint no requiere autenticación.**

**Cuerpo del Request:**
```json
{
  "firstName": "Juan Pablo",
  "lastName": "Riglos",
  "email": "juanpabloriglos@gmail.com",
  "password": "12345678",
  "role": "employee" // Opcional, por defecto 'employee'
}
```

## Restricciones de los Campos:

>firstName: 
    Mínimo 3 caracteres.
>lastName: 
    Mínimo 2 caracteres.
>email: 
    Debe ser un correo electrónico válido.
>password: 
    Mínimo 8 caracteres.


**Respuesta Ejemplo:**
```json
{
  "error": false,
  "status": 201,
  "body": {
    "message": "Usuario y autenticación creados exitosamente",
    "user": {
      "id": 1,
      "firstName": "Juan Pablo",
      "lastName": "Riglos",
      "role": "employee",
      "createdAt": "2024-12-18T12:53:50.540Z",
      "updatedAt": "2024-12-18T12:53:50.541Z"
    }
  }
}
```

#### **PUT** `/users/:id`
Actualiza un usuario específico.

- **Autenticación requerida**: Proveer un `Bearer Token` en el encabezado.
- **Cuerpo del Request**: Datos a actualizar (mismos que al crear).

#### **DELETE** `/users/:id`
Elimina un usuario específico.

- **Autenticación requerida**: Proveer un `Bearer Token` en el encabezado.

---

### **2. Autenticación**
#### **POST** `/auth/login`
Permite a un usuario iniciar sesión.

**Cuerpo del Request:**
```json
{
  "email": "juanpabloriglos@gmail.com",
  "password": "12345678"
}
```

**Respuesta Ejemplo:**
```json
{
  "error": false,
  "status": 200,
  "body": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJlbXBsb3llZSIsImlhdCI6MTczNDUyNjYxMiwiZXhwIjoxNzM0NTMwMjEyfQ.ZunW4YZizxiMwfNQuuc3Xy1sm4nQcdrZh4XZNiRWCyY",
    "user": {
      "id": 1,
      "firstName": "Juan Pablo",
      "lastName": "Riglos",
      "role": "employee"
    }
  }
}
```

#### **GET** `/auth`
Devuelve todos los registros de la tabla `auth`.

---

## ⚙️ **Protección de Endpoints**

- Los endpoints protegidos requieren un **Bearer Token**.
- **Duración del token**: 15 minutos. Expirado este tiempo, será necesario iniciar sesión nuevamente.

---

## 💡 **Notas Importantes**
- Los roles de usuario controlan el acceso y las acciones permitidas en el frontend.
- El sistema de autenticación crea un registro separado para cada usuario en la tabla `auth`.
- La eliminación de un usuario elimina automáticamente su registro correspondiente en la tabla `auth` gracias a la relación en cascada.

---

## 🛠 **Tecnologías Utilizadas**

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)  
![Bcrypt](https://img.shields.io/badge/Bcrypt-339933?style=for-the-badge&logo=secure&logoColor=white)  

---

## 📬 **Contacto**

Para dudas o soporte, puedes contactarme en: **innovateproweb@gmail.com**.

