// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Token.sol";

contract TokenFactory {
    Token[] public TokenFactoryArray;
    address[] public Owner;
    mapping(address => uint) public indexArry;

    function createNewToken(
        string memory name,
        string memory symbol,
        string memory uri
    ) public {
        Token newToken = new Token(name, symbol);
        TokenFactoryArray.push(newToken);
        indexArry[msg.sender] = TokenFactoryArray.length - 1;
        Token(address(TokenFactoryArray[indexArry[msg.sender]])).safeMint(
            msg.sender,
            uri
        );
        Owner.push(msg.sender);
    }

    function _safeMint(string memory uri) public {
        require(address(Owner[0]) == msg.sender, "Token: Not Owner");
        Token(address(TokenFactoryArray[indexArry[msg.sender]])).safeMint(
            msg.sender,
            uri
        );
    }

    function approveAuctionContract(
        address _auctionContract,
        uint _tokenId,
        uint index
    ) public {
        Token(address(TokenFactoryArray[index])).approve(
            _auctionContract,
            _tokenId
        );
    }
}

// 0xEDA8048fFa71a5d11EAa1966fc650B4df960F1B6
