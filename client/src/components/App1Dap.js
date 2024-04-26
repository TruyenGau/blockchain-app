import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./dapazzon components/Navigation";
import Section from "./dapazzon components/Section";
import Product from "./dapazzon components/Product";
import LoginForm from "./dapazzon components/LoginForm/LoginForm";

// ABIs
import Dappazon from "../abis/Dappazon.json";

// Config
import config from "../config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [dappazon, setDappazon] = useState(null);
  const [account, setAccount] = useState(null);

  const [cycle, setCycle] = useState(null);
  const [bike, setBike] = useState(null);
  const [car, setCar] = useState(null);
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);
  
  
  const togglePop = (item) => {
    setItem(item);
    toggle ? setToggle(false) : setToggle(true);
  };

  const loadBlockchainData = async () => {
    //Connect to blockchain - Ethers.js is used to make the connection
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    //Connect to smart contracts (Create JS versions)
    const dappazon = new ethers.Contract(
      config[network.chainId].dappazon.address,
      Dappazon,
      provider
    );
    setDappazon(dappazon);

    //Load products
    const items = [];
    for (var i = 0; i < 18; i++) {
      const item = await dappazon.items(i + 1);
      //console.log(item);
      items.push(item);
    }
    console.log(items);
    const car = items.filter((item) => item.category == "CAR");

    const bike = items.filter((item) => item.category == "BIKE");

    const cycle = items.filter((item) => item.category == "CYCLE");

    setCycle(cycle);
    setBike(bike);
    setCar(car);
  };
  useEffect(() => {
    loadBlockchainData();
  }, []);
  
  return (
    
     
    <div>
      
      <Navigation account={account}  setAccount={setAccount} />
      
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
