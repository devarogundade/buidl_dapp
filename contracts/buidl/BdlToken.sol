// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BdlToken is ERC20 {
    address private deployer;
    uint256 private allocation = 5000 * 10**decimals();
    mapping(address => uint) private allocations;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        deployer = msg.sender;
        _mint(deployer, 1000000000000 * 10**decimals());
    }

    function approve(
        address owner,
        address spender,
        uint256 amount
    ) public {
        _approve(owner, spender, amount);
    }

    function faucetMint() public {
        require(allocations[msg.sender] < allocation, "!cant_mint_more_tokens");
        allocations[msg.sender] = allocation;
        _approve(deployer, msg.sender, allocation);
        transferFrom(deployer, msg.sender, allocation);
    }
}
