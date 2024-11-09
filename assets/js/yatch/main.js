document.addEventListener("DOMContentLoaded", () => {
  const gearIcon = document.getElementById("gear");
  gearIcon.addEventListener("click", handleGearClick);
});

function handleGearClick() {
  const inputBox = document.getElementById("input-box");
  const resultDiv = document.getElementById("result");
  const input = inputBox.value.trim();
  let instructionType;

  if (/^[01]+$/.test(input)) {
    instructionType = "Binary";
  } else if (/^[0-9A-Fa-f]+$/.test(input)) {
    instructionType = "Hex";
  } else if (/^\d+$/.test(input)) {
    instructionType = "Decimal";
  } else if (/^[a-zA-Z]+$/.test(input)) {
    instructionType = "Assembly";
  } else {
    instructionType = "Invalid";
  }

  if (instructionType === "Invalid") {
    resultDiv.textContent = "Error: Invalid input";
    return;
  }

  decode(instructionType, input, resultDiv); // Pass `input` instead of `instruction`
}

function decode(type, instruction, resultDiv) {
  let content = `${type}: ${instruction}`;

  // Add further decoding logic here

  resultDiv.textContent = content;
}
