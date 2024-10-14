# Skills Gap Analysis and Generative AI

This project was developed during a hackathon focused on using **Generative AI** to rapidly identify skills gaps in the local tech sector and develop targeted educational programs. The project aims to bridge the gap between educators, employers, and individuals who want to learn new skills, ensuring that educational programs align with industry demands.

## Key Features

### 1. Skills Gap Identification:
- The system identifies key skills required for various job roles and compares them against an individual's existing skills.
- Uses Generative AI models (like LLaMA) to extract and analyze job descriptions and candidate resumes.
- **Real-time Data Fetching**: The system directly scrapes job descriptions from **LinkedIn** to ensure up-to-date and relevant data.

### 2. Learning Path Recommendation:
- After identifying gaps, the system recommends tailored learning paths and educational programs.
- Suggestions are made for relevant courses, bootcamps, workshops, or even customized programs developed by educators.

### 3. Dynamic Curriculum Creation:
- When a necessary skill lacks an available course, the system notifies educators to curate a course for that specific skill.
- Educators, institutions, and bootcamp providers can directly interact with the system to curate or adjust curriculums in real-time.

### 4. Dashboard Visualization:
- Provides a user-friendly dashboard for candidates, educators, and employers.
- Job seekers can view skills gaps, recommended learning paths, and progress tracking for their career growth.

### 5. Web Scraping and Real-Time Integration:
- The project directly scrapes **LinkedIn** data using advanced web scraping techniques.
- Job descriptions and skill requirements are fetched in real-time from the web, ensuring accurate and up-to-date information on the job market.

### 6. Alternative Learning Tracks:
- The system can dynamically suggest alternative tracks when a candidate pauses or stops a learning path.
- It uses historical learning progress to make these recommendations.

## Key Objectives
- Improve employability by aligning individual skills with market needs.
- Help employers find job-ready candidates by addressing common skills gaps.
- Support educational institutions in designing curriculums that match industry demands.

## Generative AI Model
The model used for skill extraction and recommendation is based on **LLaMA 3.1**, which is fine-tuned for:
- Natural language understanding of job descriptions and resumes.
- Complex reasoning and recommendations based on skills gap analysis.
- Integration with real-time job market data scraped from **LinkedIn**.

## Technology Stack
- **Language Model**: LLaMA 3.1 for generating and processing text data related to skills and job descriptions.
- **Frontend**: Built with React.js to create an interactive and dynamic user interface for job seekers, educators, and employers.
- **Backend**: Python (Flask/Django) for handling data processing, APIs, and backend services.
- **Database**: PostgreSQL for storing job descriptions, candidate data, and course information.
- **Dashboards and Visualization**: Power BI and Tableau for dynamic skills gap visualizations.
- **Web Scraping**: Scrapy or BeautifulSoup for scraping LinkedIn job descriptions and skills data.

## Implementation Flow

### Candidate Flow:
1. Job seekers upload their resumes and select a job description.
2. The system highlights the skills gap and provides recommended learning paths.

### Educator Flow:
1. Educators input curriculum data, which is used to suggest learning paths to job seekers.
2. The system also helps educators identify gaps in current course offerings and suggests new courses to develop.

### Employer Flow:
1. Employers can upload job descriptions, and the system will evaluate the skills gaps between potential candidates and job roles.
2. Employers can view the progress of candidates in real-time through their learning paths.

## Usage Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/skills-gap-ai.git
   cd skills-gap-ai
