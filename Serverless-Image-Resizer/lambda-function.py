import boto3
import os
import urllib.parse
from PIL import Image
from io import BytesIO

s3 = boto3.client('s3')

def lambda_handler(event, context):

    for record in event['Records']:

        bucket = record['s3']['bucket']['name']
        key = urllib.parse.unquote_plus(
            record['s3']['object']['key']
        )

        # Process only images uploaded to original/
        if not key.startswith('original/'):
            continue

        print(f"Processing image: {key}")

        # Download original image
        response = s3.get_object(
            Bucket=bucket,
            Key=key
        )

        image_data = response['Body'].read()

        # Open and resize image
        image = Image.open(BytesIO(image_data))
        image.thumbnail((300, 300))

        # Prepare resized image
        output = BytesIO()

        image_format = image.format or 'JPEG'

        if image_format.upper() in ['JPEG', 'JPG']:
            image = image.convert('RGB')

        image.save(output, format=image_format)
        output.seek(0)

        # Create destination path
        filename = os.path.basename(key)
        output_key = f"resized/{filename}"

        # Upload resized image
        s3.put_object(
            Bucket=bucket,
            Key=output_key,
            Body=output.getvalue(),
            ContentType=response.get(
                'ContentType',
                'application/octet-stream'
            )
        )

        print(f"Resized image uploaded: {output_key}")

    return {
        'statusCode': 200,
        'body': 'Image resizing completed successfully'
    }
