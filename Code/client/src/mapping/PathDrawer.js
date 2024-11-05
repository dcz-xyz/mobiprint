import { RawMapEntityType } from "./api";
export class PathDrawer {
    static drawPaths(options) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            if (options.paths.length > 0) {
                img.src = PathDrawer.createSVGDataUrlFromPaths(options);
                img.decode().then(() => {
                    resolve(img);
                }).catch(err => {
                    reject(err);
                });
            }
            else {
                resolve(img);
            }
        });
    }
    static createSVGDataUrlFromPaths(options) {
        const { mapWidth, mapHeight, paletteMode, paths, pixelSize, width } = options;
        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${mapWidth}" height="${mapHeight}" viewBox="0 0 ${mapWidth} ${mapHeight}">`;
        let pathColor;
        switch (paletteMode) {
            case "light":
                pathColor = "#ffffff";
                break;
            case "dark":
                pathColor = "#000000";
                break;
        }
        paths.forEach(path => {
            svg += PathDrawer.createSVGPathFromPoints(path.points, path.type, pixelSize, pathColor, width);
        });
        svg += "</svg>";
        return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }
    // static createSVGPathFromPoints(points, type, pixelSize, color, width) {
    //     const pathWidth = width ?? 0.5;
    //     let svgPath = "<path d=\"";
    //     //variable to define an arrow at the end of the svg 
    //     let arrow = "<ma"


    //     for (let i = 0; i < points.length; i = i + 2) {
    //         let type = "L";
    //         if (i === 0) {
    //             type = "M";
    //         }
    //         svgPath += `${type} ${points[i] / pixelSize} ${points[i + 1] / pixelSize} `;
    //     }
    //     svgPath += `" fill="none" stroke="${color}" stroke-width="${pathWidth}" stroke-linecap="round" stroke-linejoin="round"`;
    //     if (type === RawMapEntityType.PredictedPath) {
    //         svgPath += " stroke-dasharray=\"1,1\"";
    //     }
    //     svgPath += "/>";
    //     return svgPath;
    // }

    //EDITED METHOD TO DRAW PREDICTED PATHS WITH AN ARROW AT THE END OF THE PATH
    static createSVGPathFromPoints(points, type, pixelSize, color, width) {
        const pathWidth = width ?? 0.5;
        // Start of SVG definition including the defs for the arrow marker
        let svgDefs = `<defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker></defs>`;
        let svgPath = `<path d="`;
    
        for (let i = 0; i < points.length; i = i + 2) {
            let command = "L";
            if (i === 0) {
                command = "M";
            }
            svgPath += `${command} ${points[i] / pixelSize} ${points[i + 1] / pixelSize} `;
        }
    
        svgPath += `" fill="none" stroke="${color}" stroke-width="${pathWidth}" stroke-linecap="round" stroke-linejoin="round"`;
        if (type === RawMapEntityType.PredictedPath) {
            svgPath += " stroke-dasharray=\"1,1\"";
        }
        // Apply the arrow marker to the end of the path
        svgPath += ` marker-end="url(#arrow)"`;
        svgPath += "/>";
    
        // Combine the defs and the path to create the complete SVG content
        return svgDefs + svgPath;
    }
}