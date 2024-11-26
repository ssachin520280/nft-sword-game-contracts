// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Sword is ERC721 {
    uint256 private _nextTokenId;

    constructor() ERC721("Sword", "SWRD") {}

    function mint() public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        return tokenId;
    }
}
