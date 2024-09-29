# import requests
# from collections import Counter

# # API URL for LLaMA 3.1 model
# OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# # Define the prompt template for LLaMA API recommendation
# LLAMA_RECOMMENDATION_PROMPT = """
# You are an AI designed to help job seekers improve their chances of getting a job by recommending skills they should learn. 
# Given the following data, compare the user's current skills with the skills in demand in the job market, 
# and recommend the top skills the user should learn. Assign each skill a probability score indicating 
# how important it is for the user to learn that skill to improve their job prospects.

# User's current skills:
# {user_skills}

# Skills in demand from job market:
# {market_skills}

# For each missing skill, recommend whether the user should learn it and assign a probability (between 0 and 1) 
# indicating the likelihood that learning this skill will improve their chances of getting a job. 
# Respond in this format:

# Skill: <skill_name>, Probability: <probability>
# """

# def analyze_skills_with_llama(user_skills, missing_skills):
#     """Send skills data to LLaMA API and get skill recommendations with probabilities."""
#     # Format the LLaMA prompt with user and job market skills
#     prompt = LLAMA_RECOMMENDATION_PROMPT.format(
#         user_skills=", ".join(user_skills),
#         market_skills=", ".join(missing_skills)
#     )

#     # Send the request to LLaMA API
#     response = requests.post(OLLAMA_API_URL, json={"prompt": prompt, "model": "llama3.1"}, timeout=60)
    
#     if response.status_code == 200:
#         try:
#             # Get the response content as a string
#             response_text = response.text
            
#             # Print the raw response for debugging
#             print("LLaMA API raw response:", response_text)

#             # Now parse it as needed (assuming the response is well-formed)
#             response_data = response_text.strip().split("\n")

#             # Initialize a list to hold skill recommendations
#             skill_recommendations = []

#             # Process the response into structured fields
#             for line in response_data:
#                 if "Skill:" in line and "Probability:" in line:
#                     parts = line.split(",")
#                     skill_name = parts[0].split("Skill:")[1].strip()
#                     probability = parts[1].split("Probability:")[1].strip()
#                     skill_recommendations.append({
#                         "skill": skill_name,
#                         "probability": probability
#                     })

#             return skill_recommendations

#         except Exception as e:
#             print(f"Error parsing the LLaMA response: {e}")
#             return {"error": "Failed to parse LLaMA API response.", "response": response_text}
#     else:
#         raise ValueError(f"LLaMA API error: {response.status_code}, {response.text}")

# def aggregate_skills(user_skills, job_skills_data):
#     """
#     Aggregates all skills from the job descriptions and compares them with the user's skills.
#     Returns the common skills and missing skills.
#     """
#     # Step 1: Aggregate all skills from the job descriptions
#     all_skills = []
#     for job, details in job_skills_data.items():
#         all_skills.extend(details.get('skills', []))

#     # Count frequency of each skill
#     skill_counts = Counter(all_skills)

#     # Step 2: Compare user skills with job market skills to find missing skills
#     user_skills_set = set(user_skills)
#     required_skills = set(skill_counts.keys())
#     missing_skills = list(required_skills - user_skills_set)

#     return skill_counts, missing_skills
# import requests
# import re
# from collections import Counter

# # API URL for LLaMA 3.1 model
# OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# # List of valid technical skills
# VALID_TECHNICAL_SKILLS = [
#     "Python", "Java", "C++", "C#", "Golang", "SQL", "NoSQL", "REST", "Microservices", 
#     "Docker", "Kubernetes", "Terraform", "Jenkins", "AWS", "Azure", "GCP", "Git", 
#     "GitLab", "OAuth", "SAML", "CI/CD", "DevOps", "TensorFlow", "PyTorch", "NLP"
#     # Add more as necessary...
# ]

# # Define the prompt template for LLaMA API recommendation
# LLAMA_RECOMMENDATION_PROMPT = """
# You are an AI designed to help job seekers improve their chances of getting a job by recommending the top 5 skills they should learn. 
# Given the following data, compare the user's current skills with the skills in demand in the job market, 
# and recommend the most important missing skills the user should focus on learning. Assign each skill a probability score indicating 
# how important it is for the user to learn that skill to improve their job prospects.

# User's current skills:
# {user_skills}

# Skills in demand from job market:
# {market_skills}

# Evaluate the user's experience and current skills. Dynamically adjust the recommendations based on available data, 
# ensuring that at least 5 skills are recommended, even if data is sparse. Assign a probability (between 0 and 1) 
# indicating the likelihood that learning this skill will improve the user's chances of getting a job.

# Respond with the top 5 skills in this format:

# Skill: <skill_name>, Probability: <probability>
# """

# def is_valid_technical_skill(skill):
#     """
#     Check if the skill is a valid technical skill by comparing it against a whitelist of valid technical skills.
#     """
#     skill_clean = skill.lower().strip()
#     # Matching valid skills
#     for valid_skill in VALID_TECHNICAL_SKILLS:
#         if valid_skill.lower() in skill_clean:
#             return True
#     return False

# def filter_recommendations(recommendations):
#     """
#     Filter out irrelevant skills or soft skills from LLaMA's recommendations.
#     """
#     filtered = []
#     for rec in recommendations:
#         skill = rec.get("skill", "")
#         # Only keep the recommendations for valid technical skills
#         if is_valid_technical_skill(skill):
#             filtered.append(rec)
#     return filtered

# def analyze_skills_with_llama(user_skills, missing_skills):
#     """Send skills data to LLaMA API and get skill recommendations with probabilities."""
#     # Format the LLaMA prompt with user and job market skills
#     prompt = LLAMA_RECOMMENDATION_PROMPT.format(
#         user_skills=", ".join(user_skills),
#         market_skills=", ".join(missing_skills)
#     )

#     # Send the request to LLaMA API
#     response = requests.post(OLLAMA_API_URL, json={"prompt": prompt, "model": "llama3.1"}, timeout=60)
    
#     if response.status_code == 200:
#         try:
#             # Get the response content as a string
#             response_text = response.text
            
#             # Print the raw response for debugging
#             print("LLaMA API raw response:", response_text)

#             # Now parse it as needed (assuming the response is well-formed)
#             response_data = response_text.strip().split("\n")

#             # Initialize a list to hold skill recommendations
#             skill_recommendations = []

#             # Process the response into structured fields
#             for line in response_data:
#                 if "Skill:" in line and "Probability:" in line:
#                     parts = re.split(r',\s*', line)
#                     skill_name = parts[0].split("Skill:")[1].strip()
#                     probability = parts[1].split("Probability:")[1].strip()
#                     skill_recommendations.append({
#                         "skill": skill_name,
#                         "probability": probability
#                     })

#             # Filter irrelevant skills or soft skills
#             filtered_recommendations = filter_recommendations(skill_recommendations)

#             return filtered_recommendations

#         except Exception as e:
#             print(f"Error parsing the LLaMA response: {e}")
#             return {"error": "Failed to parse LLaMA API response.", "response": response_text}
#     else:
#         raise ValueError(f"LLaMA API error: {response.status_code}, {response.text}")
# def aggregate_skills(user_skills, job_skills_data):
#     """
#     Aggregates all skills from the job descriptions and compares them with the user's skills.
#     Returns the common skills and missing skills.
#     """
#     # Step 1: Aggregate all skills from the job descriptions
#     all_skills = []
#     for job, details in job_skills_data.items():
#         all_skills.extend(details.get('skills', []))

#     # Count frequency of each skill
#     skill_counts = Counter(all_skills)

#     # Step 2: Compare user skills with job market skills to find missing skills
#     user_skills_set = set(user_skills)
#     required_skills = set(skill_counts.keys())
#     missing_skills = list(required_skills - user_skills_set)

#     return skill_counts, missing_skills
import requests
import re
from collections import Counter

# API URL for LLaMA 3.1 model
OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"

# List of valid technical skills
VALID_TECHNICAL_SKILLS = [
    "Python", "Java", "C++", "C#", "Golang", "SQL", "NoSQL", "REST", "Microservices", 
    "Docker", "Kubernetes", "Terraform", "Jenkins", "AWS", "Azure", "GCP", "Git", 
    "GitLab", "OAuth", "SAML", "CI/CD", "DevOps", "TensorFlow", "PyTorch", "NLP"
    # Add more as necessary...
]

# Define the prompt template for LLaMA API recommendation
LLAMA_RECOMMENDATION_PROMPT = """
You are an AI designed to help job seekers improve their chances of getting a job by recommending 
the most important skills they should learn. 
Given the following data, compare the user's current skills with the skills in demand in the job market, 
and recommend strictly 5 skills the user should focus on learning. Assign each skill a probability score indicating 
how important it is for the user to learn that skill to improve their job prospects based on the job skills json file and based on the role type and expereince.
Ignore all the soft skills if the role is a tech role and The skills and recommendations hould be less than 5 strictly okay?
User's current skills:
{user_skills}

Skills in demand from the job market:
{market_skills}

Please ensure that your response is limited to a maximum of 5 skills. If there are fewer than 5 important missing skills, recommend only the skills you find most important. Do not recommend any more than 5 skills. Assign a probability (between 0 and 1) indicating the likelihood that learning this skill will improve the user's chances of getting a job.

Respond with strictly less 5 skills in this format:

Skill: <skill_name>, Probability: <probability>
"""

def is_valid_technical_skill(skill):
    """
    Check if the skill is a valid technical skill by comparing it against a whitelist of valid technical skills.
    """
    skill_clean = skill.lower().strip()
    # Matching valid skills
    for valid_skill in VALID_TECHNICAL_SKILLS:
        if valid_skill.lower() in skill_clean:
            return True
    return False

def filter_and_limit_recommendations(recommendations):
    """
    Filter out irrelevant skills and limit the list to 5 or fewer skills.
    """
    filtered = []
    for rec in recommendations:
        skill = rec.get("skill", "")
        # Only keep the recommendations for valid technical skills
        if is_valid_technical_skill(skill):
            filtered.append(rec)
    
    # Sort by probability in descending order and limit to the top 5
    top_5_recommendations = sorted(filtered, key=lambda x: float(x["probability"]), reverse=True)[:5]
    return top_5_recommendations

def analyze_skills_with_llama(user_skills, missing_skills):
    """Send skills data to LLaMA API and get skill recommendations with probabilities."""
    # Format the LLaMA prompt with user and job market skills
    prompt = LLAMA_RECOMMENDATION_PROMPT.format(
        user_skills=", ".join(user_skills),
        market_skills=", ".join(missing_skills)
    )

    # Send the request to LLaMA API
    response = requests.post(OLLAMA_API_URL, json={"prompt": prompt, "model": "llama3.1"}, timeout=60)
    
    if response.status_code == 200:
        try:
            # Get the response content as a string
            response_text = response.text
            
            # Print the raw response for debugging
            print("LLaMA API raw response:", response_text)

            # Now parse it as needed (assuming the response is well-formed)
            response_data = response_text.strip().split("\n")

            # Initialize a list to hold skill recommendations
            skill_recommendations = []

            # Process the response into structured fields
            for line in response_data:
                if "Skill:" in line and "Probability:" in line:
                    parts = re.split(r',\s*', line)
                    skill_name = parts[0].split("Skill:")[1].strip()
                    probability = parts[1].split("Probability:")[1].strip()
                    skill_recommendations.append({
                        "skill": skill_name,
                        "probability": probability
                    })

            # Filter irrelevant skills or soft skills and limit to top 5
            filtered_recommendations = filter_and_limit_recommendations(skill_recommendations)

            return filtered_recommendations

        except Exception as e:
            print(f"Error parsing the LLaMA response: {e}")
            return {"error": "Failed to parse LLaMA API response.", "response": response_text}
    else:
        raise ValueError(f"LLaMA API error: {response.status_code}, {response.text}")

def aggregate_skills(user_skills, job_skills_data):
    """
    Aggregates all skills from the job descriptions and compares them with the user's skills.
    Returns the common skills and missing skills.
    """
    # Step 1: Aggregate all skills from the job descriptions
    all_skills = []
    for job, details in job_skills_data.items():
        all_skills.extend(details.get('skills', []))

    # Count frequency of each skill
    skill_counts = Counter(all_skills)

    # Step 2: Compare user skills with job market skills to find missing skills
    user_skills_set = set(user_skills)
    required_skills = set(skill_counts.keys())
    missing_skills = list(required_skills - user_skills_set)

    return skill_counts, missing_skills
