# Kadrometer_Spring_Angualr_API
## Project Overview
The project aims to streamline employee payroll management and work supervision with the capability of easily extracting data, for instance, into PDFs sorted according to custom guidelines, generating ready-made employee hour logs within a specified range, sorted as required.

## **🚀 The project model:**
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/4225d85b-0db9-4de1-849f-0662f5dd45f8)

## **💻 Technologies:**
Back-end
![Java](https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white) ![Spring](https://img.shields.io/badge/-Spring-6DB33F?style=flat-square&logo=spring&logoColor=white) ![Hibernate](https://img.shields.io/badge/-Hibernate-59666C?style=flat-square&logo=hibernate&logoColor=white) ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![PostgreSql](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![InteliJ](https://img.shields.io/badge/-IntelliJ%20IDEA-000000?style=flat-square&logo=intellij-idea&logoColor=white) ![Maven](https://img.shields.io/badge/-Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white) 

Front-end
![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular&logoColor=white)

UI/UX
![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

## **✏️ How to run it:**

1. Configure the database in your application properties on your computer.
2. Run the backend, for example in IntelliJ IDEA. The tables will be created automatically if you have a good connection to the database.
3. Start the frontend, for example in Visual Studio Code, using the command in the terminal "ng serve".

## **📚 The look of website:**
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/18286c04-8a49-454a-9bbe-21805c4829bc)
USER:
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/bcce4d45-aae1-4aa9-90cd-1f46afa00d56)
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/9288552f-74f2-4401-b44e-68b2d1f0602e)
ADMIN:
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/a8d269da-5da7-4e36-84a3-e7f5b38a7b7f)
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/29c869bd-cc50-4e50-a1f4-cb3590e6c68f)
Pdf with hours:
![image](https://github.com/mat-rys/Kadrometer_Spring_Angualr_API/assets/98847639/b6b7d888-70e7-4a69-8637-15c9a1d700cb)

## Endpoints

### Login
Method: POST  
Path: `/login`
#### Description:
Endpoint used for user login.
#### Request Parameters:
```json
{
  "userEmail": "string",
  "userPassword": "string"
}
```

## Registration 
- Method: POST
- Path: `/register`
#### Description:
This endpoint is used for user registration.
#### Request Parameters:
```json
{
  "userEmail": "string",
  "userPassword": "string",
  "role": "string",
  "name": "string",
  "surname": "string",
  "position": "string"
}
```



