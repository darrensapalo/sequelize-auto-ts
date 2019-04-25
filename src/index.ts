import fs from 'fs';
import path from 'path';
import { Observable } from 'rxjs';

import config from '../sequelize-auto-ts.config';

import { PluckFromString, StripFromString, ModelDefinitionLine, ModelNameExtractor, LastTableData, MetaDataExtractor, ParseRelaxedJson, SequelizeHeader, jsLint } from './parser/parser';
import { ProtectDataTypes, GenerateTypescriptProperties, PeelDataTypes, GenerateTypescriptClassDefinition } from './generator/generator';

/**
 * Transforms a js model into a ts model.
 * 
 * @param folderPath The path to the folder containing the model.js files.
 * @param fileName The filename of the current model you are transforming.
 */
export default function TransformJSModelToTSModel(folderPath: string, fileName: string): Observable<string> {

    return new Observable((subscriber) => {

        let fileData = fs.readFileSync(path.join(folderPath, fileName), 'utf8');
        
        fileData = fileData.replace(/'/g, "\"");

        // Parse the model name
        const modelName = PluckFromString(fileData, ModelNameExtractor);

        // Remove unnecessary details
        fileData = StripFromString(fileData, SequelizeHeader);
        fileData = StripFromString(fileData, jsLint);
        fileData = fileData.replace(ModelDefinitionLine(modelName), "{");
        
        // Parse the table schema data found at the end of the table definition
        const EndOfFileCurlies = PluckFromString(fileData, LastTableData);
        fileData = StripFromString(fileData, EndOfFileCurlies);
        const MetaData = PluckFromString(EndOfFileCurlies, MetaDataExtractor);

        // Re-define the data types as a string type, enclosed with `--`
        fileData = fileData.replace(ProtectDataTypes, "\"--$&--\"");

        // Parse the properties object
        let Properties = ParseRelaxedJson(fileData);

        // Generate the typescript format of the properties
        Properties = GenerateTypescriptProperties(Properties);

        // Stringify the JSON object and replace the data types of the properties
        fileData = JSON.stringify(Properties, null, 2);
        fileData = fileData.replace(PeelDataTypes, "$1");

        // Generate the whole typescript class
        const resultingFile = GenerateTypescriptClassDefinition(modelName, Properties);
        
        // Write the typescript class into the same folder from which the model
        // came from, except it's in typescript instead of javascript.
        const destinationFilePath = path.join(folderPath, `${modelName}.ts`);

        fs.writeFile(destinationFilePath, resultingFile, (error: NodeJS.ErrnoException) => {
            if (error) {
                subscriber.error(error);
                return;
            }

            subscriber.next(destinationFilePath);
            subscriber.complete();
        });
    })
}

const FileToProcess = "MyModelName.js";

const source$ = TransformJSModelToTSModel(config.folderPath, FileToProcess);

source$.subscribe(console.log);