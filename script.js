document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve values from the form inputs
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    const hobby = document.getElementById("hobby").value;

    // Create a data object to hold the information
    const formData = {
      name: name,
      country: country,
      hobby: hobby,
    };

    // Display the information on the page
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Hello, <strong>${formData.name}</strong> from <strong>${formData.country}</strong> who enjoys <strong>${formData.hobby}</strong>!`;

    // Log the information to the console (for debugging or other uses)
    console.log("Form Data:", formData);

    // Example: Sending the data to a server using Fetch API
    // Uncomment the lines below to send data to a backend server
    /*
  fetch('https://example.com/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
  */

    // Example: Storing the data in localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
  });
