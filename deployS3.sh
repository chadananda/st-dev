# import variables from .env file
export $(xargs < .env)

s3-deploy './__sapper__/export/**'  \
   --cwd '...'   \
   --region $region   \
   --bucket $S3_BUCKETNAME