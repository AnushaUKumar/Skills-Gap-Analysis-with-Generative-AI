# import requests
# import os

# class GoogleSearchAPI:
#     def __init__(self, api_key, cse_id):
#         self.api_key = api_key
#         self.cse_id = cse_id
#         print(api_key,cse_id)
#         self.base_url = 'https://www.googleapis.com/customsearch/v1'

#     def get_learning_path(self, language):
#         """Fetches learning path resources for a given programming language using Google Custom Search."""
#         query = f"best resources to learn {language} programming in learning platforms coursera and udemy"
#         search_url = f"{self.base_url}?key={self.api_key}&cx={self.cse_id}&q={query}"

#         try:
#             response = requests.get(search_url)
#             response.raise_for_status()  # Raise exception for HTTP errors

#             search_results = response.json()
#             resources = []

#             # Extract relevant information from the search results
#             for item in search_results.get('items', []):
#                 resource = {
#                     "title": item.get("title"),
#                     "link": item.get("link"),
#                     "snippet": item.get("snippet")
#                 }
#                 resources.append(resource)

#             return resources  # Return the list of resources

#         except requests.exceptions.RequestException as e:
#             return f"An error occurred while fetching the data: {str(e)}"
import requests
import os

class GoogleSearchAPI:
    def __init__(self, api_key, cse_id):
        self.api_key = api_key
        self.cse_id = cse_id
        self.base_url = 'https://www.googleapis.com/customsearch/v1'

    def get_learning_path(self, language):
        """Fetches learning path resources for a given programming language using Google Custom Search."""
        query = f"best resources to learn {language} programming in learning platforms coursera and udemy"
        search_url = f"{self.base_url}?key={self.api_key}&cx={self.cse_id}&q={query}"

        try:
            response = requests.get(search_url)
            response.raise_for_status()  # Raise exception for HTTP errors

            search_results = response.json()
            resources = []

            # Extract relevant information from the search results
            for item in search_results.get('items', []):
                resource = {
                    "title": item.get("title"),
                    "link": item.get("link"),
                    "snippet": item.get("snippet")
                }
                resources.append(resource)

            return resources  # Return the list of resources

        except requests.exceptions.RequestException as e:
            return f"An error occurred while fetching the data: {str(e)}"

    def get_curriculum_plan(self, language):
        """Fetches a recommended curriculum plan and important topics for teaching a language."""
        query = f"recommended curriculum and important topics to teach {language} programming"
        search_url = f"{self.base_url}?key={self.api_key}&cx={self.cse_id}&q={query}"

        try:
            response = requests.get(search_url)
            response.raise_for_status()  # Raise exception for HTTP errors

            search_results = response.json()
            curriculum_plan = []

            # Extract relevant information from the search results
            for item in search_results.get('items', []):
                plan = {
                    "title": item.get("title"),
                    "link": item.get("link"),
                    "snippet": item.get("snippet")
                }
                curriculum_plan.append(plan)

            return curriculum_plan  # Return the list of curriculum topics

        except requests.exceptions.RequestException as e:
            return f"An error occurred while fetching the curriculum data: {str(e)}"
