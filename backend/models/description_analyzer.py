import requests
import json

# Ollama API URL for LLaMA model
OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# Define the LLaMA prompt template to analyze role, experience, and skills
LLAMA_PROMPT_TEMPLATE = """
You are an AI designed to analyze short text descriptions of professional roles. Given the following description, do the following:

1. **certifications**: Identify the certifications from the text.
2. **Experience**: Determine the number of years of experience (if mentioned). If it's not mentioned, return 0.
3. **Skills**: If specific skills are mentioned, list them as a comma-separated list. If no skills are mentioned then predict 10 (technical programming languages, cloud tech  and soft skills combined based on the market role and experience) give the technologies based on experience that means more expereince will have more kind of depth knowledge in programming and industry. 
if the role is non technical Then skills are not only  technical they can be non technical based on the type of role that is tech or non tech But conentrate more on tech skills if the role is technical software role than soft skills.
if no tech skills are there for that role pop the non technical skills which are suitable for the experience.if there are abbrevations you can use abbreavtions for some skills like saas for cloud and gcp for google cloud platform etc.
Respond strictly in the following format:

Skills: <comma-separated list of skills>
Certifications: <comma-separated list of certifications or 'None'>
Years of Experience: <years of experience or 0>

Here is the description:
"{description}"
"""

def analyze_text_with_llama(description):
    """
    Send a short description to LLaMA via the Ollama API to extract certifications, experience, and skills.
    """
    # Format the prompt for LLaMA
    prompt = LLAMA_PROMPT_TEMPLATE.format(description=description)
    
    # Send the request to Ollama API
    response = requests.post(OLLAMA_API_URL, json={"prompt": prompt, "model": "llama3.1"}, timeout=60, stream=True)
    
    if response.status_code == 200:
        try:
            full_response = ""
            for chunk in response.iter_lines():
                if chunk:
                    data = json.loads(chunk.decode('utf-8'))
                    if "response" in data:
                        full_response += data["response"]
                    if data.get("done_reason") == "stop":
                        break

            # Split the response into sections for role, experience, and skills
            response_lines = full_response.strip().split("\n")

            # Process the response into structured fields
            role, experience, skills = "Unknown", "Unknown", []
            for line in response_lines:
                if "certifications:" in line:
                    certifications = line.split("certifications:")[1].strip()
                elif "Experience:" in line:
                    experience = line.split("Experience:")[1].strip()
                elif "Skills:" in line:
                    skills = line.split("Skills:")[1].strip()

            skills_list = [skill.strip() for skill in skills.split(",")] if skills else []

            return {
                "certifications": role,
                "experience": experience,
                "skills": skills_list
            }
        
        except Exception as e:
            raise ValueError(f"Error parsing the LLaMA response: {str(e)}")
    else:
        raise ValueError(f"Error from LLaMA API: {response.status_code}, {response.text}")
