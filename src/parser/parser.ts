// Comment that defines the indentation.
export const jsLint = `/* jshint indent: 2 */`;

// Holds the first line of the export definition of model.
export const SequelizeHeader = "module.exports = function(sequelize, DataTypes) {";

// Regular expression that extracts the model's name.
export const ModelNameExtractor = /\s+return sequelize\.define\("(.*)", {/;

// Regular expression that is used to remove the model schema properties, which is a JSON object after the properties.
export const LastTableData = /(, {[\w\s:,"]+}\)[\w;\s}]+)/;

// Regular expression that extracts the model schema properties into a JSON string.
export const MetaDataExtractor = /, ({[\w\s:,"]+[}\w;]+)\)/;
    

export function ModelDefinitionLine(modelName: string) {
    return `return sequelize.define("${modelName}", {`;
}

/**
 * Removes a string from the source text.
 * 
 * @param source The source text to perform replacement on.
 * @param toBeRemoved The string to be removed.
 */
export function StripFromString(source: string, toBeRemoved: string) {
    return source.replace(toBeRemoved, "");
}

/**
 * Returns the first capturing group matched on the source text.
 * 
 * @param source The source text to perform the matching on.
 * @param toBePlucked A regular expression that contains a capturing group.
 */
export function PluckFromString(source: string, toBePlucked: RegExp) {
    try {
        return source.match(toBePlucked)[1];
    } catch(error) {
        console.error(toBePlucked);
        console.error("Failed to pluck data from string: " + source);
        throw error;
    }
}

/**
 * https://stackoverflow.com/a/34763398/1323398
 * @param badJson 
 */
export function ParseRelaxedJson(badJson: string): any {
    const correctJson = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    return JSON.parse(correctJson);
}