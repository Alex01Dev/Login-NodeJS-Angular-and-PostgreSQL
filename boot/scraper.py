from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import requests
from scraperLogs import *

def init_chrome():
    ruta_chromedriver = ChromeDriverManager().install()
    s = Service(ruta_chromedriver)
    options = Options()
    user_agent = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, como Gecko) "
                  "Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36")
    options.add_argument(f"user-agent={user_agent}")
    options.add_argument("--window-size=970,1080")
    options.add_argument("--disable-web-security")
    options.add_argument("--disable-extensions")
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--no-sandbox")
    options.add_argument("--allow-running-insecure-content")
    options.add_argument("--no-default-browser-check")
    options.add_argument("--no-first-run")
    options.add_argument("--no-proxy-server")
    options.add_argument("--disable-blink-features=AutomationControlled")

    exp_opt = [
        'enable-automation',
        'ignore-certificate-errors',
        'enable-logging'
    ]
    options.add_experimental_option("excludeSwitches", exp_opt)

    driver = webdriver.Chrome(service=s, options=options)
    driver.set_window_position(0, 0)

    return driver

def enviar_datos_api(nombre, descripcion, imagen_url):
    url = "http://localhost:3001/boot/insertBoot"  # Reemplaza con la URL de tu API
    headers = {"Content-Type": "application/json"}
    data = {
        "name": nombre,
        "description": descripcion,
        "image": imagen_url
    }
    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 201:
            logger.info(f"Datos enviados exitosamente a la API: {data}")
        else:
            logger.error(f"Error al enviar datos a la API: {response.status_code} - {response.text}")
    except requests.RequestException as e:
        logger.error(f"Error al enviar datos a la API: {e}")

def descargar_info_pokemon(pokemon):
    driver = init_chrome()
    logger.info("Entrando a la pagina......")
    try:
        logger.info(f"Iniciando descarga de información para el Pokémon: {pokemon}")
        driver.get(f"https://www.wikidex.net/wiki/{pokemon}")
        wait = WebDriverWait(driver, 10)

        nombre = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "h1.firstHeading"))).text

        descripcion_element = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "div.cuadro_pokemon")))
        descripcion = descripcion_element.text

        # Limpieza de la descripción
        lines = descripcion.split("\n")
        descripcion_limpia = ' '.join(line.strip() for line in lines if not line.startswith(("Nacional", "Johto", "Kalos", "Galar", "Paldea", "Datos", "Generación", "Categoría", "Tipo", "Habilidad", "Hab. oculta", "Peso", "Altura", "Grupos de huevo", "Sexo", "Color", "Figura", "Grito")))

        # Truncar la descripción si excede una longitud máxima
        MAX_LONGITUD_DESCRIPCION = 255
        descripcion_limpia = descripcion_limpia[:MAX_LONGITUD_DESCRIPCION]

        imagen_element = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "div.imagen")))
        imagen_url = imagen_element.find_element(By.TAG_NAME, "img").get_attribute("src")

        logger.info(f"Información descargada: {nombre}, {descripcion_limpia}, {imagen_url}")

        logger.info(f'Nombre: {nombre}' )
        logger.info(f'Descripcion: {descripcion_limpia}')
        logger.info(f'Imagen_URL: {imagen_url}' )
        enviar_datos_api(nombre, descripcion_limpia, imagen_url)
    
    except TimeoutException:
        logger.error(f"Error: No se pudo encontrar un elemento en la página para el Pokémon {pokemon}.")
    except NoSuchElementException:
        logger.error(f"Error: No se encontró un elemento en la página para el Pokémon {pokemon}.")
    except Exception as e:
        logger.error(f"Error inesperado: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    pokemon = input("Ingrese el nombre del Pokémon: ")
    descargar_info_pokemon(pokemon)
