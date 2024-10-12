from flask import Flask, request, jsonify
import json
import uuid

app = Flask(__name__)

# Store responses in a list (in-memory storage)
responses = []

@app.route('/submit', methods=['POST'])
def submit_response():
    data = request.json
    response_id = str(uuid.uuid4())  # Generate a unique ID
    data['id'] = response_id
    responses.append(data)  # Store the response in memory

    # Save responses to a file
    with open('responses.json', 'w') as f:
        json.dump(responses, f)

    return jsonify({"message": "Response recorded!", "id": response_id}), 201

@app.route('/view-response/<response_id>', methods=['GET'])
def view_response(response_id):
    # Load responses from file
    with open('responses.json', 'r') as f:
        saved_responses = json.load(f)

    # Find the response with the given ID
    response = next((resp for resp in saved_responses if resp['id'] == response_id), None)

    if response:
        return jsonify(response), 200
    else:
        return jsonify({"error": "Response not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
