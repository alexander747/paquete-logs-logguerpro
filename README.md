configureLogs es una funcion que recibe como primer argumento un objeto con las configuraciones de logpro, y se debe inicializar en la raiz del proyecto obligatoriamente para que logpro este monitoreando los logs.

Datos del primer argumento:
    showDetailsLogs:boolean, opcional si no se envia por defecto es false, si se establece como true todos los logs que tenga el aplicativo saldran con un date, uuid, los headers de seguimiento si los tiene el tipo de log (info, error, warn) 

    separateLogswith: string, opcional, es el separador de argurmentos que se muestran por consola 

    captureHeaderInitialWith:string, se le pasa una cadena de texto la cual se buscara en los headers de las peticiones que llegan que empiecen con ese cadena de texto y las incluira en los logs  y se devolvera en los headers de respuesta