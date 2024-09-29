import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os

class LinkedInScraper:
    def __init__(self):
        """Initialize the scraper with optimized Chrome options."""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-logging")
        chrome_options.add_argument("--window-size=1200x800")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_argument("--disable-popup-blocking")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        
        # Remove headless mode for visible browser window
        # chrome_options.add_argument("--headless")

        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

    def login(self, email, password):
        """Login to LinkedIn using provided credentials."""
        self.driver.get('https://www.linkedin.com/login')
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(email)
        self.driver.find_element(By.ID, "password").send_keys(password)
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        time.sleep(random.uniform(3, 5))  # Simulate human-like behavior

    def scrape_job_descriptions(self, role, location, word_limit=2000):
        """Scrapes LinkedIn for job descriptions based on role, location, and word limit."""
        job_descriptions = []
        total_words = 0
        base_url = f"https://www.linkedin.com/jobs/search?keywords={role}&location={location}&f_TPR=r604800&f_LF=f_AL&start=0"

        self.driver.get(base_url)
        time.sleep(random.uniform(5, 7))

        while total_words < word_limit:
            jobs = self.driver.find_elements(By.CLASS_NAME, 'result-card__contents')

            for job in jobs:
                if total_words >= word_limit:
                    break

                try:
                    job.click()
                    time.sleep(random.uniform(3, 5))
                    description = WebDriverWait(self.driver, 10).until(
                        EC.presence_of_element_located((By.CLASS_NAME, 'description__text'))
                    ).text

                    job_words = len(description.split())
                    if total_words + job_words <= word_limit:
                        job_descriptions.append(description)
                        total_words += job_words
                    else:
                        break

                except Exception as e:
                    print(f"Error scraping job description: {e}")
                    continue

            # Check if there's a next page
            try:
                next_button = self.driver.find_element(By.CLASS_NAME, 'artdeco-pagination__button--next')
                if next_button.is_enabled():
                    next_button.click()
                    time.sleep(random.uniform(5, 10))
                else:
                    break
            except Exception:
                break

        self.driver.quit()
        return job_descriptions
