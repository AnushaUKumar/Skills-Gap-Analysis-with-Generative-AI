
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from models.resume_text_extractor import extract_text
# from models.resume_parser import extract_resume_with_llama  # Correct function import

# app = Flask(__name__)
# CORS(app)

# @app.route('/parse_resume', methods=['POST'])
# def parse_resume_api():
#     """
#     API endpoint to handle resume parsing.
#     Supports PDF and DOCX file formats.
#     """
#     if 'resume' not in request.files:
#         return jsonify({"error": "No resume file provided"}), 400
    
#     resume_file = request.files['resume']
    
#     try:
#         # Extract text from the resume file
#         resume_text = extract_text(resume_file)
        
#         if not resume_text.strip():
#             return jsonify({"error": "Could not extract text from the resume. Please check the file format."}), 400

#         # Parse the extracted text using LLaMA 3.1 via Ollama API
#         parsed_data = extract_resume_with_llama(resume_text)
        
#         # Return parsed information (skills)
#         return jsonify({"skills": parsed_data})
    
#     except ValueError as ve:
#         return jsonify({"error": str(ve)}), 400

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS
from models.resume_text_extractor import extract_text
from models.resume_parser import extract_resume_with_llama
from models.description_analyzer import analyze_text_with_llama
from models.scrapper import LinkedInScraper
import os
app = Flask(__name__)
CORS(app)

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
    data = request.json
    role = data.get('role', '').strip()
    location = data.get('location', '').strip()

    if not role or not location:
        return jsonify({"error": "Role and location are required."}), 400

    try:
        # LinkedIn credentials from environment variables
        email = os.getenv("LINKEDIN_EMAIL")
        password = os.getenv("LINKEDIN_PASSWORD")

        if not email or not password:
            return jsonify({"error": "LinkedIn credentials are not set in the environment variables."}), 400

        # Instantiate the scraper and login
        scraper = LinkedInScraper()
        scraper.login(email, password)

        # Scrape job descriptions
        job_descriptions = scraper.scrape_job_descriptions(role, location)
        return jsonify({"job_descriptions": job_descriptions})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)







