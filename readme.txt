PRUEBA TECNICA PERFORMANCE EJERCICIO 1 - PRUEBA DE CARGA LOGIN (K6)
===================================================================
Automatización de prueba de performance utilizando Grafana k6.


1. VERSIONES DE LAS TECNOLOGIAS UTILIZADAS
------------------------------------------
- K6 v2.4.0
- Windows 11

2. ESTRUCTURA DEL PROYECTO
--------------------------
- data/
    users.csv             Archivo CSV parametrizado con los 5 usuarios (user,passwd)
- scripts/
    login-load.js         Script de prueba de carga en k6 (>= 20 TPS, checks, thresholds y generación de reportes)
- reports/
    summary.html          Reporte visual HTML generado al finalizar la ejecución
    summary.json          Métricas detalladas de la ejecución exportadas en formato JSON
    console-output.txt    Resumen de ejecución en texto plano con validación de umbrales
- readme.txt              Instrucciones paso a paso de ejecución y versiones
- conclusiones.txt        Hallazgos y conclusiones de la prueba de carga


3. INSTALACION PASO A PASO
--------------------------
Paso 1: Clonar el repositorio e ingresar a la carpeta del proyecto:
    git clone https://github.com/Jegomezre/PruebaTecnicaPerformanceEjercicio1.git
    cd PruebaTecnicaPerformanceEjercicio1

4. EJECUCION DE LA PRUEBA DE CARGA
----------------------------------
Desde la raíz del proyecto, ejecutar el script de carga:
    k6 run scripts/login-load.js


5. VISUALIZACION DE REPORTES Y EVIDENCIAS
-----------------------------------------
Cada vez que finaliza la ejecución, la función handleSummary() del script actualiza automáticamente tres insumos dentro de la carpeta "reports/" (ya incluidos en el repositorio con los resultados de la corrida):

- reports/summary.html: Abrir este archivo en cualquier navegador web para visualizar el dashboard con los TPS alcanzados, percentiles de tiempo de respuesta, checks y estado de los thresholds.
- reports/console-output.txt: Resumen completo de consola generado por k6.
- reports/summary.json: Archivo JSON con todas las métricas crudas de la prueba.