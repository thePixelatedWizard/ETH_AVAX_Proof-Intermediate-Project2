import {useState, useEffect} from "react";
import {ethers} from "ethers";
import nft_abi from "../artifacts/contracts/Token.sol/Token.json";

export default function LandingPage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [nft, setNFT] = useState(undefined);
  const [tokens, setTokens] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  const nftABI = nft_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account Connected: ", account);
      setAccount(account);
    } else {
      console.log("No Account Found");
    }
  };

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('Metamask wallet is required to connect and proceed');
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getNFTContract();
  };

  const getNFTContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, nftABI, signer);
    
    setNFT(nftContract);
  };

  const getBalance = async() => {
    if (nft) {
      setTokens((await nft.getTokens()).toNumber());
    }
  };

  const mint = async() => {
    if (nft) {
      let tx = await nft.mint(100);
      await tx.wait();
      getBalance();
    }
  };
  
  const burn = async() => {
    if (nft) {
      let tx = await nft.burn(100);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to interact with this NFT</p>
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet to proceed</button>
    }

    if (tokens == undefined) {
      getBalance();
    }

    return (
      <div>
        <p><strong> Your Account:</strong> {account}</p>
        <p><strong> Your Tokens :</strong> {tokens} </p>
        <button onClick={mint}>Mint 100 tokens</button>
        <button onClick={burn}>Burn 100 tokens</button>
      </div>
    )
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1> Welcome </h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
