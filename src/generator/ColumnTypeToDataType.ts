/**
 * Returns the typescript primitive data type based on the
 * column type of the sequelize column of the table.
 *
 * @param type The data type as defined in sequelize.
 */
export function ColumnTypeToDataType(type: string): string {
    switch (type) {
        case "DataTypes.INTEGER": return "number";
        case "DataTypes.TEXT": return "string";
        case "DataTypes.STRING": return "string";
        case "DataTypes.FLOAT": return "number";
        case "DataTypes.TIME": return "Date";
        case "DataTypes.DATE": return "Date";
        case "DataTypes.DATEONLY": return "Date";
        case "DataTypes.CHAR": return "string";
        case "DataTypes.GEOGRAPHY": return "any";
        case "DataTypes.BOOLEAN": return "boolean";
        case "DataTypes.DOUBLE": return "number";
        case "DataTypes.BIGINT": return "number";
        default:
            throw Error(`Unexpected column type ${type}.`);
    }
}
