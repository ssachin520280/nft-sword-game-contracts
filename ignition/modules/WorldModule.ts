import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WorldModule = buildModule("WorldModule", (m) => {
  // Deploy the World contract
  const world = m.contract("World", []);

  return { world };
});

export default WorldModule; 