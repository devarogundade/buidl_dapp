// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executables/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

// message receiver @Buidl.sol

contract MessageSender is AxelarExecutable {
    // topics
    uint constant SUBSCRIBE = 1;
    uint constant UN_SUBSCRIBE = 2;
    /* course */
    uint constant CREATE_COURSE = 3;
    uint constant UPDATE_COURSE = 4;
    /* user */
    uint constant CREATE_USER = 5;
    uint constant UN_LOCK_CREATOR = 6;
    uint constant LOCK_CREATOR = 7;
    /* staking */
    uint constant STAKE = 8;
    uint constant UN_STAKE = 9;
    /* revenue */
    uint constant CLAIM_REVENUE = 10;
    /* category */
    uint constant CREATE_CATEGORY = 11;

    /* axelar */
    IAxelarGasService public immutable gasReceiver;

    /* destination */
    string private destinationChain;
    string private destinationAddress;

    constructor(
        address gateway_,
        address gasReceiver_,
        string memory destinationChain_,
        string memory destinationAddress_
    ) AxelarExecutable(gateway_) {
        gasReceiver = IAxelarGasService(gasReceiver_);

        destinationChain = destinationChain_;
        destinationAddress = destinationAddress_;
    }

    /* @param id == the course id on bsc testnet */
    function subscribe(uint id, uint256 nftId) public payable {
        bytes memory payload = packMessage(
            SUBSCRIBE,
            id,
            msg.sender,
            Strings.toString(nftId)
        );

        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    /* @param id == the course id on bsc testnet */
    function unSubscribe(uint id) public payable {
        bytes memory payload = packMessage(
            UN_SUBSCRIBE,
            id,
            msg.sender,
            ""
        );

        if (msg.value > 0) {
            gasReceiver.payNativeGasForContractCall{value: msg.value}(
                address(this),
                destinationChain,
                destinationAddress,
                payload,
                msg.sender
            );
        }

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function packMessage(
        uint _topic,
        uint _id,
        address _sender,
        string memory extra
    ) public pure returns (bytes memory) {
        return abi.encodePacked(_topic, _id, _sender, extra);
    }
}
