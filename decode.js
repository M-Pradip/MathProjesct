function decodeMessage() {
  // Get user input values

  // Get the encoded numbers from the user input
  const encodedNumbersString = document.getElementById("encodedNumbers").value;
  const encodedResult = encodedNumbersString.split(",").map(Number);
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

  // Perform the decoding
  const decodedResult = decodeMessageInternal(encodedResult, userMatrix);

  // Display the decoded result

  document.getElementById("decodedResult").innerText =
    "Decoded Result: " + decodedResult;
}

function decodeMessageInternal(encodedResult, decodingMatrix) {
  // Get the inverse of the decoding matrix
  const inverseMatrix = invertMatrix(decodingMatrix);

  // Initialize an array to store the decoded result
  let decodedResult = [];

  // Multiply the encoded result by the inverse matrix
  for (let i = 0; i < encodedResult.length; i += 2) {
    const result = multiplyMatrixVector(inverseMatrix, [
      encodedResult[i],
      encodedResult[i + 1],
    ]);
    // console.log(result);
    decodedResult = decodedResult.concat(result);
  }

  // Convert the array of numeric values to characters
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  const decodedMessage = decodedResult
    .map((value) => alphabet[value - 1])
    .join("");

  return decodedMessage;
}

function invertMatrix(matrix) {
  const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  try {
    // Your matrix inversion code here
    if (determinant === 0) {
      throw new Error("Matrix is not invertible");
    }

    // Continue with the rest of your code if the matrix is invertible
    const inverseMatrix = [
      [matrix[1][1] / determinant, -(matrix[0][1] / determinant)],
      [-(matrix[1][0] / determinant), matrix[0][0] / determinant],
    ];

    return inverseMatrix;
  } catch (error) {
    // Catch the error and display an alert
    alert("Error: " + error.message);
    return null; // or handle the error in some way
  }
}

function multiplyMatrixVector(matrix, vector) {
  if (
    matrix.length !== 2 ||
    matrix[0].length !== 2 ||
    matrix[1].length !== 2 ||
    vector.length !== 2
  ) {
    console.log(matrix);
    throw new Error("Matrix and vector dimensions are incompatible");
  }

  const result = [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
  ];
  return result;
}
