from . import db  # Import the db instance created in __init__.py

class PrintFile(db.Model):
    """Model for 3D print files."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    # description = db.Column(db.String(300))
    file_path = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    #Add path to thumbnail image
    thumbnail_path = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<PrintFile {self.name}>'
    

    # New Model for Move and Print Commands for MobiPrint 
    class PrintCommand(db.Model):
        """Model for 3D print commands."""
        id = db.Column(db.Integer, primary_key=True)
        # fields for status
        status = db.Column(db.String(120), nullable=False)
        # Target Location 
        location = db.Column(db.String(120), nullable=False)
        # Print Angle 
        angle = db.Column(db.String(120), nullable=False)
        # Print Scale 
        scale = db.Column(db.String(120), nullable=False)
        # PrintFile to be printed refer to other model
        
        dimX = db.Column(db.String(120), nullable=False)
        dimY = db.Column(db.String(120), nullable=False)
        dimZ = db.Column(db.String(120), nullable=False)

        print_file_id = db.Column(db.Integer, db.ForeignKey('print_file.name'), nullable=False)

        created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

        def __repr__(self):
            return f'<PrintCommand {self.command}>'