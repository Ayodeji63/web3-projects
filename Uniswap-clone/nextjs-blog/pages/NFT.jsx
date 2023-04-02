import React from 'react'
import Header from './components/Header'

const Nft = () => {
  return (
    <div>
        <Header/>
        <div className='nfts-container'>
            <div className='nft-cards'>
                <div className='nft-card'>
                    <img src={"/first-nft-image.avif"} alt="" />
                    <span className="owner">NFT1</span>
                    <h5 className='nft-name'>Reward NFT2 #8245</h5>
                    <div className='price-container'>
                        <div className='price'>
                            <span>Price</span>
                            <h5>150 MATIC</h5>
                        </div>
                        <div className='bid'>
                            <span>Highest bid</span>
                            <h5>No bids yet</h5>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Nft