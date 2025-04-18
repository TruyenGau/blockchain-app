import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./dapazzon components/Navigation";
import Section from "./dapazzon components/Section";
import Product from "./dapazzon components/Product";
import CreateProduct from "./CreateProduct";

// ABIs
import Dappazon from "../abis/Dappazon.json";

// Config
import config from "../config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null);
  const [account, setAccount] = useState(null);

  const [cycle, setCycle] = useState([]);
  const [bike, setBike] = useState([]);
  const [car, setCar] = useState([]);
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  const togglePop = (item) => {
    setItem(item);
    setToggle(!toggle);
  };

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    const dappazon = new ethers.Contract(
      config[network.chainId].dappazon.address,
      Dappazon,
      provider
    );
    setDappazon(dappazon);

    const data = [];
    for (var i = 0; i < 18; i++) {
      const item = await dappazon.items(i + 1);
      data.push(item);
    }
    const car = data.filter((item) => item.category == "CAR");
    const bike = data.filter((item) => item.category == "BIKE");
    const cycle = data.filter((item) => item.category == "CYCLE");

    setCycle(cycle);
    setBike(bike);
    setCar(car);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const addNewProduct = (newProduct) => {
    const updatedData = [...cycle, ...bike, ...car, newProduct];
    const carUpdated = updatedData.filter((item) => item.category == "CAR");
    const bikeUpdated = updatedData.filter((item) => item.category == "BIKE");
    const cycleUpdated = updatedData.filter((item) => item.category == "CYCLE");

    setCycle(cycleUpdated);
    setBike(bikeUpdated);
    setCar(carUpdated);
  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <CreateProduct dappazon={dappazon} provider={provider} addNewProduct={addNewProduct} />
      <h2>SPH best sellers</h2>
      {car && bike && cycle && (
        <>
          <Section title={"car"} items={car} togglePop={togglePop} />
          <Section title={"bike"} items={bike} togglePop={togglePop} />
          <Section title={"cycle"} items={cycle} togglePop={togglePop} />
        </>
      )}
      {toggle && (
        <Product
          item={item}
          provider={provider}
          account={account}
          dappazon={dappazon}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;
