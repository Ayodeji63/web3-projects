// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Auction is ERC721Holder {
    struct BidInfo {
        address bidder;
        uint bid;
    }
    struct NFTAUCTION {
        uint tokenId;
        uint auctionEndTime;
        uint auctionStartTime;
        uint minBid;
        uint highestBid;
        address contractAddress;
        address payable highestBidder;
        string tokenURI;
        string nftName;
        string nftSymbol;
        address nftOwner;
        BidInfo[] bidInfo;
    }

    mapping(uint => NFTAUCTION) public nftAuction;
    uint public numAuctions;
    address payable owner;
    address public thisAdress = address(this);

    mapping(address => uint) public bids;
    struct AuctionDetails {
        uint highestBid;
        address highestBidder;
        uint bidEnd;
    }

    event AuctionCreated(
        uint _auctionIndex,
        uint nftTokenId,
        address nftAddress,
        uint minBid,
        uint end,
        uint start
    );
    AuctionDetails[] public auctionDetails;

    constructor() {
        owner = payable(msg.sender);
    }

    function getOwner(
        uint _nftTokenId,
        uint auctionIndex
    ) public view returns (address) {
        NFTAUCTION storage auction = nftAuction[auctionIndex];
        INftContract nftContract = INftContract(auction.contractAddress);
        return nftContract.ownerOf(_nftTokenId);
    }

    function getTokenURI(
        uint _tokenId,
        uint auctionIndex
    ) public view returns (string memory) {
        NFTAUCTION storage auction = nftAuction[auctionIndex];
        INftContract nftContract = INftContract(auction.contractAddress);
        return nftContract.tokenURI(_tokenId);
    }

    function createAuction(
        uint _nftTokenId,
        uint _minBid,
        uint _end,
        uint _start,
        address nftaddress
    ) public returns (uint) {
        require(_end > _start, "Auction End time must be after start time");
        require(_minBid > 0, "Auction: Minimum Bid must be greater than 0");

        INftContract nftContract = INftContract(nftaddress);
        uint auctionIndex = numAuctions;

        NFTAUCTION storage auction = nftAuction[auctionIndex];

        require(
            nftContract.ownerOf(_nftTokenId) == msg.sender,
            "Auction: Not Owner of Nft"
        );

        auction.tokenId = _nftTokenId;
        auction.tokenURI = nftContract.tokenURI(_nftTokenId);
        auction.nftName = nftContract.name();
        auction.nftSymbol = nftContract.symbol();
        auction.nftOwner = nftContract.ownerOf(_nftTokenId);
        auction.minBid = _minBid;
        auction.auctionStartTime = block.timestamp + _start;
        auction.auctionEndTime = block.timestamp + _end;
        auction.contractAddress = nftaddress;

        emit AuctionCreated(
            auctionIndex,
            _nftTokenId,
            nftaddress,
            _minBid,
            _end,
            _start
        );
        numAuctions++;

        return numAuctions - 1;
    }

    function placeBid(uint auctionIndex) public payable {
        NFTAUCTION storage auction = nftAuction[auctionIndex];

        INftContract nftContract = INftContract(auction.contractAddress);
        require(
            block.timestamp >= auction.auctionStartTime,
            "Auction: Bidding is currently not open"
        );
        require(
            msg.value >= auction.highestBid,
            "Auction: Bid must be greater than highest bid"
        );
        require(
            auction.auctionEndTime > block.timestamp,
            "Auction: Auction over"
        );
        require(
            msg.sender != nftContract.ownerOf(auction.tokenId),
            "Auction: Owner can't bid on this NFT"
        );
        if (auction.highestBidder != address(0)) {
            bool sent = auction.highestBidder.send(auction.highestBid);
            require(sent, "Failed to send Eth");
        }
        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);
        bids[msg.sender] = msg.value;
        auction.bidInfo.push(BidInfo({bidder: msg.sender, bid: msg.value}));
    }

    function claim(uint auctionIndex) public {
        NFTAUCTION storage auction = nftAuction[auctionIndex];
        INftContract nftContract = INftContract(auction.contractAddress);
        require(
            auction.highestBidder != address(0),
            "Auction: No bid has been placed"
        );
        require(
            msg.sender == auction.highestBidder,
            "Auction: Only highest bidder can call"
        );
        require(
            block.timestamp >= auction.auctionEndTime,
            "Auction: Auction not over"
        );
        nftContract.safeTransferFrom(
            address(this),
            auction.highestBidder,
            auction.tokenId,
            ""
        );

        (bool sent, bytes memory data) = owner.call{value: auction.highestBid}(
            ""
        );
        require(sent, "Failed to send Ether");
        auction.nftOwner = auction.highestBidder;
    }

    function auctionEndState(uint auctionIndex) public view returns (bool) {
        NFTAUCTION storage auction = nftAuction[auctionIndex];
        return auction.auctionEndTime > block.timestamp;
    }

    function auctionStartState(uint auctionIndex) public view returns (bool) {
        NFTAUCTION storage auction = nftAuction[auctionIndex];
        return auction.auctionStartTime > block.timestamp;
    }

    receive() external payable {}
}

interface INftContract {
    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address from, address to, uint256 tokenId) external;

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function getApproved(
        uint256 tokenId
    ) external view returns (address operator);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;

    function name() external returns (string memory);

    function symbol() external returns (string memory);
}
