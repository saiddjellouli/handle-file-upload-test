# Handle CSV file Upload and Zipping test

This project is a full-stack JavaScript application that allows users to upload a CSV file, process it on the server to separate rows based on gender, assuming the column exists and values are either 'male' or 'female', and return a zipped file containing the separated CSV files.
The application is built with React for the front-end and Node.js with Express for the back-end.

## Features

- Upload CSV files through a web interface.
- Display a progress indicator during file upload.
- Process the uploaded CSV file to separate rows into male and female files.
- Zip the resulting CSV files and return them to the client.
- Clean up temporary files automatically to avoid clutter.

## Technologies Used

- Front-End: React, Axios
- Back-End: Node.js, Express, Multer, CSV-Parser, Zip-a-Folder, tmp

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Git installed on your machine.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/saiddjellouli/handle-file-upload-test.git
   cd handle-file-upload-test
   ```

2. **Install dependencies for the back-end:**

   ```sh
   cd backend
   npm install
   ```

3. **Install dependencies for the front-end:**

   ```sh
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the back-end server:**

   ```sh
   cd backend
   npm start
   ```

   The back-end server will start on `http://localhost:3001`.

2. **Start the front-end development server:**

   ```sh
   cd ../frontend
   npm start
   ```

   The front-end server will start on `http://localhost:3000`.

3. **Access the application:**

   Open your web browser and navigate to `http://localhost:3000`.

## Project Structure

### Front-End

- `src/FileUpload.js`: Component for uploading CSV files and displaying the upload progress, with message displayed in case of error.
- `src/index.js`: Entry point for the React application.
- `src/App.js`: Main application component.
- `public/index.htlm`: contains basic HTML structure of the app.

### Back-End

- `routes/uploadRoute.js`: Express route handling file uploads and triggering CSV processing, using multer as a middleware to handle incoming uploaded file.
- `controllers/uploadController.js`: Controller for the upload route, calls the csv processing service and manage zip cleaning.
- `services/csvService.js`: Service for processing CSV files and zipping the results.
- `app.js`: Entry point for the Express server, using cors middleware for allowing incoming requests.

### Configuration

- **Server Address**: Configure the server address for Axios in the front-end by editing `src/config.js`.

### Usage

1. **Upload a CSV file**: Use the upload form on the front-end to select and upload a CSV file.
2. **Processing**: The server processes the file, separates rows based on gender, and zips the results.
3. **Download**: The zipped file containing the separated CSV files is returned and downloaded automatically.
4. **CSV Access**: The CSV file is available at that link: https://drive.google.com/file/d/1MG0MoczOYM-UoFsEQN8ThRyyG3aH4v4Y/view?usp=sharing

### Temporary File Handling

- **Uploads Directory**: Temporary directory for file uploads, managed by Multer.
- **Processing Directory**: Temporary directory for processing CSV files.
- **Zip Directory**: Temporary directory for storing the zipped file.

### Cleanup

- Temporary files and directories are cleaned up automatically after processing to ensure efficient use of storage and prevent permission issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or feedback, please contact Saïd Djellouli at said.djellouli1@gmail.com.

As mentionned in the project title, this application responds to a technical test for a full-stack javascript developer position.
