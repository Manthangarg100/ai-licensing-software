import os
import re
from typing import Dict, List, Tuple
from datetime import datetime
import PyPDF2
from docx import Document

class ContractAnalyzer:
    """Analyzes contracts for licensing eligibility and key terms"""
    
    # Keywords mapping for different aspects
    PLATFORM_KEYWORDS = {
        'web': ['website', 'web platform', 'web application', 'online', 'internet', 'browser'],
        'mobile': ['mobile', 'ios', 'android', 'app', 'application', 'smartphone'],
        'desktop': ['desktop', 'windows', 'mac', 'linux', 'pc', 'computer'],
        'social_media': ['social', 'facebook', 'twitter', 'instagram', 'linkedin', 'tiktok'],
        'streaming': ['streaming', 'video', 'audio', 'broadcast', 'stream'],
        'saas': ['saas', 'cloud', 'subscription', 'service'],
        'enterprise': ['enterprise', 'b2b', 'business', 'corporate'],
    }
    
    EXCLUSIVITY_KEYWORDS = {
        'exclusive': ['exclusive', 'solely', 'only', 'single', 'non-compete'],
        'non_exclusive': ['non-exclusive', 'non exclusive', 'may also', 'concurrent', 'parallel'],
        'limited': ['limited', 'restricted', 'specific', 'particular'],
    }
    
    LICENSE_TERM_KEYWORDS = {
        'perpetual': ['perpetual', 'forever', 'lifetime', 'in perpetuity'],
        'annual': ['annual', 'yearly', 'per year', '12 months'],
        'monthly': ['monthly', 'per month', '30 days'],
        'trial': ['trial', 'beta', 'evaluation', 'proof of concept', 'poc'],
        'limited_time': ['limited', 'expiration', 'expire', 'term', 'period'],
    }
    
    ELIGIBILITY_INDICATORS = {
        'eligible': ['compliant', 'approved', 'valid', 'licensed', 'permitted'],
        'ineligible': ['prohibited', 'forbidden', 'not allowed', 'breach', 'violation', 'restricted'],
    }
    
    def __init__(self):
        self.extracted_text = ""
    
    def extract_text_from_file(self, file_path: str) -> str:
        """Extract text from PDF or DOCX file"""
        file_ext = os.path.splitext(file_path)[1].lower()
        
        try:
            if file_ext == '.pdf':
                return self._extract_from_pdf(file_path)
            elif file_ext == '.docx':
                return self._extract_from_docx(file_path)
            elif file_ext == '.txt':
                with open(file_path, 'r', encoding='utf-8') as f:
                    return f.read()
            else:
                raise ValueError(f"Unsupported file format: {file_ext}")
        except Exception as e:
            raise Exception(f"Error extracting text: {str(e)}")
    
    def _extract_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page in pdf_reader.pages:
                    text += page.extract_text()
            return text
        except Exception as e:
            raise Exception(f"Error reading PDF: {str(e)}")
    
    def _extract_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file"""
        try:
            doc = Document(file_path)
            text = "\n".join([para.text for para in doc.paragraphs])
            return text
        except Exception as e:
            raise Exception(f"Error reading DOCX: {str(e)}")
    
    def find_keywords(self, text: str, keyword_dict: Dict[str, List[str]]) -> Dict[str, List[str]]:
        """Find keywords in text"""
        text_lower = text.lower()
        results = {}
        
        for category, keywords in keyword_dict.items():
            found = []
            for keyword in keywords:
                if keyword.lower() in text_lower:
                    found.append(keyword)
            if found:
                results[category] = list(set(found))
        
        return results
    
    def extract_platforms(self, text: str) -> Dict[str, List[str]]:
        """Extract platform information from contract"""
        return self.find_keywords(text, self.PLATFORM_KEYWORDS)
    
    def extract_exclusivity(self, text: str) -> Dict[str, List[str]]:
        """Extract exclusivity terms from contract"""
        return self.find_keywords(text, self.EXCLUSIVITY_KEYWORDS)
    
    def extract_license_terms(self, text: str) -> Dict[str, List[str]]:
        """Extract license term information from contract"""
        return self.find_keywords(text, self.LICENSE_TERM_KEYWORDS)
    
    def extract_duration(self, text: str) -> Dict[str, any]:
        """Extract license duration details"""
        text_lower = text.lower()
        
        # Look for specific date patterns
        date_pattern = r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}'
        dates = re.findall(date_pattern, text)
        
        # Look for duration patterns (X months, X years, etc.)
        duration_pattern = r'(\d+)\s*(month|year|day|week)s?'
        durations = re.findall(duration_pattern, text_lower)
        
        return {
            'dates_found': dates,
            'durations_found': durations,
        }
    
    def determine_eligibility(self, text: str) -> Dict[str, any]:
        """Determine if contract is eligible"""
        text_lower = text.lower()
        
        eligibility_score = 0
        factors = []
        
        # Check for positive indicators
        for indicator in self.ELIGIBILITY_INDICATORS['eligible']:
            if indicator.lower() in text_lower:
                eligibility_score += 1
                factors.append(f"✓ Found '{indicator}'")
        
        # Check for negative indicators
        for indicator in self.ELIGIBILITY_INDICATORS['ineligible']:
            if indicator.lower() in text_lower:
                eligibility_score -= 2
                factors.append(f"✗ Found restriction: '{indicator}'")
        
        # Check for license terms
        if self.find_keywords(text, {'perpetual': self.LICENSE_TERM_KEYWORDS['perpetual']}):
            eligibility_score += 1
            factors.append("✓ Perpetual license found")
        
        # Determine eligibility status
        is_eligible = eligibility_score >= 0
        
        return {
            'is_eligible': is_eligible,
            'score': eligibility_score,
            'factors': factors
        }
    
    def analyze(self, file_path: str) -> Dict[str, any]:
        """Complete analysis of a contract"""
        try:
            # Extract text
            text = self.extract_text_from_file(file_path)
            self.extracted_text = text
            
            # Perform analyses
            platforms = self.extract_platforms(text)
            exclusivity = self.extract_exclusivity(text)
            license_terms = self.extract_license_terms(text)
            duration = self.extract_duration(text)
            eligibility = self.determine_eligibility(text)
            
            return {
                'success': True,
                'analysis': {
                    'platforms': platforms if platforms else {'note': 'No specific platform mentions found'},
                    'exclusivity': exclusivity if exclusivity else {'note': 'No exclusivity terms found'},
                    'license_terms': license_terms if license_terms else {'note': 'No specific license terms found'},
                    'duration': duration,
                    'eligibility': eligibility,
                    'text_preview': text[:500] + '...' if len(text) > 500 else text,
                    'total_characters': len(text),
                },
                'message': 'Contract analyzed successfully'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'message': 'Error during analysis'
            }
