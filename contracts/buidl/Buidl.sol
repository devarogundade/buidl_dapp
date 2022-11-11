// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import {BdlNft} from "./BdlNft.sol";
import {BdlCertificate} from "./BdlCertificate.sol";
import {BdlToken} from "./BdlToken.sol";
import {BdlCourse} from "./BdlCourse.sol";
import {Staking} from "./Staking.sol";

import {Models} from "./../base/Models.sol";
import {Base64} from "./../base/Base64.sol";

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executables/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

import {StringToAddress, AddressToString} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/StringAddressUtils.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract Buidl is AxelarExecutable {
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

    using StringToAddress for string;
    using AddressToString for address;

    address private deployer;

    /* source chains */
    address private polygonAddress;
    address private fantomAddress;

    /* fee charged on every succesful subscription made */
    uint256 private subscriptionFee = 8; // percentage rate

    BdlNft private _bdlNft; // nft reward (coupon) contract
    BdlToken private _bdlToken; // erc20(streamable token) contract
    BdlCertificate private _bdlCertificate; // erc4973 certificate contract
    BdlCourse private _bdlCourse; // course contract
    Staking private _staking; // staking contract

    // creators requirement
    // these requirement helps us to filter fuds
    // and abuse of the ecosystem
    uint256 private creatorStakingFee = 2000 * 10**18;
    uint256 private creatorStakingDuration = 365 days;

    // earnings made on the platform so far
    uint256 private platformEarnings = 0;

    // ecosystem users
    mapping(address => Models.User) public users;
    mapping(address => Models.Revenue) public revenues;

    // keep track of certificate ID
    uint256 private certificateID;

    IAxelarGasService public immutable gasReceiver;

    // contructor
    constructor(
        address bdlToken,
        address bdlNft,
        address bdlCertificate,
        address bdlCourse,
        address staking,
        address gateway_,
        address gasReceiver_
    ) AxelarExecutable(gateway_) {
        deployer = msg.sender;

        _bdlNft = BdlNft(bdlNft);
        _bdlToken = BdlToken(bdlToken);
        _bdlCertificate = BdlCertificate(bdlCertificate);
        _bdlCourse = BdlCourse(bdlCourse);
        _staking = Staking(staking);

        gasReceiver = IAxelarGasService(gasReceiver_);
    }

    //  ========= Direct Contract Calls from Binance Network =========== //

    /* creates user metadata */
    function setAccount(string memory name, string memory photo) public {
        emit User(msg.sender, name, photo, users[msg.sender].verified);
    }

    /* stake in the smart contract */
    function stake(uint256 amount) public {
        _bdlToken.approve(msg.sender, address(this), amount);
        _bdlToken.transferFrom(msg.sender, address(this), amount);
        _staking.stake(
            msg.sender,
            amount,
            block.timestamp + creatorStakingDuration,
            0
        );
    }

    /* unlock creator */
    function unlockCreator() public notVerified {
        // check if user has staked min requirement
        require(
            _staking.hasStaked(creatorStakingFee, msg.sender),
            "!stake_requirement_first"
        );

        users[msg.sender].verified = true;
        emit Creator(msg.sender, true);
    }

    /* remove creator */
    function removeCreator() public onlyVerified {
        users[msg.sender].verified = false;
        emit Creator(msg.sender, false);
    }

    /* subscribe to a course */
    /* params course id */
    function subscribe(uint id, uint256 nftId) public {
        uint offPercentage = 0;
        if (nftId != 0) {
            // offPercentage = _bdlNft.tokenPercentages[nftId];
        }
        _subscribe(id, nftId, offPercentage, msg.sender);
    }

    /* subscribe to a course */
    /* params course id */
    function unSubscribe(uint id) public {
        _unSubscribe(id, msg.sender);
    }

    /* deployer to cashout earnings */
    function withdrawPlatformFee(uint256 amount) public onlyDeployer {
        require(platformEarnings >= amount, "insuficcient tokens");
        platformEarnings -= amount;
        _bdlToken.transfer(deployer, amount);
    }

    function onCourseComplete(uint id, string memory certificateUri) public {
        (bool isCertificate, uint256 coursePrice) = _bdlCourse.onCourseComplete(
            id,
            msg.sender
        );

        // checks if contents will award subscriber
        // a certificate for completing their study
        if (isCertificate) {
            /* issue certificate to subscriber */
            certificateID++;

            _bdlCertificate.mint(
                address(this),
                msg.sender,
                certificateID,
                certificateUri
            );
        }

        /*
         mint the coupon reward nft for
         user for completion
        */
        _bdlNft.mint(msg.sender, coursePrice);
    }

    // ========== Indirect Contract Calls by AXELAR ============== //

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload
    ) internal override {
        // bool isPolygon = compareStrings(sourceChain, "Polygon");
        // bool isFantom = compareStrings(sourceChain, "Fantom");

        // if (isPolygon) {
        //     require(
        //         sourceAddress.toAddress() == polygonAddress,
        //         "!unathorized"
        //     );
        // } else if (isFantom) {
        //     require(sourceAddress.toAddress() == fantomAddress, "!unathorized");
        // } else {
        //     require(1 == 2, "Unkwomn source chain");
        // }

        // reveal payload as message
        (uint topic, uint id, address sender, string memory extra) = unPackMessage(payload);

        /* message is a subscribe call */
        if (topic == SUBSCRIBE) {
            uint offPercentage = 0;
            // uint256 nftId = stringToUint(extra);
            uint256 nftId = 0;

            if (nftId != 0) {
                // offPercentage = _bdlNft.tokenPercentages[nftId];
            }
            _subscribe(id, nftId, offPercentage, sender);
        }

        /* message is an unsubscribe call */
        if (topic == UN_SUBSCRIBE) {
            _unSubscribe(id, sender);
        }
    }

    // ========== CORE IMPLEMENTIONS =========== //

    /* subscribe to a course */
    /* params course id */
    function _subscribe(
        uint id,
        uint256 nftId,
        uint offPercentage,
        address subscriber
    ) private {
        (uint256 price, address creator) = _bdlCourse.subscribe(id, subscriber);

        /* payment are locked in the smart contract */
        /* the course creator will be able to claim it after two weeks */
        /* if the course wasn't refunded by the subscriber */

        /* increase creator's unclaimed revenue */
        revenues[creator].unclaimed += price;
        uint256 priceCharge = price;

        if (nftId > 0) {
            // coupon detected
            // verifies the sender id the true owner
            require(_bdlNft.ownerOf(nftId) == subscriber, "!authorized");

            priceCharge = (price * (offPercentage / 100));

            // burn the nft
            _bdlNft.burn(nftId);
        }

        _bdlToken.approve(subscriber, address(this), priceCharge);
        _bdlToken.transferFrom(subscriber, address(this), priceCharge);
    }

    /* subscribe to a course */
    /* params course id  and subscriber address */
    function _unSubscribe(uint id, address subscriber) private {
        (
            uint256 payableAmount,
            uint256 earnings,
            address creator,
            uint256 price,
            uint256 _platformEarnings
        ) = _bdlCourse.unSubscribe(id, subscriber);

        // refund the user from the contract
        _bdlToken.transfer(subscriber, payableAmount);

        // deduct creator's unclaimed revenue
        revenues[creator].unclaimed -= price;

        // credit creator earnings from the refunded course
        revenues[creator].claimable += earnings;

        // credit platform from the refunded course
        platformEarnings += _platformEarnings;
    }

    // ======== Helpers ======= //

    function unPackMessage(bytes memory _data)
        public
        pure
        returns (
            uint _topic,
            uint _id,
            address _sender,
            string memory extra
        )
    {
        (uint _topic, uint _id, address _sender, string memory extra) = abi
            .decode(_data, (uint, uint, address, string));
        return (_topic, _id, _sender, extra);
    }

    function compareStrings(string memory a, string memory b)
        public
        view
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // function stringToUint(string s) private  returns (uint) {
    //     bytes memory b = bytes(s);
    //     uint result = 0;
    //     for (uint i = 0; i < b.length; i++) {
    //         // c = b[i] was not needed
    //         if (b[i] >= 48 && b[i] <= 57) {
    //             result = result * 10 + (uint(b[i]) - 48); // bytes and int are not compatible with the operator -.
    //         }
    //     }
    //     return result; // this was missing
    // }

    // ========= Administration ========== //

    function changeSourceAddresses(address polygon, address fantom)
        public
        onlyDeployer
    {
        polygonAddress = polygon;
        fantomAddress = fantom;
    }

    // ========= Modifiers ========== //

    modifier onlyVerified() {
        /* only account that has staked atleast 2000 BDL token */
        require(users[msg.sender].verified, "!authorized");
        _;
    }

    modifier notVerified() {
        /* only account that hasn't staked atleast 2000 BDL token */
        require(!users[msg.sender].verified, "!authorized");
        _;
    }

    modifier onlyDeployer() {
        /* only account that deployed the contract */
        require(msg.sender == deployer, "!authorized");
        _;
    }

    // == events == //
    event User(address owner, string name, string photo, bool verified);
    event Creator(address owner, bool verified);
}
