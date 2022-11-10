// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Base64} from "./../base/Base64.sol";

contract BdlNft is ERC721, Ownable {
    address deployer;
    uint256 tokenID = 1;

    using Strings for uint256;

    mapping(uint256 => string) private tokenURIs;
    mapping(uint256 => uint) public tokenPercentages;

    string private baseURIextended;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        deployer = msg.sender;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        baseURIextended = baseURI;
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI, uint percentage)
        internal
        virtual
    {
        require(_exists(tokenId), "!exist");
        tokenURIs[tokenId] = _tokenURI;
        tokenPercentages[tokenID] = percentage;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURIextended;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId), "!exist");

        string memory _tokenURI = tokenURIs[tokenId];
        string memory base = _baseURI();

        // if there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        // if both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        // if there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function mint(address to, uint256 /* coursePrice */) external {
        // TO DO random generation from chainlink base on coursePrice
        uint percentage = 4;

        /* generate a random nft based on price as reward to subscriber */
        string memory nftUri = generateNftMetadata(percentage);

        _mint(to, tokenID);
        _setTokenURI(tokenID, nftUri, percentage);

        tokenID++;
    }

    function burn(uint256 tokenId) external {
        _burn(tokenId);
    }

    function generateNftMetadata(uint /* percentage */)
        private
        pure
        returns (string memory)
    {
        string memory metadata = string(
            abi.encodePacked(
                '{"name": "Mr Monkey',
                '", "image": "https://buidl.netlify.app/images/nft2.jpg", "description": "This is NFT is a monkey NFT for Buidl coupon", "attributes":',
                '[{"display_type":"boost_number","trait_type":"Percentage","value":"4"}]',
                "}"
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.base64(bytes(metadata))
                )
            );
    }
}
