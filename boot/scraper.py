from selenium.webdriver.support.ui import WebDriverWait
import psycopg2
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import requests
import wget
from config_scraper import *


def init_chrome():
    ruta_chromedriver = ChromeDriverManager().install()
    s = Service(ruta_chromedriver)
    options = Options()
    user_agent = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) "
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

def mostrar_datos_tabla(conn):
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tb_pokemons")
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        cursor.close()
    except psycopg2.Error as e:
        print(f"Error al obtener los datos de la tabla: {e}")

def conectar_bd():
    DB_NAME = "login_node_db"
    DB_USER = "postgres"
    DB_PASSWORD = "alexfango04"
    DB_HOST = "localhost"
    DB_PORT = "5432"

    try:
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            client_encoding="UTF8"
        )
        print("Conexión exitosa a la base de datos PostgreSQL")
        return conn
    except psycopg2.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None


def insertar_pokemon(conn, name, description, image):
    try:
        cursor = conn.cursor()

        # Verificar si la tabla existe
        cursor.execute("""
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_name = 'tb_pokemons'
            )
        """)
        table_exists = cursor.fetchone()[0]

        # Si la tabla no existe, créala
        if not table_exists:
            cursor.execute("""
                CREATE TABLE tb_pokemons (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(250),
                    description TEXT,
                    image TEXT
                )
            """)
            conn.commit()
            print("Tabla 'tb_pokemons' creada exitosamente")

        # Insertar datos en la tabla
        cursor.execute("""
            INSERT INTO tb_pokemons (name, description, image) VALUES (%s, %s, %s)
        """, (name,description, image))
        conn.commit()
        cursor.close()
        print("Datos insertados exitosamente")
    except psycopg2.Error as e:
        print(f"Error al insertar datos: {e}")


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
            print("Datos enviados exitosamente a la API")
        else:
            print(f"Error al enviar datos a la API: {response.status_code}")
    except requests.RequestException as e:
        print(f"Error al enviar datos a la API: {e}")

def descargar_info_pokemon(pokemon, conn):
    driver = init_chrome()
    try:
        driver.get(f"https://www.wikidex.net/wiki/{pokemon}")
        wait = WebDriverWait(driver, 10)

        nombre = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "h1.firstHeading"))).text

        descripcion_element = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "div.cuadro_pokemon")))
        descripcion = descripcion_element.text

        imagen_element = wait.until(ec.presence_of_element_located((By.CSS_SELECTOR, "div.imagen")))
        imagen_url = imagen_element.find_element(By.TAG_NAME, "img").get_attribute("src")

        insertar_pokemon(conn, nombre, descripcion, imagen_url)
        enviar_datos_api(nombre, descripcion, imagen_url)

        print(f"Información de {pokemon} descargada, almacenada en la base de datos y enviada a la API exitosamente.")
    
    except TimeoutException:
        print(f"Error: No se pudo encontrar un elemento en la página para el Pokémon {pokemon}.")
    except NoSuchElementException:
        print(f"Error: No se encontró un elemento en la página para el Pokémon {pokemon}.")
    except Exception as e:
        print(f"Error inesperado: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    pokemon = input("Ingrese el nombre del Pokémon: ")
    conn = conectar_bd()
    if conn:
        descargar_info_pokemon(pokemon, conn)
        mostrar_datos_tabla(conn)
        conn.close()
