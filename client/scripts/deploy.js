const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy Dappazon contract
  const Dappazon = await hre.ethers.getContractFactory("Dappazon");
  const dappazon = await Dappazon.deploy();
  await dappazon.deployed();
  console.log(`Deployed Dappazon contract at: ${dappazon.address}\n`);

  // Add sample products
  const items = [
    {
      name: "Car",
      category: "CAR",
      image: "car.jpg",
      price: ethers.utils.parseUnits("1", "ether"),
      rating: 5,
      stock: 10,
    },
    {

      name: "Car",
      category: "CYCLE",
      image: "car.jpg",
      price: ethers.utils.parseUnits("1", "ether"),
      rating: 5,
      stock: 10,
    },
    {
      name: "Bike",
      category: "BIKE",
      image: "bike.jpg",
      price: ethers.utils.parseUnits("0.5", "ether"),
      rating: 4,
      stock: 20,
    },
  ];

  for (let i = 0; i < items.length; i++) {
    const transaction = await dappazon.addProduct(
      items[i].name,
      items[i].category,
      items[i].image,
      items[i].price,
      items[i].rating,
      items[i].stock
    );
    await transaction.wait();
    console.log(`Added product: ${items[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});