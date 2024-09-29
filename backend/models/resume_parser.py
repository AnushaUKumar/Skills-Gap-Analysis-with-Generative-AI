
# import requests
# import json

# # Ollama API URL for LLaMA model
# OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# # Define a prompt asking for only skills in a comma-separated format
# LLAMA_PROMPT_TEMPLATE = """You are an AI designed to analyze resumes. Given the following paragraph, extract only the technical skills mentioned. Return **only** the skills as a comma-separated list, without any introductory phrases or additional commentary. Do not include any explanations, headers, or other information—just a simple, clean list of skills.

# Here is the paragraph:
# "{resume_text}"

# Please respond with only the skills, in a strict comma-separated list format.
# """

# def extract_skills_with_llama(resume_text):
#     """
#     Send the resume text to LLaMA via the Ollama API to extract skills as a list of strings.
#     """
#     # Format the prompt for LLaMA
#     prompt = LLAMA_PROMPT_TEMPLATE.format(resume_text=resume_text)
    
#     # Send the request to Ollama API
#     response = requests.post(OLLAMA_API_URL, json={"prompt": prompt, "model": "llama3.1"}, timeout=60, stream=True)
    
#     # Check if the response is successful
#     if response.status_code == 200:
#         try:
#             # Initialize variables to store the response chunks
#             full_response = ""
            
#             # Loop through the streaming response chunks
#             for chunk in response.iter_lines():
#                 if chunk:
#                     # Decode the chunk and parse it as JSON
#                     data = json.loads(chunk.decode('utf-8'))
                    
#                     # Check if we have a "response" field and append it
#                     if "response" in data:
#                         full_response += data["response"]
                    
#                     # Stop if the response is marked as done
#                     if data.get("done_reason") == "stop":
#                         break

#             # Print LLaMA's raw response for debugging
#             print("LLaMA raw response:", full_response)
            
#             # Strip unnecessary text and convert to a list of skills
#             skills_list = full_response.strip()
            
#             # Convert the comma-separated list into a Python list
#             skills = [skill.strip() for skill in skills_list.split(",")]
            
#             # Return the list of skills
#             return skills
        
#         except Exception as e:
#             print(f"Error parsing the LLaMA response: {response.text}")
#             raise ValueError("Error parsing the LLaMA response: " + str(e))
#     else:
#         raise ValueError(f"Error from LLaMA API: {response.status_code}, {response.text}")
import requests
import json

# Ollama API URL for LLaMA model
OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# Define a more strict prompt asking for skills, certifications, and years of experience
LLAMA_PROMPT_TEMPLATE = """
You are an AI designed to analyze resumes. Given the following paragraph, extract the following fields:

1. **Skills**: Only list the technical skills mentioned in a comma-separated list, without any additional commentary or introductory phrases.
2. **Certifications**: Only list any certifications mentioned in a comma-separated list. If there are no certifications, return "None".
3. **Years of Experience**: Only return the number of years of experience as a numerical value. If no duration is mentioned, return "0".

Respond strictly in the following format:

Skills: <comma-separated list of skills>
Certifications: <comma-separated list of certifications or 'None'>
Years of Experience: <years of experience or  if experience is not mentioned it is 0>

Here is the paragraph:
"{resume_text}"

Please respond with only the information requested in the strict format mentioned above.
"""

def extract_resume_with_llama(resume_text):
    """
    Send the resume text to LLaMA via the Ollama API to extract skills, certifications, and years of experience.
    """
    # Format the prompt for LLaMA
    prompt = LLAMA_PROMPT_TEMPLATE.format(resume_text=resume_text)
    
    # Send the request to Ollama API
    response = requests.post(OLLAMA_API_URL, json={"prompt": prompt, "model": "llama3.1"}, timeout=60, stream=True)
    
    # Check if the response is successful
    if response.status_code == 200:
        try:
            # Initialize variables to store the response chunks
            full_response = ""
            
            # Loop through the streaming response chunks
            for chunk in response.iter_lines():
                if chunk:
                    # Decode the chunk and parse it as JSON
                    data = json.loads(chunk.decode('utf-8'))
                    
                    # Check if we have a "response" field and append it
                    if "response" in data:
                        full_response += data["response"]
                    
                    # Stop if the response is marked as done
                    if data.get("done_reason") == "stop":
                        break

            # Print LLaMA's raw response for debugging
            print("LLaMA raw response:", full_response)

            # Handle case when response is empty or incomplete
            if not full_response.strip():
                raise ValueError("LLaMA returned an empty response")

            # Split the response into sections for skills, certifications, and years of experience
            response_lines = full_response.strip().split("\n")

            # Initialize empty fields
            skills, certifications, years_of_experience = "", "None", "Unknown"

            # Process the response into structured fields
            for line in response_lines:
                if "Skills:" in line:
                    skills = line.split("Skills:")[1].strip()
                elif "Certifications:" in line:
                    certifications = line.split("Certifications:")[1].strip()
                elif "Years of Experience:" in line:
                    years_of_experience = line.split("Years of Experience:")[1].strip()

            # Convert skills and certifications into lists
            skills_list = [skill.strip() for skill in skills.split(",")] if skills else []
            certifications_list = [cert.strip() for cert in certifications.split(",")] if certifications.lower() != "none" else []

            # Return structured data as a dictionary
            return {
                "skills": skills_list,
                "certifications": certifications_list,
                "years_of_experience": years_of_experience
            }
        
        except Exception as e:
            print(f"Error parsing the LLaMA response: {e}")
            raise ValueError("Error parsing the LLaMA response: " + str(e))
    else:
        raise ValueError(f"Error from LLaMA API: {response.status_code}, {response.text}")
