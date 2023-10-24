# registrAPP_BarrosPacheco_008D

instalar node.js, luego instalar angular en el cmd (windows+r "cmd") con el siguiente comando: npm install -g @angular/cli
instalar el framework de ionic en el cmd con el siguiente comando: npm install –g @ionic/cli

luego para instalar json server hay que ejecutar el siguiente comando en el cmd: npm install -g json-server
Luego debemos configurar nuestro server:
En nuestra carpeta de proyecto MyApp (src-app), 
creamos una carpeta llamada data. 
En esta carpeta, esta el json llamado docentes.json
En cmd, ingresamos a la carpeta data y ejecutamos: json-server --watch docentes.json --host 0.0.0.0 --port 3300

una vez todo configurado se puede usar la app en el localhost.
