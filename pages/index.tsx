import { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';

export default function Home() {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);

  async function connectToWallet() {
    const options = {};
    const chain = 'mainnet';

    const web3Modal = new Web3Modal({
      network: chain,
      cacheProvider: true,
      providerOptions: options
    });
  
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
  
      const ethBalance = await web3Provider.getBalance(address);
      setEthBalance(ethBalance.toString());
  
      const blockNum = await web3Provider.getBlockNumber();
      setBlockNumber(blockNum);
     
      const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
      const usdtBalance = await web3Provider.getBalance(usdtContractAddress, address);
      setUsdtBalance(usdtBalance.toString());
    } catch (error) {
      console.error("Cannot connect to wallet:", error);
    }
  }

  return (
    <div>
      <p>This require that you have metamask chrome extension installed.</p>
      <button onClick={connectToWallet}>Connect to metamask</button>
      {blockNumber && <p>Block Number: {blockNumber}</p>}
      {ethBalance && <p>ETH Balance: {ethBalance}</p>}
      {usdtBalance ? <p>USDT Balance: {usdtBalance}</p> : <p>The usdt address might not be valid</p>}
    </div>
  );
}
