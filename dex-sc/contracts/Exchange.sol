// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Exchange is ERC20 {
    event GetReserve(uint);
    address public cryptoDevTokenAddress;

    constructor(address _CryptoDevtoken) ERC20("CryptoDev LP Token", "CDLP") {
        require(
            _CryptoDevtoken != address(0),
            "Token address passed is a null address"
        );
        cryptoDevTokenAddress = _CryptoDevtoken;
    }

    /**
     * @dev Gets Reserve of cryptoDevToken in this contract
     */
    function getReserve() public view returns (uint) {
        return ERC20(cryptoDevTokenAddress).balanceOf(address(this));
    }

    function addLiquidity(uint _amount) public payable returns (uint) {
        uint liquidity;
        uint ethBalance = address(this).balance;
        uint cryptoDevTokenReserve = getReserve();
        ERC20 cryptoDevToken = ERC20(cryptoDevTokenAddress);

        if (cryptoDevTokenReserve == 0) {
            cryptoDevToken.transferFrom(msg.sender, address(this), _amount);
            liquidity = ethBalance;
            _mint(msg.sender, liquidity);
        } else {
            uint ethReserve = ethBalance - msg.value;
            uint cryptoDevTokenAmount = (msg.value * cryptoDevTokenReserve) /
                (ethReserve);
            require(
                _amount >= cryptoDevTokenAmount,
                "Amount of tokens sent is less than the minimu tokens required"
            );
            cryptoDevToken.transferFrom(
                msg.sender,
                address(this),
                cryptoDevTokenAmount
            );
            liquidity = (totalSupply() * msg.value) / ethReserve;
            _mint(msg.sender, liquidity);
        }
        return liquidity;
    }

    /**
     * @dev Returns the amount Eth/CDT that would be returned to the user in the swap
     */

    function removeLiquidity(uint _amount) public returns (uint, uint) {
        require(_amount > 0, "_amount should be greater than zero");
        uint ethReserve = address(this).balance;
        uint _totalSupply = totalSupply();
        uint ethAmount = (ethReserve * _amount) / _totalSupply;
        uint cdtAmount = (getReserve() * _amount) / _totalSupply;

        // butn the sent LP tokens from the user's wallet because they are already sent to remove liquidity
        _burn(msg.sender, _amount);

        // Transfer `ethAmount` of Eth from the contract to the user's wallet
        payable(msg.sender).transfer(ethAmount);

        // Transfer `cdtAmount` of Cdt from the contract to the user's wallet
        ERC20(cryptoDevTokenAddress).transfer(msg.sender, cdtAmount);

        return (ethAmount, cdtAmount);
    }

    /**
     * @dev `getAmountOfTokens` get the total amount of token that will be gotten from a user when swapping
     */

    function getAmountOfTokens(
        uint inputAmount,
        uint inputReserve,
        uint outputReserve
    ) public pure returns (uint) {
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");
        uint256 inputAmountWithFee = inputAmount * 99;
        uint numerator = inputAmountWithFee * outputReserve;
        uint denominator = (inputReserve * 100) + inputAmountWithFee;
        return numerator / denominator;
    }

    /**
     * @dev Swaps Eth for CDT tokens
     */

    function ethToCdtToken(uint _minTokens) public payable {
        uint tokenReserve = getReserve();
        uint tokensBought = getAmountOfTokens(
            msg.value,
            address(this).balance - msg.value,
            tokenReserve
        );
        require(tokensBought >= _minTokens, "insufficient output amount");

        // Transfer the CDT tokens to the user
        ERC20(cryptoDevTokenAddress).transfer(msg.sender, tokensBought);
    }

    /**
     * @dev Swaps CDT tokens for Eth
     */

    function cdtToEthToken(uint _tokensSold, uint _minEth) public {
        uint tokenReserve = getReserve();
        uint ethBought = getAmountOfTokens(
            _tokensSold,
            tokenReserve,
            address(this).balance
        );
        require(ethBought >= _minEth, "insufficient output amount");

        ERC20(cryptoDevTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _tokensSold
        );

        payable(msg.sender).transfer(ethBought);
    }
}
