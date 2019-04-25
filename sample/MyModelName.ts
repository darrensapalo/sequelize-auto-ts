
    import {DataTypes} from 'sequelize';
    import {
        Column,
        PrimaryKey,
        Table,
        Model,
        AllowNull
    } from 'sequelize-typescript';

    @Table({
        timestamps: false,
        freezeTableName: true,
        tableName: "MyModelName"
    })
    export default class MyModelName extends Model<MyModelName> {
        
        
        @AllowNull
        @Column(DataTypes.STRING)
        MyColumnName1?: string;

        @AllowNull
        @Column(DataTypes.STRING)
        MyColumnName2?: string;

        @AllowNull
        @Column(DataTypes.TEXT)
        MyColumnName3?: string;

        @AllowNull
        @Column(DataTypes.STRING)
        MyColumnName4?: string;

        @AllowNull
        @Column(DataTypes.DATE)
        MyColumnName5?: Date;

        @AllowNull
        @Column(DataTypes.INTEGER)
        MyColumnName?: number;

        @AllowNull
        @Column(DataTypes.CHAR)
        MyColumnName6?: string;

    @PrimaryKey
            @Column(DataTypes.STRING)
        MyColumnName7!: string;

        @AllowNull
        @Column(DataTypes.INTEGER)
        MyColumnName8?: number;

        @AllowNull
        @Column(DataTypes.STRING)
        MyColumnName9?: string;

        @AllowNull
        @Column(DataTypes.STRING)
        MyColumnName10?: string;

        @AllowNull
        @Column(DataTypes.INTEGER)
        AngAkingColumn1?: number;

        @AllowNull
        @Column(DataTypes.STRING)
        AngAkingColumn2?: string;

        @AllowNull
        @Column(DataTypes.STRING)
        AngAkingColumn3?: string;

        @AllowNull
        @Column(DataTypes.STRING)
        AngAkingColumn4?: string;

        @AllowNull
        @Column(DataTypes.DATE)
        AngAkingColumn5?: Date;

    }
    