import json
import requests

# Ollama API URL for LLaMA model
OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# Define a strict prompt asking for skills, certifications, and years of experience
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

            # Split the response into sections for skills, certifications, and years of experience
            response_lines = full_response.strip().split("\n")

            # Initialize empty fields
            skills, certifications, years_of_experience = "", "None", "0"

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

def process_job_descriptions():
    """
    Read job descriptions, extract skills using LLaMA, and store the results in a JSON file.
    """
    # Load job descriptions from JSON
    with open('job_descriptions.json', 'r') as f:
        job_descriptions = json.load(f)

    # Initialize a dictionary to store the extracted data
    extracted_data = {}

    # Iterate over each job description
    for job, description in job_descriptions.items():
        try:
            # Extract skills, certifications, and years of experience
            extracted_info = extract_resume_with_llama(description)
            extracted_data[job] = extracted_info

        except Exception as e:
            print(f"Error extracting skills for {job}: {e}")
            continue

    # Write the extracted data to a new JSON file
    with open('job_skills.json', 'w') as f:
        json.dump(extracted_data, f, indent=4)

    print("Skills extraction completed and saved to 'job_skills.json'.")


    
