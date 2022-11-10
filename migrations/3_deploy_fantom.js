/* contracts */
const MessageSender = artifacts.require("MessageSender");
const Message = artifacts.require("Message")

/* AXELAR */
const fantomGateway = "0x97837985Ec0494E7b9C71f5D3f9250188477ae14";
const fantomReceiver = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
const destinationName = "binance";
const destinationAddress = "0x025ceD7CB1C4a238fC1BDB7A9ae8bC01d551F385";

/* AXELAR fantom contract */
module.exports = async function(deployer) {
    await deployer.deploy(Message)
    deployer.link(Message, MessageSender)

    await deployer.deploy(
        MessageSender,
        fantomGateway,
        fantomReceiver,
        destinationName,
        destinationAddress
    );
};