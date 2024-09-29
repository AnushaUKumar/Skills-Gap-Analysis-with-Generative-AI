# import random
# import time
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service as ChromeService
# from webdriver_manager.chrome import ChromeDriverManager

# class LinkedInScraper:
#     def __init__(self):
#         """Initialize the scraper with optimized Chrome options."""
#         chrome_options = webdriver.ChromeOptions()
#         chrome_options.add_argument("--disable-gpu")
#         chrome_options.add_argument("--disable-extensions")
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--disable-blink-features=AutomationControlled")
#         chrome_options.add_argument("--disable-popup-blocking")
#         chrome_options.add_argument("--window-size=1200x800")
#         chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])

#         # Start Chrome
#         self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

#     def random_sleep(self, min_time=3, max_time=7):
#         """Introduce a random delay to mimic human behavior."""
#         time.sleep(random.uniform(min_time, max_time))

#     def simulate_human_scroll(self):
#         """Simulate human-like scrolling on the page."""
#         scroll_pause = random.uniform(2, 4)
#         self.driver.execute_script("window.scrollBy(0, 400);")
#         self.random_sleep(scroll_pause)
#         self.driver.execute_script("window.scrollBy(0, -200);")
#         self.random_sleep(scroll_pause)

#     def simulate_mouse_movement(self, element):
#         """Simulate human-like mouse movement to an element."""
#         action = ActionChains(self.driver)
#         action.move_to_element(element).perform()
#         self.random_sleep(2, 4)  # Pause after moving mouse

#     def login(self, email, password):
#         """Login to LinkedIn using provided credentials."""
#         self.driver.get('https://www.linkedin.com/login')
#         WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(email)
#         self.random_sleep(1, 3)
#         self.driver.find_element(By.ID, "password").send_keys(password)
#         self.random_sleep(2, 4)  # Wait to simulate human typing delay
#         self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
#         self.random_sleep(5, 8)  # Pause after login to avoid immediate requests

#     def scrape_job_descriptions(self, role, location, word_limit=2000):
#         """Scrapes LinkedIn for job descriptions based on role, location, and word limit."""
#         job_descriptions = []
#         total_words = 0
#         base_url = f"https://www.linkedin.com/jobs/search?keywords={role}&location={location}&f_TPR=r604800&f_LF=f_AL&start=0"

#         self.driver.get(base_url)
#         self.random_sleep(5, 7)  # Allow page to fully load

#         while total_words < word_limit:
#             jobs = self.driver.find_elements(By.CLASS_NAME, 'job-card-list__title')

#             for job in jobs:
#                 if total_words >= word_limit:
#                     break

#                 try:
#                     # Simulate human-like mouse movement before clicking
#                     self.simulate_mouse_movement(job)
#                     job.click()
#                     self.random_sleep(5, 7)

#                     # Extract job description
#                     description = WebDriverWait(self.driver, 10).until(
#                         EC.presence_of_element_located((By.CLASS_NAME, 'jobs-description-content__text'))
#                     ).text

#                     # Limit description to requirements and qualifications section
#                     if "requirements" in description.lower() or "qualifications" in description.lower():
#                         job_words = len(description.split())
#                         if total_words + job_words <= word_limit:
#                             job_descriptions.append(description)
#                             total_words += job_words
#                         else:
#                             break

#                 except Exception as e:
#                     print(f"Error scraping job description: {e}")
#                     continue

#             # Scroll the page randomly to simulate human behavior
#             self.simulate_human_scroll()

#             # Check if there's a next page
#             try:
#                 next_button = self.driver.find_element(By.CLASS_NAME, 'artdeco-pagination__button--next')
#                 if next_button.is_enabled():
#                     # Simulate mouse movement before clicking the next button
#                     self.simulate_mouse_movement(next_button)
#                     next_button.click()
#                     self.random_sleep(5, 10)
#                 else:
#                     break
#             except Exception:
#                 break

#         self.driver.quit()
#         return job_descriptions
# import random
# import time
# import os
# import json
# import requests
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service as ChromeService
# from webdriver_manager.chrome import ChromeDriverManager

# class LinkedInJobScraper:
#     def __init__(self):
#         """Initialize the scraper with optimized Chrome options."""
#         chrome_options = webdriver.ChromeOptions()
#         chrome_options.add_argument("--disable-gpu")
#         chrome_options.add_argument("--disable-extensions")
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--disable-blink-features=AutomationControlled")
#         chrome_options.add_argument("--disable-popup-blocking")
#         chrome_options.add_argument("--window-size=1200x800")
#         chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])

#         # Start Chrome
#         self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

#     def random_sleep(self, min_time=3, max_time=7):
#         """Introduce a random delay to mimic human behavior."""
#         time.sleep(random.uniform(min_time, max_time))

#     def simulate_human_scroll(self):
#         """Simulate human-like scrolling on the page."""
#         scroll_pause = random.uniform(2, 4)
#         self.driver.execute_script("window.scrollBy(0, 400);")
#         self.random_sleep(scroll_pause)
#         self.driver.execute_script("window.scrollBy(0, -200);")
#         self.random_sleep(scroll_pause)

#     def simulate_mouse_movement(self, element):
#         """Simulate human-like mouse movement to an element."""
#         action = ActionChains(self.driver)
#         action.move_to_element(element).perform()
#         self.random_sleep(2, 4)  # Pause after moving mouse

#     def login(self, email, password):
#         """Login to LinkedIn using provided credentials."""
#         self.driver.get('https://www.linkedin.com/login')
#         WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(email)
#         self.random_sleep(1, 3)
#         self.driver.find_element(By.ID, "password").send_keys(password)
#         self.random_sleep(2, 4)  # Wait to simulate human typing delay
#         self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
#         self.random_sleep(5, 8)  # Pause after login to avoid immediate requests

#     def scrape_job_listings(self, role, location, job_limit=20):
#         """Scrapes LinkedIn for job descriptions based on role, location, and job limit."""
#         job_descriptions = {}
#         base_url = f"https://www.linkedin.com/jobs/search?keywords={role}&location={location}&f_TPR=r604800&f_LF=f_AL&start=0"
#         self.driver.get(base_url)
#         self.random_sleep(5, 7)  # Allow page to fully load
#         total_jobs_scraped = 0

#         while total_jobs_scraped < job_limit:
#             jobs = self.driver.find_elements(By.CLASS_NAME, 'job-card-list__title')

#             for i, job in enumerate(jobs):
#                 if total_jobs_scraped >= job_limit:
#                     break
#                 try:
#                     # Simulate human-like mouse movement before clicking
#                     self.simulate_mouse_movement(job)
#                     job.click()
#                     self.random_sleep(5, 7)

#                     # Extract job description
#                     description = WebDriverWait(self.driver, 10).until(
#                         EC.presence_of_element_located((By.CLASS_NAME, 'jobs-description-content__text'))
#                     ).text

#                     # Add job description to dictionary
#                     job_descriptions[f"job{total_jobs_scraped + 1}"] = description
#                     total_jobs_scraped += 1

#                 except Exception as e:
#                     print(f"Error scraping job description: {e}")
#                     continue

#             # Scroll the page randomly to simulate human behavior
#             self.simulate_human_scroll()

#             # Check if there's a next page
#             try:
#                 next_button = self.driver.find_element(By.CLASS_NAME, 'artdeco-pagination__button--next')
#                 if next_button.is_enabled():
#                     # Simulate mouse movement before clicking the next button
#                     self.simulate_mouse_movement(next_button)
#                     next_button.click()
#                     self.random_sleep(5, 10)
#                 else:
#                     break
#             except Exception:
#                 break

#         # Write scraped job descriptions to a JSON file
#         with open('job_descriptions.json', 'w') as f:
#             json.dump(job_descriptions, f, indent=4)

#         self.driver.quit()
#         return job_descriptions

#     def extract_skills_with_llama(self):
#         """Calls the Llama API to extract skills from job descriptions and writes the result into a new file."""
#         skills_data = {}
#         # Read job descriptions from the previously stored JSON file
#         with open('job_descriptions.json', 'r') as f:
#             job_descriptions = json.load(f)

#         # Iterate over each job description
#         for job, description in job_descriptions.items():
#             # Prompt for Llama API
#             prompt = f"Extract and list the skills strictly mentioned in the following job description: \n\n{description}"
            
#             # Call the Llama API
#             response = requests.post(
#                 'http://localhost:11434/completion',  # Llama API local endpoint
#                 json={
#                     "model": "llama2-3.1",
#                     "prompt": prompt,
#                     "temperature": 0.2,
#                     "max_tokens": 256
#                 }
#             )
            
#             if response.status_code == 200:
#                 skills = response.json().get('choices', [{}])[0].get('text', '').strip()
#                 skills_data[job] = skills
#             else:
#                 print(f"Error calling Llama API for {job}: {response.status_code}")

#         # Write extracted skills to a new JSON file
#         with open('job_skills.json', 'w') as f:
#             json.dump(skills_data, f, indent=4)

#         return skills_data
# import random
# import time
# import os
# import json
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service as ChromeService
# from webdriver_manager.chrome import ChromeDriverManager

# class LinkedInJobScraper:
#     def __init__(self):
#         """Initialize the scraper with optimized Chrome options."""
#         chrome_options = webdriver.ChromeOptions()
#         chrome_options.add_argument("--disable-gpu")
#         chrome_options.add_argument("--disable-extensions")
#         chrome_options.add_argument("--no-sandbox")
#         chrome_options.add_argument("--disable-blink-features=AutomationControlled")
#         chrome_options.add_argument("--disable-popup-blocking")
#         chrome_options.add_argument("--window-size=1200x800")
#         chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])

#         # Start Chrome
#         self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

#     def random_sleep(self, min_time=3, max_time=7):
#         """Introduce a random delay to mimic human behavior."""
#         time.sleep(random.uniform(min_time, max_time))

#     def simulate_human_scroll(self):
#         """Simulate human-like scrolling on the page."""
#         scroll_pause = random.uniform(2, 4)
#         self.driver.execute_script("window.scrollBy(0, 400);")
#         self.random_sleep(scroll_pause)
#         self.driver.execute_script("window.scrollBy(0, -200);")
#         self.random_sleep(scroll_pause)

#     def simulate_mouse_movement(self, element):
#         """Simulate human-like mouse movement to an element."""
#         action = ActionChains(self.driver)
#         action.move_to_element(element).perform()
#         self.random_sleep(2, 4)  # Pause after moving mouse

#     def login(self, email, password):
#         """Login to LinkedIn using provided credentials."""
#         self.driver.get('https://www.linkedin.com/login')
#         WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(email)
#         self.random_sleep(1, 3)
#         self.driver.find_element(By.ID, "password").send_keys(password)
#         self.random_sleep(2, 4)  # Wait to simulate human typing delay
#         self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
#         self.random_sleep(5, 8)  # Pause after login to avoid immediate requests

#     def scrape_job_listings(self, role, location, job_limit=10):
#         """Scrapes LinkedIn for job descriptions based on role, location, and job limit."""
#         job_descriptions = {}
#         base_url = f"https://www.linkedin.com/jobs/search?keywords={role}&location={location}&f_TPR=r604800&f_LF=f_AL&start=0"
#         self.driver.get(base_url)
#         self.random_sleep(5, 7)  # Allow page to fully load
#         total_jobs_scraped = 0

#         while total_jobs_scraped < job_limit:
#             jobs = self.driver.find_elements(By.CLASS_NAME, 'job-card-list__title')

#             for i, job in enumerate(jobs):
#                 if total_jobs_scraped >= job_limit:
#                     break
#                 try:
#                     # Simulate human-like mouse movement before clicking
#                     self.simulate_mouse_movement(job)
#                     job.click()
#                     self.random_sleep(5, 7)

#                     # Extract job description
#                     description = WebDriverWait(self.driver, 10).until(
#                         EC.presence_of_element_located((By.CLASS_NAME, 'jobs-description-content__text'))
#                     ).text

#                     # Add job description to dictionary
#                     job_descriptions[f"job{total_jobs_scraped + 1}"] = description
#                     total_jobs_scraped += 1

#                 except Exception as e:
#                     print(f"Error scraping job description: {e}")
#                     continue

#             # Scroll the page randomly to simulate human behavior
#             self.simulate_human_scroll()

#             # Check if there's a next page
#             try:
#                 next_button = self.driver.find_element(By.CLASS_NAME, 'artdeco-pagination__button--next')
#                 if next_button.is_enabled():
#                     # Simulate mouse movement before clicking the next button
#                     self.simulate_mouse_movement(next_button)
#                     next_button.click()
#                     self.random_sleep(5, 10)
#                 else:
#                     break
#             except Exception:
#                 break

#         # Write scraped job descriptions to a JSON file
#         with open('job_descriptions.json', 'w') as f:
#             json.dump(job_descriptions, f, indent=4)

#         self.driver.quit()
#         return job_descriptions

import random
import time
import os
import json
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

class LinkedInJobScraper:
    def __init__(self):
        """Initialize the scraper with optimized Chrome options."""
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_argument("--disable-popup-blocking")
        chrome_options.add_argument("--window-size=1200x800")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])

        # Start Chrome
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)

    def random_sleep(self, min_time=3, max_time=7):
        """Introduce a random delay to mimic human behavior."""
        time.sleep(random.uniform(min_time, max_time))

    def simulate_human_scroll(self, scroll_pause_min=2, scroll_pause_max=4):
        """Simulate human-like scrolling on the page."""
        self.driver.execute_script("window.scrollBy(0, 400);")
        self.random_sleep(scroll_pause_min, scroll_pause_max)
        self.driver.execute_script("window.scrollBy(0, -200);")
        self.random_sleep(scroll_pause_min, scroll_pause_max)

    def simulate_mouse_movement(self, element):
        """Simulate human-like mouse movement to an element."""
        action = ActionChains(self.driver)
        action.move_to_element(element).perform()
        self.random_sleep(2, 4)  # Pause after moving mouse

    def login(self, email, password):
        """Login to LinkedIn using provided credentials."""
        self.driver.get('https://www.linkedin.com/login')
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, "username"))).send_keys(email)
        self.random_sleep(1, 3)
        self.driver.find_element(By.ID, "password").send_keys(password)
        self.random_sleep(2, 4)  # Wait to simulate human typing delay
        self.driver.find_element(By.XPATH, '//button[@type="submit"]').click()
        self.random_sleep(5, 8)  # Pause after login to avoid immediate requests

    def extract_job_description(self):
        """Extract the full job description, clicking 'See more' if necessary."""
        try:
            see_more_button = self.driver.find_element(By.XPATH, '//button[@aria-label="Click to see more description"]')
            if see_more_button:
                see_more_button.click()
                self.random_sleep(2, 4)  # Wait for more content to load
        except Exception:
            pass  # 'See more' button might not exist for every job

        # Now grab the full job description
        description = self.driver.find_element(By.CLASS_NAME, 'jobs-description-content__text').text
        return description

    def scrape_job_listings(self, role, location, job_limit=10):
        """Scrapes LinkedIn for job descriptions based on role, location, and job limit."""
        job_descriptions = {}
        base_url = f"https://www.linkedin.com/jobs/search?keywords={role}&location={location}&f_TPR=r604800&f_LF=f_AL&start=0"
        self.driver.get(base_url)
        self.random_sleep(5, 7)  # Allow page to fully load
        total_jobs_scraped = 0

        while total_jobs_scraped < job_limit:
            jobs = self.driver.find_elements(By.CLASS_NAME, 'job-card-list__title')

            for i, job in enumerate(jobs):
                if total_jobs_scraped >= job_limit:
                    break
                try:
                    # Simulate human-like mouse movement before clicking
                    self.simulate_mouse_movement(job)
                    job.click()
                    self.random_sleep(5, 7)

                    # Extract job description
                    description = self.extract_job_description()

                    # Add job description to dictionary
                    job_descriptions[f"job{total_jobs_scraped + 1}"] = description
                    total_jobs_scraped += 1

                except Exception as e:
                    print(f"Error scraping job description: {e}")
                    continue

            # Scroll the page randomly to simulate human behavior
            self.simulate_human_scroll()

            # Check if there's a next page
            try:
                next_button = self.driver.find_element(By.CLASS_NAME, 'artdeco-pagination__button--next')
                if next_button.is_enabled():
                    # Simulate mouse movement before clicking the next button
                    self.simulate_mouse_movement(next_button)
                    next_button.click()
                    self.random_sleep(5, 10)
                else:
                    break
            except Exception:
                break

        # Write scraped job descriptions to a JSON file
        with open('job_descriptions.json', 'w') as f:
            json.dump(job_descriptions, f, indent=4)

        self.driver.quit()
        return job_descriptions
