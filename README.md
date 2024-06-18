JK TECH

<a href="https://www.postman.com/galactic-moon-277319/workspace/ankush-workspace/collection/36319193-6c276244-059b-4402-b438-ad0b464f22ed?action=share&creator=36319193">POSTMAN LINK</a>

STEPS TO RUN
1. npm install
2. Make sure you have MongoDB setup
3. Add a .env file with the following conetent
  ```
  MONGO_URL=mongodb://localhost:27017/jk-tech
  PORT=3000
  JWT_SECRET=my_secret
```
3. node server.js

Base Route - https://localhost:3000

1. User Routes
   - Signup 
     POST <i>{{url}}/user/signup</i>
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
     POST <i>{{url}}/user/signin</i>
     Body:
     ```json
     {
         "email": "hello@gmail.com",
         "password": "ankush"
     }
     ```

2. Bucket Routes
   - <b>List All Buckets</b>
     GET <i>{{url}}/buckets</i>
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
     
   - <b>Create Bucket</b>
     POST <i>{{url}}/buckets</i>
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
   - <b>Delete Bucket</b>
     DELETE <i>{{url}}/buckets/:bucketName</i>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```

3. File Routes
   - <b>List All Files in a Bucket</b>
     GET <i>{{url}}/buckets/:bucketName/files</i>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
   - <b>Upload a File</b>
     POST <i>{{url}}/buckets/:bucketName/file</i>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
     Body: form-data file
   - <b>Get a File</b>
     GET <i>{{url}}/buckets/:bucketName/file/:fileName</i>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
   - <b>Delete a File</b>
     DELETE <i>{{url}}/buckets/:bucketName/file/:fileName</i>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
```
filename eg - lB76l6ofRm.jpeg (you get it while listing files in a bucket)
bucketname eg - my-bucket (used same validations as s3 bucket)
eg  request - {{url}}/buckets/my-bucket/file/5Mtlkrcb4j.pdf
```
Edge Cases 
- When a Bucket Deleted, all files and their metadata are deleted as well

<b>Working</b>
<p>The files are stored in the project directory itself (as mentioned) if the userId is user1 and the bucket name is my-bucket the files is stored such as buckets > user1 > my-bucket > files.txt</p>
<p>The metadeta for the bucket and files are being stored in Mongodb. Apart fromt that user credentials are also being in stored in MongoDB</p>

