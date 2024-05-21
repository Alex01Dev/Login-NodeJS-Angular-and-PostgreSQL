import logging
import datetime

# Configurar el logger
logger = logging.getLogger('scraper_logger')
logger.setLevel(logging.INFO)

# Crear el formateador para la fecha y hora
formatter_datetime = logging.Formatter('%(asctime)s')

# Crear el formateador para los mensajes
formatter_message = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# Crear el manejador de archivo para el archivo de log
file_handler = logging.FileHandler('scraper_logs.log', encoding='utf-8')  # Especificar el encoding como 'utf-8'
file_handler.setFormatter(formatter_message)

# Agregar el manejador de archivo al logger
logger.addHandler(file_handler)

# Obtener la fecha y hora actual
current_datetime = datetime.datetime.now()

# Formatear la fecha y hora actual y escribir al archivo de log
formatted_current_datetime = current_datetime.strftime('%Y-%m-%d %H:%M:%S')
logger.info(f'Fecha y hora actual: {formatted_current_datetime}')
