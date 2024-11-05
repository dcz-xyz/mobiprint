# This will be the main file that will handle calls to the backend. 
# It will be setup as a blueprint 

from flask import Blueprint, jsonify, request, current_app, send_file
import io 
from .models import PrintFile
from . import db
# from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import base64
from datetime import datetime
from .scale_rotate_gcode import scale_rotate_gcode


bp = Blueprint('mobiprint', __name__)
# CORS(bp)

# Set up directory for file uploads
ALLOWED_EXTENSIONS = {'gcode'}

# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# Configure Upload Folder to be used by Flask
# current_app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    # check if the file has an allowed extension
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# def preload_default_models():
#     default_models_dir = os.path.join(os.getcwd(), 'backend/default_models')

#     with current_app.app_context():
#         for filename in os.listdir(default_models_dir):
#             if filename.endswith('.gcode') and not PrintFile.query.filter_by(name=filename).first():
#                 file_path = os.path.join(default_models_dir, filename)
#                 new_file = PrintFile(name=filename, description="Default 3D model", file_path=file_path)
#                 db.session.add(new_file)
#         db.session.commit()
    # for filename in os.listdir(default_models_dir):
    #     if filename.endswith('.gcode') and not PrintFile.query.filter_by(name=filename).first():
    #         file_path = os.path.join(default_models_dir, filename)
    #         new_file = PrintFile(name=filename, description="Default 3D model", file_path=file_path)
    #         db.session.add(new_file)
    # db.session.commit()

# @bp.record_once
# def initialize(self):
#     preload_default_models()

@bp.route('/get-files', methods=['GET'])
def get_files():
    # Query all print files
    # print("Getting files")
    files = PrintFile.query.all()
    # Serialize the data for JSON response
    files_data = [
        {
            'id': file.id,
            'name': file.name,
            'file_path': file.file_path,
            'created_at': file.created_at.strftime("%Y-%m-%d %H:%M:%S"),  # Format datetime for JSON serialization
            #trim the path to trim everything before the static folder
            'thumbnail_path': file.thumbnail_path.split('backend')[1]
        }
        for file in files
    ]
    return jsonify(files_data)



@bp.route('/add-file', methods=['POST'])
def add_print_file():
    #For testing just accept the request and return a message
    print("Adding print file")
    return jsonify({"message": "File added successfully"}), 201
    # return 1
    # # Check if the post request has the file part
    # if 'file' not in request.files:
    #     return jsonify({"error": "No file part"}), 400
    # file = request.files['file']
    # # If the user does not select a file, the browser submits an
    # # empty file without a filename.
    # if file.filename == '':
    #     return jsonify({"error": "No selected file"}), 400
    # if file and allowed_file(file.filename):
    #     filename = secure_filename(file.filename)
    #     file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    #     file.save(file_path)
    #     # Here, add database entry for the file
    #     new_file = PrintFile(name=filename, file_path=file_path)
    #     db.session.add(new_file)
    #     db.session.commit()
    #     return jsonify(new_file.to_dict()), 201
    # else:
    #     return jsonify({"error": "Invalid file type"}), 400

@bp.route('/<int:id>', methods=['DELETE'])
def delete_print_file(id):
    file_to_delete = PrintFile.query.get_or_404(id)
    db.session.delete(file_to_delete)
    db.session.commit()
    return jsonify({"message": "File deleted successfully"}), 200


@bp.route('/check-models', methods=['GET'])
def check_models():
    count = PrintFile.query.count()
    models = PrintFile.query.all()
    models_details = [
       {
            'id': model.id,
            'name': model.name,
            'file_path': model.file_path,
            'created_at': model.created_at.strftime("%Y-%m-%d %H:%M:%S")  # Formatting the datetime object for JSON serialization
        }
        for model in models]
    return jsonify({"total_models": count, "models": models_details})


@bp.route('/test', methods=['GET'])
def test_route():
    print("Test route hit")
    return jsonify({"message": "Test route successful"})


@bp.route('/add-print-command', methods=['POST'])
def add_print_command():
    print("Adding print command")
    r = request.get_json()
    fileName = r.get('name')
    description = r.get('description')
    location = r.get('location')
    print(r)
    #Parse Json and create a new print command
    return jsonify({"message": "Print command added successfully"}), 201
    # # Get the data from the request
    # data = request.get_json()
    # status = data.get('status')
    # location = data.get('location')
    # print_file_id = data.get('print_file_id')
    # # Create a new print command
    # new_command = PrintCommand(status=status, location=location, print_file_id=print_file_id)
    # db.session.add(new_command)
    # db.session.commit()
    # return jsonify(new_command.to_dict()), 201

# Define the upload folder
UPLOAD_FOLDER = 'backend/static/default_models'
THUMBNAIL_FOLDER = 'backend/static/default_models/thumbnails'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists

@bp.route('/process-gcode', methods=['POST'])
def process_gcode():
    print("Processing GCode")
    try:
        # Extract data from the request
        data = request.json
        filename = data.get('filename')
        # new_filename = data.get('newFilename')
        scale = data.get('scale')
        rotation = data.get('rotation')

        if not filename or scale is None or rotation is None:
            return jsonify({"error": "Missing required parameters"}), 400

        input_file_path = os.path.join(UPLOAD_FOLDER, filename)
    
        modified_file_buffer = io.BytesIO()

        # Process the GCode file
        scale_rotate_gcode(input_file_path, scale, rotation, modified_file_buffer)

        # Send the modified GCode back to the client
        modified_file_buffer.seek(0)
        return send_file(modified_file_buffer, as_attachment=True, download_name=f'{filename}_modified.gcode', mimetype='application/octet-stream')

    except Exception as e:
        print(f"Error processing GCode: {e}")
        return jsonify({"error": "An error occurred while processing the GCode file", "details": str(e)}), 500

@bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        print("adding file")
        filename = secure_filename(file.filename)
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)
        extract_thumbnail(save_path)

        # thumbnails_dir = os.path.join(os.path.dirname(filename), 'thumbnails')
        # gcode_filename = os.path.basename(filename)
        output_image = os.path.join(THUMBNAIL_FOLDER, os.path.splitext(filename)[0] + '.png')

        # Create an instance of PrintFile
        new_file = PrintFile(name=filename, file_path=save_path, thumbnail_path=output_image, created_at=datetime.now())
        db.session.add(new_file)  # Add new object to session
        db.session.commit()  # Commit the transaction

        get_files()
        return jsonify({'message': 'File successfully uploaded', 'path': save_path}), 200

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'gcode'}


def extract_thumbnail(gcode_file):
    # Ensure the 'thumbnails' directory exists
    thumbnails_dir = os.path.join(os.path.dirname(gcode_file), 'thumbnails')
    os.makedirs(thumbnails_dir, exist_ok=True)
    
    # Generate the output image path
    gcode_filename = os.path.basename(gcode_file)
    output_image = os.path.join(thumbnails_dir, os.path.splitext(gcode_filename)[0] + '.png')

    with open(gcode_file, 'r') as file:
        lines = file.readlines()

    start_marker = "; thumbnail begin"
    end_marker = "; thumbnail end"
    thumbnail_data = []
    recording = False

    for line in lines:
        if start_marker in line:
            recording = True
        elif end_marker in line:
            recording = False
        elif recording:
            # Remove the leading comment markers
            thumbnail_data.append(line.strip().lstrip('; '))

    # Join all parts and decode
    thumbnail_data_str = ''.join(thumbnail_data)
    
    try:
        thumbnail_bytes = base64.b64decode(thumbnail_data_str)
        with open(output_image, 'wb') as img_file:
            img_file.write(thumbnail_bytes)
        print(f"Thumbnail extracted and saved as {output_image}")
    except Exception as e:
        print(f"An error occurred while decoding the thumbnail data: {e}")

    