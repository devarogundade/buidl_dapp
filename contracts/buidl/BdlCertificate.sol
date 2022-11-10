// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {ERC4973} from "./../accountbounds/ERC4973.sol";

contract BdlCertificate is ERC4973 {
    constructor(
        string memory name,
        string memory symbol,
        string memory version
    ) ERC4973(name, symbol, version) {}

    function getHash(
        address from,
        address to,
        string calldata tokenURI
    ) public view returns (bytes32) {
        return _getHash(from, to, tokenURI);
    }

    function mint(
        address from,
        address to,
        uint256 tokenId,
        string calldata uri
    ) external returns (uint256) {
        return _mint(from, to, tokenId, uri);
    }
}
