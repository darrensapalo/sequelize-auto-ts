import moment from 'moment';
import { ColumnTypeToDataType } from './ColumnTypeToDataType';
import { ColumnTypeForceMapping } from './ColumnTypeForceMapping';

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
 * Returns the string that contains all the properties in typescript format.
 * 
 * @param properties A dynamic object that holds on to the data of a single column of a table.
 */
export function GenerateTypescriptProperties(properties: { [key: string]: PropertyDefinition }): string {
    
    const template: string = `
    <@PrimaryKey>
    <@AllowNull>
    <@AutoIncrement>
    @Column(<ColumnType>)
    <PropertyName><!?!?>: <DataType>;`

    let result = "";

    for (const key in properties) {

        let instance = template;

        const prop = properties[key];

        let ColumnType = prop.type.replace(PeelDataTypes, "$1");

        ColumnType = ColumnTypeForceMapping(ColumnType);
        

        instance = instance.replace("<ColumnType>", ColumnType);

        instance = instance.replace("<PropertyName>", key);

        instance = instance.replace("<DataType>", ColumnTypeToDataType(ColumnType));
        
        if (prop.primaryKey) {
            instance = instance.replace("<@PrimaryKey>", "@PrimaryKey");
            instance = instance.replace("<!?!?>", "!");
        } else {
            instance = instance.replace(/[ \t]+<@PrimaryKey>\n/, "");
        }

        if (prop.allowNull) {
            instance = instance.replace("<@AllowNull>", "@AllowNull");
            instance = instance.replace("<!?!?>", "?");
        } else {
            instance = instance.replace("<!?!?>", "!");
            instance = instance.replace(/[ \t]+<@AllowNull>\n/, "");
        }

        if (prop.autoIncrement) {
            instance = instance.replace("<@AutoIncrement>", "@AutoIncrement");
        }else {
            instance = instance.replace(/[ \t]+<@AutoIncrement>\n/, "");
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
export function GenerateTypescriptClassDefinition(modelName: string, properties: string, metadata: string): string {

    const now = moment();
    const timestamp = now.format("LLL");

    let result = `
import {DataTypes} from 'sequelize';
import {
    Column,
    PrimaryKey,
    Table,
    Model,
    AllowNull,
    AutoIncrement
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
@Table(<METADATA>)
export default class <MODEL_NAME> extends Model<<MODEL_NAME>> {
    <PROPERTIES>
}
    `;
    //DEADBEEF
    const hasTriggers = "";

    result = result.replace(/<MODEL_NAME>/g, modelName);
    result = result.replace(/<PROPERTIES>/, properties);
    result = result.replace(/<METADATA>/, JSON.stringify(metadata, null, 4))

    return result;
}