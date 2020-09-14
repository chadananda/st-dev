# import variables from .env file
export $(xargs < .env)

echo "uploading to $S3_BUCKETNAME, in region: $region"

s3-deploy './__sapper__/export/**'  \
   --cwd './__sapper__/export/'   \
   --region "$region"  \
   --bucket "$S3_BUCKETNAME" \
   --private