# import time
# import json
# import uuid
# from bs4 import BeautifulSoup
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from webdriver_manager.chrome import ChromeDriverManager


# def get_html_with_browser(url):
#     options = Options()
#     options.headless = True
#     options.add_argument("--no-sandbox")
#     options.add_argument("--disable-dev-shm-usage")
#     options.add_argument("--disable-gpu")

#     service = Service(ChromeDriverManager().install())
#     driver = webdriver.Chrome(service=service, options=options)

#     try:
#         driver.get(url)
#         WebDriverWait(driver, 15).until(
#             EC.presence_of_element_located((By.CLASS_NAME, "core-chords-wrapper"))
#         )
#         time.sleep(1)
#         html = driver.page_source
#     except Exception as e:
#         print("Timeout waiting for content:", e)
#         html = driver.page_source
#     finally:
#         driver.quit()

#     return html


# def parse_lyrics_lines(html):
#     soup = BeautifulSoup(html, "html.parser")

#     # Try old <pre> tag method
#     pre_tag = soup.find("pre")
#     if pre_tag:
#         lines = pre_tag.get_text().split("\n")
#         return [[{"lyrics": line}] for line in lines if line.strip()]

#     # New layout parsing
#     wrapper = soup.select_one(".core-chords-wrapper")
#     if not wrapper:
#         return []

#     lyric_lines = []
#     current_line = []

#     for element in wrapper.find_all(["span", "br"]):
#         if element.name == "br":
#             if current_line:
#                 lyric_lines.append(current_line)
#                 current_line = []
#         elif element.name == "span":
#             chord = element.get("data-chord")
#             text = element.get_text(strip=True)
#             if text:
#                 if chord:
#                     current_line.append({"lyrics": text, "chords": chord})
#                 else:
#                     current_line.append({"lyrics": text})

#     if current_line:
#         lyric_lines.append(current_line)

#     return lyric_lines


# def extract_metadata(soup):
#     title_tag = soup.find("title")
#     name = title_tag.get_text().strip() if title_tag else "Unknown Song"

#     # Fallback example for artist
#     artist_img = soup.find("img", {"src": True})
#     imageUrl = artist_img["src"] if artist_img else "/favicon.ico"

#     artist_name = "Unknown Artist"
#     if imageUrl and "/" in imageUrl:
#         candidate = imageUrl.split("/")[-1].split(".")[0]
#         if candidate.lower() != "favicon":
#             artist_name = candidate

#     return name, artist_name, imageUrl


# def parse_song(url):
#     html = get_html_with_browser(url)
#     soup = BeautifulSoup(html, "html.parser")

#     name, singer, imageUrl = extract_metadata(soup)
#     words = parse_lyrics_lines(html)

#     return {
#         "_id": {"$oid": uuid.uuid4().hex[:24]},
#         "name": name,
#         "singer": singer,
#         "imageUrl": imageUrl,
#         "words": words,
#         "__v": 1
#     }


# if __name__ == "__main__":
#     url = "https://www.e-chords.com/chords/eminem/lose-yourself"
#     result = parse_song(url)
#     print(json.dumps(result, ensure_ascii=False, indent=2))
import time
import json
import uuid
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


def get_html_with_browser(url):
    options = Options()
    options.headless = True
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get(url)
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".core-chords-wrapper span[data-chord]"))
        )
        time.sleep(1)  # small extra wait for safety
        html = driver.page_source
    except Exception as e:
        print("Timeout waiting for content:", e)
        html = driver.page_source
    finally:
        driver.quit()

    return html


def parse_lyrics_lines(html):
    soup = BeautifulSoup(html, "html.parser")
    wrapper = soup.select_one(".core-chords-wrapper")
    if not wrapper:
        print("No .core-chords-wrapper found!")
        return []

    print(f".core-chords-wrapper found with {len(list(wrapper.children))} children")

    lyric_lines = []
    current_line = []

    for element in wrapper.children:
        # Uncomment to debug elements:
        # print(f"Element: {repr(element)[:50]}")

        if element.name == "br":
            if current_line:
                lyric_lines.append(current_line)
                current_line = []
        elif element.name == "span":
            chord = element.get("data-chord")
            text = element.get_text(strip=True)
            if text:
                word_data = {"lyrics": text}
                if chord:
                    word_data["chords"] = chord
                current_line.append(word_data)
        elif isinstance(element, str):
            text = element.strip()
            if text:
                current_line.append({"lyrics": text})

    if current_line:
        lyric_lines.append(current_line)

    print(f"Parsed {len(lyric_lines)} lines")
    return lyric_lines


def extract_metadata(soup):
    title_tag = soup.find("title")
    name = title_tag.get_text().strip() if title_tag else "Unknown Song"

    artist_img = soup.find("img", {"src": True})
    imageUrl = artist_img["src"] if artist_img else "/favicon.ico"

    artist_name = "Unknown Artist"
    if imageUrl and "/" in imageUrl:
        candidate = imageUrl.split("/")[-1].split(".")[0]
        if candidate.lower() != "favicon":
            artist_name = candidate

    return name, artist_name, imageUrl


def parse_song(url):
    html = get_html_with_browser(url)
    soup = BeautifulSoup(html, "html.parser")

    name, singer, imageUrl = extract_metadata(soup)
    words = parse_lyrics_lines(html)

    return {
        "_id": {"$oid": uuid.uuid4().hex[:24]},
        "name": name,
        "singer": singer,
        "imageUrl": imageUrl,
        "words": words,
        "__v": 1
    }


if __name__ == "__main__":
    url = "https://www.e-chords.com/chords/eminem/lose-yourself"
    result = parse_song(url)
    print(json.dumps(result, ensure_ascii=False, indent=2))
