## This code scales the Z axis of a GCode file layerwise for 3D printing.

import re

def adjust_z_layers(input_file, scale_factor, specified_layer_height=0.3, output_file_suffix='_scaled'):
    # Adjusted regular expression to match Z movements, including those without a digit before the decimal
    z_movement_pattern = re.compile(r'G1 .*Z(\d*\.\d+|\d+\.\d*)')

    # Variables to keep track of the adjusted Z height and layer index
    current_z_height = 0.0
    layer_index = 0
    scaled_lines = []

    # Output file name modification
    output_file = input_file.replace('.gcode', f'{output_file_suffix}{scale_factor}.gcode')

    with open(input_file, 'r') as infile:
        for line in infile:
            # If the line is a Z movement command, adjust the Z value based on the new layer index
            z_match = z_movement_pattern.match(line)
            if z_match:
                # Calculate the new Z height for the current layer index
                current_z_height = specified_layer_height * layer_index * scale_factor
                # Replace the Z value in the line with the new Z height
                new_line = re.sub(z_movement_pattern, f'G1 Z{current_z_height:.3f}', line)
                scaled_lines.append(new_line)
                continue

            # If the line indicates a layer change, increment the layer index
            if ';LAYER_CHANGE' in line:
                layer_index += 1

            # Append non-Z movement lines directly to the output list
            if not z_match:
                scaled_lines.append(line)

    # Write the modified lines to the output GCode file
    with open(output_file, 'w') as outfile:
        outfile.writelines(scaled_lines)

# Example usage
# input_gcode_file = 'gcode/.gcode'  # Update this to the path of your GCode file
# scale_factor =  3.0  # Example scale factor
# adjust_z_layers(input_gcode_file, scale_factor)
