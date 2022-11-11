/* contracts */
const MessageSender = artifacts.require("MessageSender");

/* AXELAR */
const mumbaiGateway = "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B";
const mumbaiGasReceiver = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6";
const destinationName = "binance";
const destinationAddress = "0x35Ed7DF504E5138Ca3049697a35BBaB10f31819f";

/* AXELAR polygon mumbai contract */
module.exports = async function(deployer) {
    await deployer.deploy(
        MessageSender,
        mumbaiGateway,
        mumbaiGasReceiver,
        destinationName,
        destinationAddress
    );
};