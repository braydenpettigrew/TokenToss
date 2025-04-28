// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BraydenToken is ERC20, Ownable, ERC20Permit, ERC20Burnable {
    // Coin flip event
    event CoinFlipResult(uint result, bool playerWon);

    // War event
    event WarGameResult(uint256 playerCard, uint256 dealerCard, uint256 playerSuit, uint256 dealerSuit, bool playerWon);

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

    // Function to generate a pseudo-random number
    // The salt is to add the ability to generate two different numbers for the same call twice in a row
    function random(uint256 modulus, uint256 salt) public view returns (uint) {
        return uint(
            keccak256(
                abi.encodePacked(
                    block.prevrandao,
                    block.timestamp,
                    blockhash(block.number - 1),
                    msg.sender,
                    salt
                )
            )
        ) % modulus;
    }

    // ----------- COIN FLIP LOGIC ----------- //

    // Function to determine if the player won the coin flip game
    function flipCoin(uint256 betAmount, bool isHeads) public {
        // Check if the player has enough tokens to bet
        require(balanceOf(msg.sender) >= betAmount, "Insufficient balance");
        require(betAmount > 0, "Bet amount must be greater than 0");
        
        // Burn the player's tokens that they bet
        _burn(msg.sender, betAmount);
        
        // Determine if player won
        uint result = random(2, 1);
        bool playerWon = (isHeads && result == 0) || (!isHeads && result == 1);
        
        if (playerWon) {
            mint(msg.sender, betAmount * 2);
        }
        
        emit CoinFlipResult(result, playerWon);
    
    }


    // ----------- WAR LOGIC ----------- //

    // Function to determine if the player won the war game
    function playWar(uint256 betAmount) public {
        // Check if the player has enough tokens to bet
        require(balanceOf(msg.sender) >= betAmount, "Insufficient balance");
        require(betAmount > 0, "Bet amount must be greater than 0");

        // Burn the player's tokens that they bet
        _burn(msg.sender, betAmount);

        // Generate random card values between 1-13
        uint256 playerCard = random(13, 1) + 1;
        uint256 dealerCard = random(13, 2) + 1;

        // Generate random suits between 0-3
        uint256 playerSuit = random(4, 3);
        uint256 dealerSuit = random(4, 4);

        // Determine if player won
        bool playerWon = playerCard > dealerCard;

        if (playerWon) {
            mint(msg.sender, betAmount * 2);
        }

        emit WarGameResult(playerCard, dealerCard, playerSuit, dealerSuit, playerWon);
    }

}