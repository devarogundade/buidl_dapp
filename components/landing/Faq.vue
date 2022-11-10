<template>
<section id="faqs">
    <div class="app-width">
        <h3>Frequently Asked Questions</h3>
        <div class="items">
            <div v-for="(faq, index) in faqs" :key="faq.question" :class="show == index ? 'show item' : 'item'">
                <div class="question" v-on:click="openFaq(index)">
                    <p>{{ faq.question }}</p>
                    <div class="handle">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="answer">
                    <p>{{ faq.answer }}</p>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    data() {
        return {
            show: -1,
            faqs: [{
                    question: 'What is BDL Token?',
                    answer: 'BDL Token is the platform currency required for purchasing courses, staking and reward bounties.'
                },
                {
                    question: 'What if I don\'t like a course?',
                    answer: 'Payment for courses are charged based on your progress and date of purchased. So if you stopped at 20% of the course before you cancelling 80% of the price will\'be refunded to you. Or you may not be able to reject the course after 2 weeks.'
                }, {
                    question: 'In what format are certificates?',
                    answer: 'Certificates are in form of ERC4973 a non tradeable and fungible token. This gives students true ownership of their certificate.'
                }, {
                    question: 'What is required to become a creator?',
                    answer: 'Creators are required to stake 2000 BDL tokens for a duration of 1year.'
                }
            ]
        }
    },
    methods: {
        openFaq(index) {
            if (this.show == index) {
                this.show = -1
            } else {
                this.show = index
            }
        }
    }
}
</script>

<style scoped>
section {
    padding-top: 100px;
    padding-bottom: 50px;
}

section h3 {
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
}

.items {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    will-change: auto;
}

.item {
    width: 900px;
    max-width: 100%;
    border: 4px solid #04215c;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.question {
    height: 100px;
    width: 100%;
    display: grid;
    grid-template-columns: auto 30px;
    column-gap: 10px;
    align-items: center;
    padding: 0 40px;
    cursor: pointer;
}

.question p {
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 0.02em;
    color: #F9F6ED;
    transition: .4s;
}

.show .question p {
    color: #FF6370;
}

.answer {
    height: 0;
    transition: .4s;
    padding-left: 40px;
    padding-right: 40px;
    will-change: auto;
}

.show .answer {
    padding-bottom: 40px;
    height: fit-content !important;
}

.answer p {
    font-weight: 400;
    font-size: 20px;
    line-height: 40px;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.8);
    transition: .4s;
}

.handle {
    width: 24px;
    height: 24px;
    position: relative;
}

.handle div:first-child {
    position: absolute;
    background: #FFFFFF;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    top: 10px;
    left: 0;
    transition: .4s;
}

.handle div:last-child {
    position: absolute;
    background: #FFFFFF;
    width: 4px;
    height: 100%;
    border-radius: 2px;
    top: 0;
    left: 10px;
    transition: .4s;
}

.show .handle div:last-child {
    transform: rotate(-90deg);
}

.show .handle div {
    background: #FF6370;
}

@media screen and (max-width: 700px) {
    section {
        padding-top: 50px;
        padding-bottom: 20px;
    }

    section h3 {
        font-size: 30px;
    }

    .items {
        margin-top: 60px;
    }

    .question {
        padding: 0 20px;
        height: 90px;
    }

    .question p {
        font-size: 18px;
        line-height: 27px;
    }

    .answer p {
        font-size: 18px;
        line-height: 36px;
    }

    .answer {
        padding-left: 20px;
        padding-right: 20px;
    }

    .show .answer {
        padding-bottom: 20px;
    }
}
</style>
