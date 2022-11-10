<template>
<InProgress v-if="fetching" />
<div class="container" v-else>
    <div class="grid">
        <div class="chat">
            <!-- <div class="online" v-if="members.length > 0">Sam is typing.. and 2 members online</div> -->
            <div class="messages" v-if="messages.length > 0">
                <div class="items">
                    <div class="message" v-for="(message, index) in messages" :key="index">
                        <div class="item me" v-if="message.type == 'text' && message.sender == $auth.accounts[0].toUpperCase()">
                            <p class="text">{{ message.text }}</p>
                            <p class="time">12:54 today</p>
                        </div>

                        <div class="item other" v-if="message.type == 'text' && message.sender != $auth.accounts[0].toUpperCase()">
                            <p class="text">{{ message.text }}</p>
                            <p class="time">12:54 today</p>
                        </div>

                        <div class="item me" v-if="message.type == 'image' && message.sender == $auth.accounts[0].toUpperCase()">
                            <img :src="message.image" alt="">
                            <p class="time">just now</p>
                        </div>

                        <div class="item other" v-if="message.type == 'image' && message.sender != $auth.accounts[0].toUpperCase()">
                            <img :src="message.image" alt="">
                            <p class="time">just now</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="explain" v-else>
                <h3>No messages</h3>
                <p>
                    Use the input box below to start a conversation.
                </p>
                <div class="action">
                    Use the <i class="fa-solid fa-image"></i> icon to send an image to the chat.
                </div>
            </div>
            <div class="write">
                <input type="text" v-model="textMessage" v-on:keyup.enter="writeMessage()" placeholder="Write your message here.." />
                <div class="files">
                    <i class="fa-regular fa-image scaleable"></i>
                    <i class="fa-solid fa-file scaleable"></i>
                </div>
            </div>
        </div>
        <div class="tools">
            <div class="title">
                <h3>Creator</h3>
            </div>
            <div class="members">
                <div class="member" v-if="creator">
                    <img :src="creator.photo" alt="">
                    <div class="profile">
                        <h3>{{ creator.name }}</h3>
                        <p class="tag">Instructor</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            textMessage: '',
            messages: [],
            creator: null,
            courseId: this.$route.params.course,
            course: null,
            fetching: true
        }
    },
    async created() {
        this.course = await this.$firestore.fetch('courses', this.courseId)
        $nuxt.$emit(`course${this.courseId}`, this.course);
        this.fetching = false

        this.creator = await this.$firestore.fetch('users', this.course.address.toUpperCase())

        this.getAllMessages()
    },
    methods: {
        getAllMessages: async function () {
            if (this.$auth.accounts.length == 0 || this.course == null) return

            this.messages = await this.$firestore.fetchAllWhere(
                'chats', 'roomId', '==', this.getRoomId(this.$auth.accounts[0], this.course.address)
            )
        },

        writeMessage: function () {
            if (this.textMessage == '' || this.$auth.accounts.length == 0 || this.course == null) return

            this.$firestore.write('chats', 'weewe', {
                text: this.textMessage,
                timestamp: Date(),
                type: 'text',
                sender: this.$auth.accounts[0].toUpperCase(),
                roomId: this.getRoomId(this.$auth.accounts[0], this.course.address)
            })

            // clear input
            this.textMessage = ''
        },

        getRoomId: function (memberA, memberB) { // unique yet constructible id
            if (memberA > memberB) return `${memberA}-${memberB}`
            return `${memberB}-${memberA}`
        }
    }
}
</script>

<style scoped>
.grid {
    width: 100%;
    display: grid;
    grid-template-columns: auto 450px;
    column-gap: 40px;
}

.explain {
    border-radius: 30px;
    max-width: 90%;
    width: 400px;
    background: #23242F;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    color: #FFFFFF;
    padding: 30px;
}

.explain h3 {
    font-size: 30px;
    font-family: 'Poppins', sans-serif;
}

.explain a {
    color: #0177fb;
}

.explain p {
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
}

.explain .action {
    margin-top: 40px;
    background: #0177fb;
    padding: 8px 10px;
    border-radius: 16px;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    font-weight: 600;
}

.action i {
    padding: 4px;
    border-radius: 50%;
    background: #FFFFFF;
    color: #0177fb;
}

.chat {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    position: relative;
}

.online {
    width: 100%;
    padding: 4px;
    background: #0176fb57;
    border-radius: 6px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    backdrop-filter: blur(20px);
    font-weight: bold;
    position: fixed;
    z-index: 1;
    top: 110px;
    width: 500px;
    transform: translate(-50%, 0);
    max-width: 100%;
    left: 46.5%;
}

.messages {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 600px;
    position: relative;
    width: 100%;
    padding-top: 120px;
    padding-bottom: 120px;
}

.write {
    position: fixed;
    bottom: 30px;
    left: 46.5%;
    transform: translate(-50%, 0);
    display: grid;
    grid-template-columns: auto 140px;
    width: 600px;
    max-width: 100%;
    column-gap: 20px;
}

.write .files {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
}

.files i {
    height: 60px;
    width: 60px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    user-select: none;
    background: #0177fb;
    color: white;
    cursor: pointer;
}

.write input {
    background: #fff;
    border-radius: 25px;
    border: none;
    outline: none;
    line-height: 26px;
    font-size: 18px;
    padding: 16px 20px;
    resize: none;
    overflow: hidden;
}

.items {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 20px;
}

.message {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.item {
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
    min-width: 200px;
    max-width: 90%;
}

.me {
    background: #42ff97;
    border-bottom-right-radius: 0px;
    align-self: flex-end;
}

.other {
    background: #fff;
    border-bottom-left-radius: 0px;
}

.item .text {
    font-size: 16px;
    margin-bottom: 8px;
}

.item .time {
    font-size: 12px;
    opacity: 0.8;
}

.me .time {
    width: 100%;
    text-align: right;
}

.item img {
    width: 400px;
    max-width: 100%;
    border-radius: 6px;
}

.tools {
    border-left: 1px rgb(201, 227, 255) solid;
    height: calc(100vh - 100px);
    position: sticky;
    top: 100px;
    padding: 20px;
    padding-left: 40px;
    padding-right: 0;
}

.tools .title>h3 {
    font-size: 30px;
    color: #FFFFFF;
    margin-bottom: 20px;
}

.members {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.member {
    display: grid;
    gap: 16px;
    align-items: center;
    grid-template-columns: 40px auto;
    color: #FFFFFF;
}

.task .member {
    grid-template-columns: 40px auto 24px;
}

.member i {
    background: #b10202;
    border-radius: 20px;
    font-size: 14px;
    width: 24px;
    cursor: pointer;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.member .tag {
    background: #FF6370;
    border-radius: 6px;
    font-size: 14px;
    width: fit-content;
    margin-top: 6px;
    color: #2C2D3A;
    padding: 3px 10px;
}

.task .member {
    padding: 40px 30px;
}

.member h3 {
    font-size: 16px;
}

.member img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 20px;
    cursor: pointer;
}
</style>
