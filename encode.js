function encodeMessage() {
  // Get user input values
  const userMessage = document.getElementById("messageInput").value;
  const userMatrix = [
    [
      parseInt(document.getElementById("matrixInput00").value),
      parseInt(document.getElementById("matrixInput01").value),
    ],
    [
      parseInt(document.getElementById("matrixInput10").value),
      parseInt(document.getElementById("matrixInput11").value),
    ],
  ];

  // Perform the encoding
  const encodedResult = encodeMessageInternal(userMessage, userMatrix);

  // Display results
  //   document.getElementById("originalMessage").innerText =
  //     "Original Message: " + userMessage;
  document.getElementById("encodedResult").innerText =
    "Encoded Result: " + encodedResult;
}

function encodeMessageInternal(message, encodingMatrix) {
  // Convert the message to uppercase
  message = message.toUpperCase();

  // Define the alphabet and space
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

  // Assign numeric values to each character
  const values = {};
  for (let i = 0; i < alphabet.length; i++) {
    values[alphabet[i]] = i + 1; // Index starts from 1
  }

  // Initialize an array to store the numeric values of the message
  let numericValues = [];

  // Convert each character in the message to its numeric value
  for (let i = 0; i < message.length; i++) {
    const char = message.charAt(i);
    numericValues.push(values[char]);
  }

  // If the length is odd, add the numeric value for space (27)
  if (numericValues.length % 2 !== 0) {
    numericValues.push(values[" "]);
  }

  // Convert the array to a 2x2 matrix
  const matrix = [];
  for (let i = 0; i < numericValues.length; i += 2) {
    matrix.push([numericValues[i], numericValues[i + 1]]);
  }

  // Initialize an array to store the encoded result
  let encodedResult = [];

  // Multiply the matrix by the encoding matrix
  for (let i = 0; i < matrix.length; i++) {
    const result = multiplyMatrixVector(encodingMatrix, matrix[i]);
    encodedResult = encodedResult.concat(result);
  }

  return encodedResult;
}

// Function to multiply a matrix by a vector
function multiplyMatrixVector(matrix, vector) {
  const result = [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
  ];

  return result;
}
