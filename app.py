from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

profile = {
    "name": "Prashanna Raj Pandit",
    "address": "Lancashire Dr, Edwardsville, IL 62025, USA",
    "linkedin": "https://www.linkedin.com/in/ra-prashanna/",
    "github": "https://github.com/Prashanna-Raj-Pandit"
}

skills = {
    "programming": ["Python", "R", "C", "C++", "SQL", "HTML", "CSS"],
    "libraries": ["Pandas", "Numpy", "Scikit-Learn", "SciPy", "Matplotlib", "Seaborn", "OpenCV", "Selenium", "Beautiful Soup"],
    "frameworks": ["Flask", "Tensorflow", "Keras", "RestAPI", "YOLO", "Openpose"],
    "tools": ["Git", "GitHub", "Linux", "Postman", "Pycharm", "Visual Studio", "Colab", "Google Tools", "Jupyter Notebook"]
}

projects = [
    {
        "title": "CarSight - Driving Test Automation",
        "description": "AI-driven driving test automation prototype using YOLOv5, achieving 95% mAP in real-time vehicle detection.",
        "github": "https://github.com/Prashanna-Raj-Pandit/carsight",
        "details": "Automated evaluation of 8-test, U-turn, side light detection, and traffic sign violations using computer vision.",
        "image": "project1.jpg"
    },
    {
        "title": "Gait Biomechanics Analysis",
        "description": "Extracted 2D keypoints from 80+ video datasets using OpenPose to analyze gait biomechanics.",
        "github": "https://github.com/Prashanna-Raj-Pandit/gait-analysis",
        "details": "Computed gait kinematic parameters and visualized insights using Matplotlib and Seaborn.",
        "image": "project2.jpg"
    }
]

@app.route('/')
def home():
    return render_template('index.html', profile=profile, skills=skills, projects=projects)


@app.route('/doctor')
def landing():
    return render_template('test.html')
@app.route('/project/<title>')
def project(title):
    project = next((p for p in projects if p['title'] == title), None)
    return render_template('project.html', project=project)

@app.route('/resume')
def resume():
    return render_template('resume.html', profile=profile, skills=skills)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        return jsonify({"message": "Message sent successfully!"})
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True)