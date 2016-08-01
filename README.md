#Solución de Alberto Berroteran

## Resumen
El sistema está desarrollado como una SPA (Simple Page Application), usando como
base las herramientas:
- BackboneJS (Librerias para el manejo de SPA)
- Browserify (Manejador de dependencias)
- Foundation (CSS),
- HandleBars (Plantillas)
- Gulp (Automatizador de tareas)

##Modificaciones del Back-End
Se hicieron unas pequeñas modificaciones en el BackEnd para adaptarlo a la forma
de funcionar de BackBone (las colleciones son Array, no objetos). Los cambios están dentro
del repositiorio.

## Como hacerlo funcionar

Una vez descargado el repositorio hacer:
```
cd frontend
bower install
npm install
gulp all
```

El último comando debe generar dos directorios **css** y **js**

Proceder a ejecutar el backend con las instrucciones antes dadas. La aplicación
podrá vizualizarse entonce en `http://localhost:3000`
