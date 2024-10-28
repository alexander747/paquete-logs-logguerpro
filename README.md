Propiedad importante en los headers que recibe es opcional llamado id-transaction, si recibe esta la colocara en todos los logs del flujo de la peticion, si no la recibe el paquete la crea con un identificador unico y tambien la devolvera en los headers. Para que esto funcione debe estar activado el middleware seguimientoMiddleware

configureLogs es una funcion que recibe como primer argumento un objeto con las configuraciones de logpro, y se debe inicializar en la raiz del proyecto obligatoriamente para que logpro este monitoreando los logs.

Datos del primer argumento:
    showDetailsLogs:boolean, opcional si no se envia por defecto es false, si se establece como true todos los logs que tenga el aplicativo saldran con un date, uuid, los headers de seguimiento si los tiene el tipo de log (info, error, warn) 

    separateLogswith: string, opcional, es el separador de argurmentos que se muestran por consola 

    captureHeaderInitialWith:string, se le pasa una cadena de texto la cual se buscara en los headers de las peticiones que llegan que empiecen con ese cadena de texto y las incluira en los logs  y se devolvera en los headers de respuesta

middleware seguimientoMiddleware:
    importante usar este middleware ya que sera el encargado de hacer el seguimiento de los logs, si no se activa este middleware no se capturaran los captureHeaderInitialWith ni tampoco id-transaction si es que viene en los headers ni tampoco lo devolvera en los headers de las peticiones.