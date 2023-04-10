// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Auction {
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
        address nftContractAddress;
        address payable highestBidder;
        string tokenURI;
        string nftName;
        string nftSymbol;
        address nftOwner;
        BidInfo[] bidInfo;
        INftContract nftContract;
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

    AuctionDetails[] public auctionDetails;

    constructor() {
        owner = payable(msg.sender);
    }

    //   modifier onlyDuringBidding() {
    //         require(block.timestamp >= auctionStartTime && block.timestamp <= auctionEndTime, "Bidding is not currently open");
    //         _;
    //     }

    // modifier onlyAfterBidding() {
    //     require(block.timestamp > auctionEndTime, "Auction: Bidding is still open");
    //     _;
    // }

    function getOwner(
        uint _nftTokenId,
        uint auctionIndex
    ) public view returns (address) {
        NFTAUCTION storage nftauction = nftAuction[auctionIndex];
        return nftauction.nftContract.ownerOf(_nftTokenId);
    }

    function getTokenURI(
        uint _tokenId,
        uint auctionIndex
    ) public view returns (string memory) {
        NFTAUCTION storage nftauction = nftAuction[auctionIndex];
        return nftauction.nftContract.tokenURI(_tokenId);
    }

    function createAuction(
        uint _nftTokenId,
        uint _minBid,
        uint _end,
        uint _start,
        address nftaddress
    ) public returns (uint) {
        NFTAUCTION storage nftauction = nftAuction[numAuctions];
        nftauction.nftContractAddress = nftaddress;
        nftauction.nftContract = INftContract(nftauction.nftContractAddress);
        require(
            nftauction.nftContract.ownerOf(_nftTokenId) == msg.sender,
            "Auction: Not Owner of Nft"
        );
        nftauction.auctionStartTime = block.timestamp + _start;
        nftauction.auctionEndTime = block.timestamp + _end;
        nftauction.highestBid = _minBid;
        nftauction.tokenId = _nftTokenId;
        nftauction.tokenURI = getTokenURI(nftauction.tokenId, numAuctions);
        nftauction.nftName = nftauction.nftContract.name();
        nftauction.nftSymbol = nftauction.nftContract.symbol();
        nftauction.nftOwner = nftauction.nftContract.ownerOf(
            nftauction.tokenId
        );
        nftauction.minBid = _minBid;
        numAuctions++;
        return numAuctions - 1;
    }

    function placeBid(uint auctionIndex) public payable {
        NFTAUCTION storage nftauction = nftAuction[auctionIndex];
        require(
            block.timestamp >= nftauction.auctionStartTime,
            "Auction: Bidding is currently not open"
        );
        require(
            msg.value >= nftauction.highestBid,
            "Auction: Bid must be greater than highest bid"
        );
        require(
            nftauction.auctionEndTime > block.timestamp,
            "Auction: Auction over"
        );
        require(
            msg.sender != nftauction.nftContract.ownerOf(nftauction.tokenId),
            "Auction: Owner can't bid on this NFT"
        );
        if (nftauction.highestBidder != address(0)) {
            bool sent = nftauction.highestBidder.send(nftauction.highestBid);
            require(sent, "Failed to send Eth");
        }
        nftauction.highestBid = msg.value;
        nftauction.highestBidder = payable(msg.sender);
        bids[msg.sender] = msg.value;
        nftauction.bidInfo.push(BidInfo({bidder: msg.sender, bid: msg.value}));
    }

    function claim(uint auctionIndex) public {
        NFTAUCTION storage nftauction = nftAuction[auctionIndex];
        require(
            block.timestamp >= nftauction.auctionEndTime,
            "Auction: Auction not over"
        );
        nftauction.nftContract.transferFrom(
            owner,
            nftauction.highestBidder,
            nftauction.tokenId
        );
        (bool sent, bytes memory data) = owner.call{
            value: nftauction.highestBid
        }("");
        require(sent, "Failed to send Ether");
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
