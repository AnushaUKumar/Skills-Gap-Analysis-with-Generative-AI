import requests
import json

# Ollama API URL for LLaMA model
OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# Define the LLaMA prompt template to analyze curriculum and extract skills
LLAMA_PROMPT_TEMPLATE = """
You are an AI designed to analyze short text descriptions of professional roles. Given the following description, do the following:

1. **Certifications**: Identify the certifications from the text.
2. **Experience**: Determine the number of years of experience (if mentioned). If it's not mentioned, return 0.
3. **Skills**: If specific skills are mentioned, list them as a comma-separated list. If no skills are mentioned then predict 10 (technical programming languages, cloud tech, and soft skills combined based on the market role and experience).
If the role is non-technical, focus more on soft skills and relevant non-technical skills.

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

            # Split the response into sections for skills, certifications, and experience
            response_lines = full_response.strip().split("\n")

            certifications, experience, skills = "None", "0", []
            for line in response_lines:
                if "Certifications:" in line:
                    certifications = line.split("Certifications:")[1].strip()
                elif "Experience:" in line:
                    experience = line.split("Experience:")[1].strip()
                elif "Skills:" in line:
                    skills = line.split("Skills:")[1].strip()

            skills_list = [skill.strip() for skill in skills.split(",")] if skills else []

            return {
                "certifications": certifications,
                "experience": experience,
                "skills": skills_list
            }
        
        except Exception as e:
            raise ValueError(f"Error parsing the LLaMA response: {str(e)}")
    else:
        raise ValueError(f"Error from LLaMA API: {response.status_code}, {response.text}")

def load_skills_data(file_path):
    """Load the skills dataset from the provided JSON file."""
    with open(file_path, 'r') as f:
        return json.load(f)

def compare_skills(extracted_skills, job_skills):
    """Compare extracted skills with a given job's skills from the dataset."""
    missing_skills = [skill for skill in job_skills if skill not in extracted_skills]
    return missing_skills

def suggest_improvements(extracted_skills, skills_data):
    """
    Suggest improvements by comparing the extracted skills with the skills from all jobs in the dataset.
    """
    suggestions = []
    
    for job, job_info in skills_data.items():
        job_skills = job_info["skills"]
        missing_skills = compare_skills(extracted_skills, job_skills)

        if missing_skills:
            suggestions.append({
                "job": job,
                "missing_skills": missing_skills,
                "suggestion": f"To match {job}'s requirements, consider adding skills: {', '.join(missing_skills)}."
            })

    return suggestions

def analyze_and_suggest(description, skills_data_file):
    """
    Analyze the tutor's curriculum using LLaMA and suggest improvements based on the skills dataset.
    """
    # Analyze the text with LLaMA to extract skills, certifications, and experience
    extracted_data = analyze_text_with_llama(description)
    extracted_skills = extracted_data["skills"]

    # Load the skills dataset (from the provided `skills.json` file)
    skills_data = load_skills_data(skills_data_file)

    # Suggest improvements by comparing extracted skills with the skills in `skills.json`
    suggestions = suggest_improvements(extracted_skills, skills_data)

    return {
        "extracted_data": extracted_data,
        "suggestions": suggestions
    }


