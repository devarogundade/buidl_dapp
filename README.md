Old Github (262 commits) -> https://github.com/devarogundade/buidl 

# Buidl - SocialFi for Creators and Learners
## _A Moralis X Google Cloud Hackathon Project_

Buidl is a Social-Fi and Decentralized Autonomous Organization (DAO) for video content creators (e.g instructors, YouTubers, DIY makers, etc) anyone that shares their skills with other people online either for free or at a particular cost.

Today, there are various existing Web2 solutions for this particular aspect, but we are taking it further leveraging blockchain technology to provide more secured, learning incentives with ownership to the community pattern.

To become a creator on the buidl platform requires a minimum stake of 2000 BDL tokens for a minimum duration of one year, if staking is withdrawn after one year the user is not a creator anymore until they restake a minimum of 2000 BDL back in the contract.
A creator with suspicious activities and a high report rate is subjected to ban and their staked BDL token remains locked in the smart contract, this feature helps us maintain the DAO a safe community.

We have heavily used moralis stream and smart contract events, which has helped us maintain a very low gas cost on the platform, and also introduce alternative gas options like $MATIC & $FANTOM with the help of Axelar a cross chain messaging protocol.

## Core Features
- # Incentives for learning
    Non-creators (i.e learners) will cover the largest base of the platform, it's a crucial part of the platform encourage and reward learners to retain them to use and enjoy the platform. 
   
    On each and every content (free/premium) a user purchases on the platform, given that they completed learning from the content a Buidl NFT will be minted for them randomly and based on the content price.
    
    The Buidl NFT serves as a coupon(discount) on premium contents, each nft has a percentage attribute which ranges from 0 ~ 50, this percenage attribute is the percentage of the nft discount on a course.
    
    The NFT can be traded in exchange for cryptocurrency to other users on marketplaces like Opensea.io
    
- # Cryptocurrency payment and Guaranteed refund system using Staking protocol
    The Buidl Token(BDL) is the only payment method of the platform, which will be available on DEX and CEX, cryptocurrency has given us the ability to ensure a guaranteed & instant refund policy compared to web2 where it's complex and slow to refund back through the channel the money was charged.
    
    Whenever content is purchased on the platform, the tokens are staked in the smart contract, and released to the creator after two weeks. Learners can create a refund and instantly receive back their tokens with a deduction of the sections of the content consumed already.

- # Account Bound Certificate (ERC4973)
    Account Bound Certificate an ERC4973 token that cannot be transferred between addresses like normal Erc20 or Erc721. Creators can set quizzes (exams) for each content they create to mint an Account Bound certificate for subscribers(learners).
    
    On-chain certificates generatees the true ownership of the certificate, and can also be verified on the buidl explorer page by looking up for the cerfiticate id.

- # Protection on premium contents
    We are encrypting video chunks to IPFS with our own unique file extension that can only be streamed by the buidl video players dapps, this is how we have managed to protect premium contents on the platform, only the content subscribers can the watch the contents.
    
    Protecting videos online is not 100% achievable, as it can still be recorded from the device's screen.
    
    The Buidl Video Player dapp simply authenticates users with their wallet, interacts with our smart contracts to verifies if the user is legitimate to watch the content.

## Revenue Model
- We charge a 8% service fee from every earnings from the creators.

## Buidl Video Player
   Protecting videos online might not be 100% achievable but we are making it difficult to bypass them as possible with the buidl video player. This approach is well known in streaming services like netflix.
   Premium videos bought on the buidl platform cannot be streamed on the web, it's required to have a buidl video player on any of the supported devices.
   
   - Android (MVP)
   - IOS (Not Available)
   - Android TV (Not Available)
   
![1668176574145_100](https://user-images.githubusercontent.com/81397790/201360087-ee63b845-e609-4b33-965f-7ebd3320181e.PNG)![1668176562091_100](https://user-images.githubusercontent.com/81397790/201360113-a4b55c9a-4a60-4215-9c72-146e05096bba.PNG)
![1668176562091_100](https://user-images.githubusercontent.com/81397790/201360134-82cfe4e1-c837-4e5e-87c3-f442a5e33395.PNG)

## Hackathon Tracks
- Binance Smart Chain => Social & Entertainment
  
## Hackathon Bounties
- Axelar

## Tech Stacks

- Binance Smart Chain (Testnet)
- Moralis Stream [#](https://github.com/devarogundade/Buidl/tree/master/moralis-stream-api) and Web3 APIs [#](https://github.com/devarogundade/Buidl/tree/master/plugins/moralis-apis)
- IPFS (File System) [#](https://github.com/devarogundade/Buidl/tree/master/plugins/moralis-apis/ipfs.js)
- Solidity (Smart Contract) [#](https://github.com/devarogundade/Buidl/tree/master/contracts)
- Nuxtjs (Frontend)
- Nodejs (Backend) 
- Truffle
- Axelar (Cross Chain Messaging) [#](https://github.com/devarogundade/Buidl/tree/master/contracts)
- Google Cloud Firebase [#](https://github.com/devarogundade/Buidl/tree/master/plugins/firestore.js)
- Android

## Demo

- See mode at https://buidl.netflify.app/
- Buidl Token Faucet https://buidl.netlify.app/mint

## Sneak peaks
![Screenshot 2022-11-11 151337](https://user-images.githubusercontent.com/81397790/201359847-65319d26-b7ed-4c6c-b36e-766be670108c.png)
![Screenshot 2022-11-11 151356](https://user-images.githubusercontent.com/81397790/201359869-69eb1832-4ef3-4be8-8204-9b20460be3b0.png)
![Screenshot 2022-11-11 151531](https://user-images.githubusercontent.com/81397790/201359890-a78b7402-f8f4-4674-be28-729c92d8e0ae.png)
![Screenshot 2022-11-11 151601](https://user-images.githubusercontent.com/81397790/201359912-69e6daa4-5640-4b28-8595-716d13ab9422.png)
![Screenshot 2022-11-11 151634](https://user-images.githubusercontent.com/81397790/201359946-96d3eadc-c5dc-475f-87db-769464f2f8fe.png)
![Screenshot 2022-11-11 151705](https://user-images.githubusercontent.com/81397790/201359969-92f10132-66e5-48e4-97a7-86d05fbf489a.png)

## Other Services
- Netlify
- Heroku

## Roadmap
   https://buidl.netlify.app/#roadmap

## Tokenomics
   Total Supply: 10,000,000,000
   Token Name: Buidl Token
   Token Symbol: BDL
   https://buidl.netlify.app/#bdl-token

## Contribution

Want to contribute? Great!

Reach out to me at https://linktr.ee/devarogundade

## Team
- Arogundade Ibrahim
