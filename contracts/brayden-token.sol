// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BraydenToken is ERC20, Ownable, ERC20Permit, ERC20Burnable {
     // Define the CoinFlip event
    event CoinFlipResult(address indexed player, uint256 betAmount, bool isHeads, uint result, bool playerWon);
    

    constructor(address recipient, address initialOwner)
        ERC20("BraydenToken", "BTN")
        Ownable(initialOwner)
        ERC20Permit("BraydenToken")
    {
        _mint(recipient, 100 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // ----------- COIN FLIP LOGIC ----------- //

    // Function to generate a pseudo-random number 0 or 1
    // 0 = heads
    // 1 = tails
    function random() public view returns (uint) {
    return uint(
        keccak256(
            abi.encodePacked(
                block.prevrandao,
                block.timestamp,
                blockhash(block.number - 1),
                msg.sender
            )
        )
    ) % 2;
}

    // Function to determine if the player won (example: if random() = 0 and choice = heads, player wins)
    function flipCoin(uint256 betAmount, bool isHeads) public {
        // Check if the player has enough tokens to bet
        require(balanceOf(msg.sender) >= betAmount, "Insufficient balance");
        require(betAmount > 0, "Bet amount must be greater than 0");
        
        // Burn the player's tokens that they bet
        _burn(msg.sender, betAmount);
        
        // Determine if player won
        uint result = random();
        bool playerWon = (isHeads && result == 0) || (!isHeads && result == 1);
        
        if (playerWon) {
            mint(msg.sender, betAmount * 2);
        }
        
        // Emit the event with all relevant information
        emit CoinFlipResult(msg.sender, betAmount, isHeads, result, playerWon);
    
    }

}