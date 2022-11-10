const Test = artifacts.require("Test");

contract("Messaging test", async accounts => {
    it("INPUT should be the same as output", async() => {
        let instance = await Test.deployed()
        let topic = await instance.testTopic();
        console.log(topic);
        // assert.equal(topic, 0);
        const trx1 = await instance.input(1);
        console.log(trx1);
        topic = await instance.testTopic();
        console.log(topic);
        // assert.equal(topic, 1);
    });
});
