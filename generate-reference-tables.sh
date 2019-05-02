#! /bin/sh

# ./generate-model-and-endpoint.sh AllergyType reference-tables/allergy-type
# ./generate-model-and-endpoint.sh FamilyHistoryType reference-tables/family-history-type
# ./generate-model-and-endpoint.sh HMO reference-tables/hmo
# ./generate-model-and-endpoint.sh Hospital reference-tables/hospital
# ./generate-model-and-endpoint.sh ImmunizationType reference-tables/immunization-type
# ./generate-model-and-endpoint.sh LabRecordType reference-tables/lab-record-type
# ./generate-model-and-endpoint.sh MedicalHistoryType reference-tables/medical-history-type

./generate-model.sh AllergyType
./generate-model.sh FamilyHistoryType
./generate-model.sh HMO
./generate-model.sh Hospital
./generate-model.sh ImmunizationType
./generate-model.sh LabRecordType
./generate-model.sh MedicalHistoryType
