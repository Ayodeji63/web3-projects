import Image from "next/image";
import React from "react";
import Header from "./components/Header";
import { nftData } from "./nftData";

const Nft = () => {
  return (
    <div>
      <Header />
      <div className="nfts-container">
        <h2 className="nft-text">NFT Collections</h2>
        <div className="nft-cards">
          {nftData.map((nft) => (
            <a href="#">
              <div className="nft-card">
                <Image src={nft.nft_Image} alt="" />
                <span className="owner">{nft.owner}</span>
                <h5 className="nft-name">{nft.nft_Name}</h5>
                <div className="price-container">
                  <div className="price">
                    <span>Price</span>
                    <h5>{nft.price}</h5>
                  </div>
                  <div className="bid">
                    <span>Highest bid</span>
                    <h5>{nft.bid}</h5>
                  </div>
                </div>
                <div className="overlay">
                    <div className="action-container">
                        <button className="action-buy">Buy Now</button>    
                    </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nft;
