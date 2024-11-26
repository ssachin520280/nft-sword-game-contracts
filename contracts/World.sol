// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract World {
    // World will contain the map of all the owners of multiple nft collections 
    mapping(address => mapping(uint256 => address)) public tokenOwners;

    event ItemImported(
        address indexed sword,
        uint256 indexed tokenId
    );
    event ItemExported(
        address indexed sword,
        uint256 indexed tokenId
    );

    function importItem(address sword, uint256 tokenId) public {
        IERC721(sword).transferFrom(msg.sender, address(this), tokenId);
        tokenOwners[sword][tokenId] = msg.sender;
        emit ItemImported(sword, tokenId);
    }

    function exportItem(address sword, uint256 tokenId) public {
        require(tokenOwners[sword][tokenId] == msg.sender, "You are not the owner of this item");
        IERC721(sword).transferFrom(address(this), tokenOwners[sword][tokenId], tokenId);
        emit ItemExported(sword, tokenId);
    }

}