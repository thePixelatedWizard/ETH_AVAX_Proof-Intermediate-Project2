// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Token {
    address payable public owner;
    uint256 public tokens;

    event Mint(uint256 amount);
    event Burn(uint256 amount);

    constructor(uint initTokens) payable  {
        owner = payable(msg.sender);
        tokens = initTokens;
    }


    function getTokens() public view returns(uint256) {
		return tokens;
    }

    function mint(uint256 _amount) public payable {
		uint _previousTokens = tokens;
	
		require(msg.sender == owner, "You are not the owner of this account");

		tokens += _amount;

		assert(tokens == _previousTokens + _amount);

		emit Mint(_amount);
    }


    function burn(uint256 _burnAmount) public {
		uint _previousTokens = tokens;

		require(msg.sender == owner, "You are not the owner of this account");

		if (tokens < _burnAmount) {
		    revert("Insufficient Balance");
		}

		tokens -= _burnAmount;

		assert(tokens == (_previousTokens - _burnAmount));

		emit Burn(_burnAmount);
	}
	
    
}
