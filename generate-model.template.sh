#! /bin/sh

OUTPUT_DIR="/destination/path/of/your/new/typescript/models"

if [ "$1" = "" ]
then
  echo "MissingArgumentException. Generate model failed."
  echo "Please input the Table name to generate its schema definition."
  exit 1
fi

echo " ";
echo "Generating the Javascript schema definition for table $1."
sequelize-auto -h YOUR_IP_ADDRESS -d YOUR_DATABASE_NAME -u USERNAME -x PASSWORD --dialect 'mssql' --output DESTINATION_MODEL_FOLDER --additional './sequelize-auto.json' --tables YOUR_TABLE_NAME

echo " ";
echo "Generating the Typescript schema definition for table $1."
npx ts-node src/index.ts $1 --directory $OUTPUT_DIR

echo " ";
echo "Deleting the javascript definition for table $1."
rm $OUTPUT_DIR/$1.js
