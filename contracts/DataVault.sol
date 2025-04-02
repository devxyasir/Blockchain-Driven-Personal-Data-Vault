// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataVault {
    address public owner;
    
    // Mapping from data hash to verification details
    mapping(bytes32 => DataVerification) public verifiedData;
    
    struct DataVerification {
        address owner;
        uint256 timestamp;
        bool verified;
    }
    
    // Events
    event DataVerified(bytes32 indexed dataHash, address indexed owner, uint256 timestamp);
    
    constructor() {
        owner = msg.sender;
    }
    
    // Verify data hash on the blockchain
    function verifyData(bytes32 dataHash) public {
        require(!verifiedData[dataHash].verified, "Data already verified");
        
        verifiedData[dataHash] = DataVerification({
            owner: msg.sender,
            timestamp: block.timestamp,
            verified: true
        });
        
        emit DataVerified(dataHash, msg.sender, block.timestamp);
    }
    
    // Check if data hash is verified
    function isVerified(bytes32 dataHash) public view returns (bool, address, uint256) {
        DataVerification memory verification = verifiedData[dataHash];
        return (verification.verified, verification.owner, verification.timestamp);
    }
}
