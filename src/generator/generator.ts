import moment from 'moment';

// A regular expression to match the data types, used to protect them using `--`
export const ProtectDataTypes = /(DataTypes.[\w]+)/g;

// A regular exppression to match the protected data types, used to peel the `--`
export const PeelDataTypes = /--(DataTypes.[\w]+)--/g;

// Expected property definitions visible on a sequelize javascript model definition.
export interface PropertyDefinition {
    type: string
    allowNull?: boolean
    defaultValue?: any
    references?: {
        model: string,
        key: string
    },
    primaryKey?: boolean,
    autoIncrement?: boolean
}

/**
 * Returns the typescript primitive data type based on the 
 * column type of the sequelize column of the table.
 * 
 * @param type The data type as defined in sequelize.
 */
export function ColumnTypeToDataType(type: string): string {
    switch(type) {
        case "DataTypes.INTEGER": return "number";
        case "DataTypes.TEXT": return "string";
        case "DataTypes.STRING": return "string";
        case "DataTypes.FLOAT": return "number";
        case "DataTypes.DATE": return "Date";
        case "DataTypes.DATEONLY": return "Date";
        case "DataTypes.CHAR": return "string";
        case "GEOGRAPHY": return "any";
        case "DataTypes.BOOLEAN": return "boolean";
        
        default:
        throw Error(`Unexpected column type ${type}.`);
    }
}

/**
 * Returns the string that contains all the properties in typescript format.
 * 
 * @param properties A dynamic object that holds on to the data of a single column of a table.
 */
export function GenerateTypescriptProperties(properties: { [key: string]: PropertyDefinition }): string {
    
    const template: string = `
    <@PrimaryKey>
<@AllowNull>
    @Column(<ColumnType>)
    <PropertyName><!?!?>: <DataType>;`

    let result = "";

    for (const key in properties) {

        let instance = template;

        const prop = properties[key];

        const ColumnType = prop.type.replace(PeelDataTypes, "$1");
        instance = instance.replace("<ColumnType>", ColumnType);

        instance = instance.replace("<PropertyName>", key);

        instance = instance.replace("<DataType>", ColumnTypeToDataType(ColumnType));
        
        if (prop.primaryKey) {
            instance = instance.replace("<@PrimaryKey>", "@PrimaryKey");
            instance = instance.replace("<!?!?>", "!");
        } else {
            instance = instance.replace(/<@PrimaryKey>\n/, "");
        }

        if (prop.allowNull) {
            instance = instance.replace("<@AllowNull>", "@AllowNull");
            instance = instance.replace("<!?!?>", "?");
        } else {
            instance = instance.replace("<!?!?>", "!");
            instance = instance.replace(/<@AllowNull>\n/, "");
        }

        result += `${instance}\n`;
    }

    return result;
}

/**
 * Generates the typescript definition of the sequelize schema.
 * @param modelName The name of the model.
 * @param properties The string of the properties in typescript format.
 */
export function GenerateTypescriptClassDefinition(modelName: string, properties: string): string {

    const now = moment();
    const timestamp = now.format("LLL");

    let result = `
import {DataTypes} from 'sequelize';
import {
    Column,
    PrimaryKey,
    Table,
    Model,
    AllowNull
} from 'sequelize-typescript';


/**
 * Schema definition for table <MODEL_NAME>.
 * 
 * This schema definition was automatically generated using
 * \`sequelize-auto-ts\` on ${timestamp}.
 * 
 * **Do not modify!**
 * 
 * Any modifications to this file may be overwritten if you try
 * to generate schemas again. For any bugs, please send an issue.
 * 
 * @reference https://github.com/darrensapalo/sequelize-auto-ts
 */
@Table({
    timestamps: false,
    freezeTableName: true,
    tableName: "<MODEL_NAME>"
})
export default class <MODEL_NAME> extends Model<<MODEL_NAME>> {
    <PROPERTIES>
}
    `;

    result = result.replace(/<MODEL_NAME>/g, modelName);
    result = result.replace(/<PROPERTIES>/, properties);

    return result;
}