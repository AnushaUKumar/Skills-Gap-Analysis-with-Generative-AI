
from flask import Flask, request, jsonify
from flask_cors import CORS
from models.resume_text_extractor import extract_text
from models.resume_parser import extract_resume_with_llama
from models.description_analyzer import analyze_text_with_llama
from models.scrapper import LinkedInJobScraper
from models.ectract_skills import process_job_descriptions
from models.skills_analyzer import analyze_skills_with_llama,aggregate_skills
from models.google_api import GoogleSearchAPI
import requests
import os
import json
from dotenv import load_dotenv
from models.educator_gap import analyze_and_suggest

app = Flask(__name__)
CORS(app)
load_dotenv()
@app.route('/parse_resume', methods=['POST'])
def parse_resume_api():
    """
    API endpoint to handle resume parsing.
    Supports PDF and DOCX file formats.
    """
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file provided"}), 400
    
    resume_file = request.files['resume']
    
    try:
        # Extract text from the resume file
        resume_text = extract_text(resume_file)
        
        if not resume_text.strip():
            return jsonify({"error": "Could not extract text from the resume. Please check the file format."}), 400

        # Parse the extracted text using LLaMA 3.1 via Ollama API
        parsed_data = extract_resume_with_llama(resume_text)
        
        # Return parsed information (skills, certifications, years of experience)
        return jsonify(parsed_data)
    
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

@app.route('/analyze_description', methods=['POST'])
def analyze_description_api():
    """
    API endpoint to analyze a short description and extract role, experience, and skills.
    """
    description = request.json.get('description', '').strip()

    if not description:
        return jsonify({"error": "No description provided"}), 400
    
    try:
        # Analyze the description using LLaMA
        analysis_result = analyze_text_with_llama(description)
        
        # Return the structured analysis result (role, experience, and skills)
        return jsonify(analysis_result)
    
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

@app.route('/scrape_jobs', methods=['POST'])
def scrape_jobs():
    """API endpoint to scrape job skills from LinkedIn based on the role and location."""
    data = request.json
    role = data.get('role', '').strip()
    location = data.get('location', '').strip()

    if not role or not location:
        return jsonify({"error": "Role and location are required."}), 400

    try:
        email = os.getenv("LINKEDIN_EMAIL")
        password = os.getenv("LINKEDIN_PASSWORD")

        if not email or not password:
            return jsonify({"error": "LinkedIn credentials are not set in the environment variables."}), 400

        # Initialize the scraper and login
        scraper = LinkedInJobScraper()
        scraper.login(email, password)

        # Scrape job descriptions based on the role and location
        job_descriptions = scraper.scrape_job_listings(role, location, job_limit=10)

        # Call the Llama API to extract skills
        
        job_skills=process_job_descriptions()
        # Return the extracted job skills as a JSON response
        return jsonify({"job_skills": job_skills})

    except Exception as e:
        return jsonify({"error": str(e)}), 500





# API URL for scraping jobs
SCRAPE_JOBS_API_URL = "http://127.0.0.1:5000/scrape_jobs"


@app.route('/analyze_skills', methods=['POST'])
def analyze_skills():
    """API endpoint to analyze job skills and compare with user-provided skills."""
    data = request.json
    role = data.get('role', '').strip()  # Role coming from UI
    user_skills = data.get('user_skills', [])  # User skills from UI

    # Step 1: Call the scrape_jobs API to generate job_skills.json
    scrape_payload = {
        "role": role,
        "location": "New York"  # Hardcoded location
    }
    
    # scrape_response = requests.post(SCRAPE_JOBS_API_URL, json=scrape_payload)
    
    # if scrape_response.status_code != 200:
    #     return jsonify({"error": "Failed to scrape jobs data."}), 500

    # Step 2: Load the scraped job skills from the file
    if not os.path.exists('job_skills.json'):
        return jsonify({"error": "Job skills data not found. Please run the scraper first."}), 400

    with open('job_skills.json', 'r') as f:
        job_skills_data = json.load(f)

    # Step 3: Aggregate skills from the job descriptions
    common_skills, missing_skills = aggregate_skills(user_skills, job_skills_data)

    # Step 4: Call LLaMA to get recommendations on missing skills
    llama_recommendations = analyze_skills_with_llama(user_skills, missing_skills)

    # Step 5: Prepare the response with LLaMA recommendations
    response_data = {
        "common_skills": common_skills,
        "missing_skills": missing_skills,
        "llama_recommendations": llama_recommendations
    }

    return jsonify(response_data)


CSE_ID=os.getenv("CSE_ID")
GOOGLE_API_KEY=os.getenv("Google_api_key")
print(CSE_ID)
google_search = GoogleSearchAPI(GOOGLE_API_KEY, CSE_ID)

@app.route('/get-learning-path', methods=['POST'])
def get_learning_path():
    try:
        # Extract the 'language' from the POST request body
        data = request.get_json()
        language = data.get('language', None)

        if not language:
            return jsonify({"error": "Language parameter is required"}), 400

        # Fetch learning resources using the Google Custom Search API
        learning_resources = google_search.get_learning_path(language)

        if isinstance(learning_resources, str):  # In case of an error message
            return jsonify({"error": learning_resources}), 500

        # Return the fetched learning resources
        return jsonify({
            "language": language,
            "resources": learning_resources
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/educator_gap', methods=['POST'])
def analyze_curriculum():
    """
    API endpoint to analyze a tutor's curriculum and suggest improvements.
    """
    try:
        # Get the description from the POST request body
        data = request.get_json()
        description = data.get('description', '').strip()

        # Validate that a description was provided
        if not description:
            return jsonify({"error": "No description provided"}), 400

        # Path to the skills.json file
        skills_data_file = 'job_skills.json'

        # Analyze the curriculum and get suggestions for improvement
        result = analyze_and_suggest(description, skills_data_file)

        # Return the extracted data and suggestions
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/curriculum_plan')
def get_curriculum_plan():
    language = request.args.get('language')
    if not language:
        return jsonify({'error': 'Language parameter is required'}), 400

    try:
        # Use the instantiated google_search object to fetch the curriculum plan
        curriculum_plan = google_search.get_curriculum_plan(language)
        return jsonify(curriculum_plan)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)








