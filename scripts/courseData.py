import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import sentry_sdk
import os
import json
import base64

# Get environment variables
dsn = os.environ.get('DSN')
courses_api_url = os.environ.get('COURSES_API_URL')
sections_api_url = os.environ.get('SECTIONS_API_URL')
firestore_collection = 'courses'

sentry_sdk.init(
    dsn=dsn,
    traces_sample_rate=1.0,
)

def filter_and_transform_courses(courses_api_url, sections_api_url, firestore_collection):
    try:
        course_response = requests.get(courses_api_url)
        course_response.raise_for_status()  # Raise an exception for bad status codes
        course_data = course_response.json()

        sections_response = requests.get(sections_api_url)
        sections_response.raise_for_status()
        sections_data = sections_response.json()

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from APIs: {e}")
        return

    filtered_courses = []
    allowed_schools = {
        "Leavey School of Business",
        "College of Arts and Sciences",
        "School of Engineering"
    }

    # Create a dictionary to look up course tags by courseId
    course_tags_by_id = {}
    for section in sections_data['courseSections']:
        course_id = section.get('courseReferenceId')
        if course_id:
            course_tags_by_id[course_id] = section.get('courseTags', [])

    for course in course_data['courses']:
        if (course.get('academicLevel') == 'Undergraduate' and
                any(school in allowed_schools for school in course.get('schools', []))):

            filtered_course = {
                'courseId': course.get('courseId'),
                'courseListing': course.get('courseListing'),
                'title': course.get('title'),
                'prerequisiteCourses': course.get('prerequisiteCourses'),
                'corequisiteCourses': course.get('corequisiteCourses'),
                'description': course.get('description'),
                'units': course.get('minimumUnits'),  # Rename minimumUnits to units
                'courseTags': course_tags_by_id.get(course.get('courseReferenceId'), [])  # Add course tags
            }
            filtered_courses.append(filtered_course)

    # Initialize Firestore
    cred = credentials.Certificate(json.loads(base64.b64decode(os.environ.get('FIREBASE_CREDS')).decode('utf-8')))
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    # Add courses to Firestore in batches
    batch_size = 500  # Set the desired batch size
    for i in range(0, len(filtered_courses), batch_size):
        batch = db.batch()
        for course in filtered_courses[i: i + batch_size]:
            doc_ref = db.collection(firestore_collection).document(course['courseId'])
            batch.set(doc_ref, course)
        batch.commit()

sentry_sdk.profiler.start_profiler()
filter_and_transform_courses(courses_api_url, sections_api_url, firestore_collection)
sentry_sdk.profiler.stop_profiler()
