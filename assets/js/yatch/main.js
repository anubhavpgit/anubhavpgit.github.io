class Instruction {
  constructor(opcode, rs, rt, rd, shamt, funct, original) {
    this.opcode = opcode;
    this.rs = rs;
    this.rt = rt;
    this.rd = rd;
    this.shamt = shamt;
    this.funct = funct;
    this.original = original;
  }
  getAssembly() {
    //convert the object to assembly
    return `<i>todo</i>`;
  }
  getInstructionSet() {
    //implement the instruction set
    return "RV32I";
  }
  getBinary() {
    return this.original;
  }
  getHex() {
    return parseInt(this.original, 2).toString(16);
  }

  getFormat() {
    switch (this.opcode) {
      case 33: // 0010011
        // R-type instructions (Register-Register operations)
        return "R";
      case 13: // 0001100
      case 3: // 0000011
      case 67: // 1000011
      case 73: // 1001001
        // I-type instructions (Immediate arithmetic, loads, jalr, system instructions)
        return "I";
      case 23: // 0100011
        // S-type instructions (Store instructions)
        return "S";
      case 63: // 1100011
        // B-type instructions (Branch instructions)
        return "B";
      case 37: // 0110111
      case 17: // 0010111
        // U-type instructions (lui, auipc)
        return "U";
      case 99: // 1100011
        // J-type instructions (jal)
        return "J";
      default:
        return "Unknown";
    }
  }
}

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
    resultDiv.textContent = "Invalid input";
    const container = document.getElementById("input-container");
    container.style.setProperty("border-color", "#cc0000", "important");
    return;
  } else {
    const container = document.getElementById("input-container");
    container.style.setProperty("border-color", "#ccc", "important");
    decode(instructionType, input, resultDiv);
  }
}

function decode(type, instruction, resultDiv) {
  switch (type) {
    case "Binary":
      decodeBinaryInstruction(instruction, resultDiv);
      break;
    case "Hex":
      decodeBinaryInstruction(parseInt(instruction, 16).toString(2), resultDiv);
      break;
    case "Decimal":
      decodeBinaryInstruction(parseInt(instruction).toString(2), resultDiv);
      break;
    case "Assembly":
      // decodeAssemblyInstruction(instruction, resultDiv);
      break;
    default:
      content = "Error: Invalid input";
  }
}

//ex. 00000000000000000000000010000011
const decodeBinaryInstruction = (instruction, resultDiv) => {
  const instrInBit = new Uint32Array([parseInt(instruction, 2)]);

  // Extract each part using bitwise operations
  const opcode = instrInBit[0] & 0x7f; // Last 7 bits for opcode
  const funct = (instrInBit[0] >>> 7) & 0x3f; // 6 bits before opcode
  const shamt = (instrInBit[0] >>> 13) & 0x1f; // 5 bits before funct
  const rd = (instrInBit[0] >>> 18) & 0x1f; // 5 bits before shamt
  const rt = (instrInBit[0] >>> 23) & 0x1f; // 5 bits before rd
  const rs = (instrInBit[0] >>> 28) & 0x1f; // 5 bits before rt

  const instr = new Instruction(opcode, rs, rt, rd, shamt, funct, instruction);

  resultDiv.innerHTML += `
  <!--  Assembly: <b>${instr.getAssembly()}</b> <br>-->
    Binary: <b>${instr.getBinary()}</b> <br>
    Hex: <b>${instr.getHex()}</b> <br>
    Format: ${instr.getFormat()} <br>
    Instruction Set: ${instr.getInstructionSet()}<br>
    <br>
    Opcode: ${opcode}<br>
    Rs: ${rs}<br>
    Rt: ${rt}<br>
    Rd: ${rd}<br>
    Shamt: ${shamt}<br>
    Funct: ${funct}
  `;
};
