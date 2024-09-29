# import fitz  # PyMuPDF for PDFs
# import docx2txt
# import os
# import tempfile

# def extract_text_from_pdf(pdf_file):
#     """
#     Extract text from a PDF file using PyMuPDF.
#     """
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
#             temp_pdf.write(pdf_file.read())
#             doc = fitz.open(temp_pdf.name)
#             text = ""
#             for page_num in range(doc.page_count):
#                 page = doc.load_page(page_num)
#                 text += page.get_text("text")
#             doc.close()
#         return text
#     finally:
#         os.remove(temp_pdf.name)

# def extract_text_from_docx(docx_file):
#     """
#     Extract text from DOCX file using python-docx.
#     """
#     try:
#         with tempfile.NamedTemporaryFile(delete=False, suffix=".docx") as temp_docx:
#             temp_docx.write(docx_file.read())
#             text = docx2txt.process(temp_docx.name)
#         return text
#     finally:
#         os.remove(temp_docx.name)

# def extract_text(resume_file):
#     """
#     Extract text from either PDF or DOCX resume.
#     """
#     filename = resume_file.filename.lower()
#     if filename.endswith('.pdf'):
#         return extract_text_from_pdf(resume_file)
#     elif filename.endswith('.docx'):
#         return extract_text_from_docx(resume_file)
#     else:
#         raise ValueError("Unsupported file type. Please upload a PDF or DOCX file.")
import docx2txt
import fitz  # PyMuPDF for PDF extraction

def extract_text_from_pdf(file_path):
    """Extract text from a PDF file using PyMuPDF."""
    pdf_text = ""
    with fitz.open(file_path) as doc:
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            pdf_text += page.get_text("text")
    return pdf_text

def extract_text_from_docx(file_path):
    """Extract text from a DOCX file using docx2txt."""
    return docx2txt.process(file_path)

def extract_text(file):
    """Extracts text from either a DOCX or PDF file."""
    filename = file.filename
    if filename.endswith(".pdf"):
        with open('temp.pdf', 'wb') as f:
            f.write(file.read())
        return extract_text_from_pdf('temp.pdf')
    elif filename.endswith(".docx"):
        with open('temp.docx', 'wb') as f:
            f.write(file.read())
        return extract_text_from_docx('temp.docx')
    else:
        raise ValueError("Unsupported file format. Please upload a PDF or DOCX file.")
