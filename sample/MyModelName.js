/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('MyModelName', {
      MyColumnName1: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MyColumnName2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MyColumnName3: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      MyColumnName4: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MyColumnName5: {
        type: DataTypes.DATE,
        allowNull: true
      },
      MyColumnName: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      MyColumnName6: {
        type: DataTypes.CHAR,
        allowNull: true
      },
      MyColumnName7: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      MyColumnName8: {
        type: DataTypes.INTEGER,
        allowNull: true,
        MyColumnName: {
          model: 'OtherModel',
          key: 'OtherModelID'
        }
      },
      MyColumnName9: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MyColumnName10: {
        type: DataTypes.STRING,
        allowNull: true,
        MyColumnName: {
          model: 'AnotherModel',
          key: 'AnotherModelID'
        }
      },
      AngAkingColumn1: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      AngAkingColumn2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      AngAkingColumn3: {
        type: DataTypes.STRING,
        allowNull: true
      },
      AngAkingColumn4: {
        type: DataTypes.STRING,
        allowNull: true
      },
      AngAkingColumn5: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'MyModelName',
      timestamps: false,
      freezeTableName: true,
      hasTrigger: true
    });
  };
  