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

    function getTokenAddress() public view returns (address) {
        return address(TokenFactoryArray[indexArry[msg.sender]]);
    }

    function _safeMint(string memory uri) public {
        require(address(Owner[0]) == msg.sender, "Token: Not Owner");
        Token(address(TokenFactoryArray[indexArry[msg.sender]])).safeMint(
            msg.sender,
            uri
        );
    }

    function _getTokenId() public view returns (uint) {
        return
            Token(address(TokenFactoryArray[indexArry[msg.sender]]))
                .getTokenId();
    }

    function getTokenURI(uint id) public view returns (string memory) {
        return
            Token(address(TokenFactoryArray[indexArry[msg.sender]])).tokenURI(
                id
            );
    }

    function getName() public view returns (string memory) {
        return Token(address(TokenFactoryArray[indexArry[msg.sender]])).name();
    }

    function getSymbol() public view returns (string memory) {
        return
            Token(address(TokenFactoryArray[indexArry[msg.sender]])).symbol();
    }

    function getOwner(uint tokenId) public view returns (address) {
        return
            Token(address(TokenFactoryArray[indexArry[msg.sender]])).ownerOf(
                tokenId
            );
    }
}
// 0xa74f4a305867c7EfcF9DE4Cf51B3398AEbE1a129
// 0xEDA8048fFa71a5d11EAa1966fc650B4df960F1B6
