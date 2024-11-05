from datetime import datetime
from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from os import path

db = SQLAlchemy()
DB_NAME = "database.db"
UPLOAD_FOLDER = 'uploads'

def create_app(test_config=None):
    app = Flask(__name__)
    app.debug = True
    app.secret_key = "kjdanskdjbamsdbakjsndklan"

    # configure the database
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

    db.init_app(app)


    with app.app_context():
        from .models import PrintFile

        db.create_all()  # Ensure all tables are created
        preload_default_models()  # Preload the default models

    # enable CORS
    CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)
    
    
    # import and register the blueprint
    from . import mobiprint
    app.register_blueprint(mobiprint.bp)

    #import the models 
    from . import models

    return app


def create_database(app):
    if not path.exists('backend/' + DB_NAME):
        with app.app_context():
            db.create_all()
            print('Database created!')
    else:
        print('Database already exists!')

#function to preload default models
def preload_default_models():

    from .models import PrintFile
    default_models_dir = os.path.join(os.getcwd(), 'backend/static/default_models')
    thumbnails_dir = os.path.join(default_models_dir, 'thumbnails')  # Path to the thumbnails directory

    for filename in os.listdir(default_models_dir):
        if filename.endswith('.gcode'):
            # Construct the file path for the .gcode file
            file_path = os.path.join(default_models_dir, filename)

            # Construct the file name and path for the corresponding thumbnail
            thumbnail_filename = filename.replace('.gcode', '.png')  # Replace '.gcode' with '_cropped.png'
            thumbnail_path = os.path.join(thumbnails_dir, thumbnail_filename)

            # add the x y z dimensions of the model (TEST VALUES FOR NOW)
            # THESE ARE CURRENTLY SET FOR CANE HOLDER 
            # dimX = 150
            # dimY = 150
            # dimZ = 55

            # Check if the file and its thumbnail are already in the database
            if not PrintFile.query.filter_by(name=filename).first() and os.path.exists(thumbnail_path):
                # Add the new file with its thumbnail path to the database
                new_file = PrintFile(name=filename, file_path=file_path, thumbnail_path=thumbnail_path, created_at=datetime.now())
                                    #  , dimX=dimX, dimY=dimY, dimZ=dimZ)
                db.session.add(new_file)
            else:
                print(f"Skipping {filename} as it already exists or thumbnail is missing.")
    db.session.commit()
