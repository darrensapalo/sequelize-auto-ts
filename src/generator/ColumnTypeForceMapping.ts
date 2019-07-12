/**
 * Provides a way to override the mapping of the column types.
 * @param columnType Input column type
 */
export function ColumnTypeForceMapping(columnType: string): string {
    if (columnType === "GEOGRAPHY") {
        return "DataTypes.GEOGRAPHY";
    }
    if (columnType === "MONEY") {
        return "DataTypes.STRING";
    }
    return columnType;
}
