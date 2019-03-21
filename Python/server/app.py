from flask import Flask

app = Flask(__name__)
# Creates the Flask application object, which contains data about the application
# and also methods (object functions) that tell the application to do certain actions.

@app.route('/<test>', methods=['GET'])
def home(test):
    return '<h1>'+ test +'</h1>'

app.run(port=8000, debug=True)
# A method that runs the application server
