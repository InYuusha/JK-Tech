JK TECH

<a href="https://www.postman.com/galactic-moon-277319/workspace/ankush-workspace/collection/36319193-6c276244-059b-4402-b438-ad0b464f22ed?action=share&creator=36319193">POSTMAN LINK</a>

STEPS TO RUN
1. npm install
2. Add a .env file with the following conetent
  ```
  MONGO_URL=mongodb://localhost:27017/jk-tech
  PORT=3000
  JWT_SECRET=my_secret
```

Base Route - https://localhost:3000

1. User Routes
   - Signup 
     POST <a>{{url}}/user/signup</a>
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
     POST <a>{{url}}/user/signin</a>
     Body:
     ```json
     {
         "email": "hello@gmail.com",
         "password": "ankush"
     }
     ```

2. Bucket Routes
   - List All Buckets
     GET <a>{{url}}/buckets</a>
     
   - Create Bucket
     POST <a>{{url}}/buckets</a>
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
     DELETE <a>{{url}}/buckets/s3-bucket</a>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```

3. File Routes
   - List All Files in a Bucket
     GET <a>{{url}}/buckets/s3-bucket/files</a>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
   - Upload a File
     POST <a>{{url}}/buckets/s3-bucket/file</a>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
     Body: form-data file
   - Get a File
     GET <a>{{url}}/buckets/my-bucket/file/lB76l6ofRm.jpeg</a>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```
   - Delete a File
     DELETE <a>{{url}}/buckets/my-bucket/file/lB76l6ofRm.jpeg</a>
     Headers:
     ```
     {
         Authorization: Bearer {{token}}
     }
     ```

Edge Cases 
- When a Bucket Deleted, all files and their metadata are deleted as well

