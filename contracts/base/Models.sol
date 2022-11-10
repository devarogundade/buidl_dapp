// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Models {
    struct User {
        uint id;
        bool verified;
        string photo;
        uint[] courses;
        uint createdAt;
    }

    struct Course {
        uint id;
        uint category;
        address creator;
        uint256 price;
        uint createdAt;
        uint updatedAt;
        uint sections;
        bool certificate;
    }

    struct Subscription {
        uint course; // id of course
        uint time; // time of subscription
        uint price; // price of subscription at the time of subscription
        address owner; // owner of subscription (learner)
        uint[] viewed; // sections of the course consumed
        uint sections; // sections of the course at the time of purchase
    }

    struct Revenue {
        uint256 unclaimed; // total tokens that are locked
        uint256 claimable; // total tokens that are available
        uint256 claimed; // total tokens claimed
    }

    struct Stake {
        uint256 amount;
        uint time;
        uint duration;
        int96 rewardFlowRate;
    }
}
