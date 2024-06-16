JK TECH

<a href="https://www.postman.com/galactic-moon-277319/workspace/ankush-workspace/collection/36319193-6c276244-059b-4402-b438-ad0b464f22ed?action=share&creator=36319193">POSTMAN LINK</a>

STEPS TO RUN
1. npm install
2. Add a .env file with the following conetent
  MONGO_URL=mongodb://localhost:27017/jk-tech
  PORT=3000
  JWT_SECRET=my_secret

Base Route - https://localhost:3000

1. User Routes
   - Signup 
     POST {{url}}/user/signup
     Body:
     ```json
     {
         "firstname": "Ankush",
         "lastname": "Singh",
         "email": "hello@gmail.com",
         "password": "ankush"
     }
     ```
   - Signin
     POST {{url}}/user/signin
     Body:
     ```json
     {
         "email": "hello@gmail.com",
         "password": "ankush"
     }
     ```

2. Bucket Routes
   - List All Buckets
     GET {{url}}/buckets
   - Create Bucket
     POST {{url}}/buckets
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
     Body:
     ```json
     {
         "name": "s3-bucket"
     }
     ```
   - Delete Bucket
     DELETE {{url}}/buckets/s3-bucket
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```

3. File Routes
   - List All Files in a Bucket
     GET {{url}}/buckets/s3-bucket/files
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
   - Upload a File
     POST {{url}}/buckets/s3-bucket/file
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
     Body: form-data file
   - Get a File
     GET {{url}}/buckets/my-bucket/file/lB76l6ofRm.jpeg
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
   - Delete a File
     DELETE {{url}}/buckets/my-bucket/file/lB76l6ofRm.jpeg
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```

Edge Cases 
- When a Bucket Deleted, all files and their metadata are deleted as well

