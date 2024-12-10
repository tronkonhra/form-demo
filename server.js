const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Function to write data to an Excel file
function writeDataToExcel(data) {
  const filePath = "./user_data.xlsx";

  // Check if the file already exists
  let workbook;
  if (fs.existsSync(filePath)) {
    // Load the existing workbook
    workbook = XLSX.readFile(filePath);
  } else {
    // Create a new workbook
    workbook = XLSX.utils.book_new();
  }

  // Get the worksheet or create one
  const sheetName = "User Data";
  let worksheet = workbook.Sheets[sheetName];
  let dataArray;

  if (worksheet) {
    // Append to existing data
    dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  } else {
    // Create a new worksheet
    dataArray = [["Name", "Country", "Hobby"]];
  }

  // Append the new data
  dataArray.push([data.name, data.country, data.hobby]);

  // Convert the array back to a worksheet
  worksheet = XLSX.utils.aoa_to_sheet(dataArray);

  // Attach the worksheet to the workbook
  workbook.Sheets[sheetName] = worksheet;
  workbook.SheetNames.push(sheetName);

  // Write the workbook to the file
  XLSX.writeFile(workbook, filePath);
}

// Route to handle form submissions
app.post("/submit", (req, res) => {
  const { name, country, hobby } = req.body;

  console.log("Received Data:", { name, country, hobby });

  // Write the data to an Excel file
  writeDataToExcel({ name, country, hobby });

  // Respond to the client
  res.json({
    message: "Form data received and saved to Excel file!",
    data: { name, country, hobby },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
