// Dummy carbon offset calculation
function calculateOffset(distance) {
  // Simple formula: 0.2 kg CO2 per mile
  return Math.round(distance * 0.2);
}

export default calculateOffset;
