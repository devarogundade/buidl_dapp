<template>
<div class="study">
    <div class="refund">
        <div v-if="unlockedSections.length < sections.length">
            <div class="action" v-if="course && course.price > 0 && !refunding" v-on:click="refund()">
                Refund this course
            </div>
            <div class="action" v-if="course && course.price > 0 && refunding">Processing...</div>
        </div>
        <div v-if="course && course.certificate && (unlockedSections.length >= sections.length)">
            <div class="action mint" v-if="!minting" v-on:click="mintCertificate()">
                Mint Certificate
            </div>
            <div class="action mint" v-else>Minting...</div>
        </div>
    </div>
    <div class="sections">
        <div class="section" v-for="(section, index) in sections" :key="index">
            <p class="number">{{ index + 1 }}.</p>
            <h3 class="title">{{ section.title }}</h3>
            <p class="length">
                <i class="fa-solid fa-clock"></i>{{ section.duration / 1000 }} seconds
            </p>

            <p class="lock play" v-if="course && course.price == 0">
                <i class="fa-solid fa-play"></i> Watch
                <!-- <video :src="section.src" :poster="section.thumbnail"></video> -->
            </p>

            <p class="lock unlock" v-if="course && course.price > 0 && !unlockedSections.includes(section.sectionId)" v-on:click="viewSection(section.sectionId)">
                <i class="fa-solid fa-unlock"></i> Unlock
            </p>
            <p class="lock play" v-if="course && course.price > 0 && unlockedSections.includes(section.sectionId)">
                <i class="fa-solid fa-play"></i> Unlocked
            </p>
        </div>
    </div>

    <div class="screen" v-if="course">
        <div class="tag">Preview</div>
        <video :src="course.preview" :poster="course.photo" class="player" controls></video>
    </div>

    <div class="premium" v-if="course && course.price > 0">
        <p>
            This is a premium content. You have to use a Buidl Player Application to
            watch this sections.
        </p>

        <div class="download">
            <a href="/players/buidl.apk">
                <p>Download for Android</p>
            </a>
            <p>Download for IPhone <span>Soon</span></p>
            <p>Download for TV <span>Soon</span></p>
        </div>
    </div>
</div>
</template>

<script>
import Certificate from "/plugins/certificate.js";
export default {
    data() {
        return {
            courseId: this.$route.params.course,
            notFound: false,
            course: null,
            fetching: true,
            sections: [],
            swiper: null,
            user: this.$contracts.user,
            nfts: [],
            buidlContract: null,
            courseContract: null,
            refunding: false,
            minting: false,
            unlockedSections: [],
        };
    },
    created() {
        this.getCourse();
        this.getCourseSections();
        this.getUnlockedSections();

        this.$contracts.initBuidlContract(this.$auth.provider);
        $nuxt.$on("buidl-contract", (contract) => {
            this.buidlContract = contract;
        });

        this.$contracts.initCourseContract(this.$auth.provider);
        $nuxt.$on("course-contract", (contract) => {
            this.courseContract = contract;
            this.getUnlockedSections(contract);
        });
    },
    methods: {
        onComplete: async function () {},

        getCourse: async function () {
            this.course = await this.$firestore.fetch("courses", this.courseId);
            console.log(this.course);
            $nuxt.$emit(`course${this.courseId}`, this.course);
            this.fetching = false;
        },

        getCourseSections: async function () {
            this.sections = await this.$firestore.fetchAllWhere(
                "course-sections",
                "courseId",
                "==",
                this.courseId
            )
        },

        refund: async function () {
            if (this.buidlContract == null || this.$auth.accounts.length == 0) return;
            this.refunding = true;

            try {
                const trx = await this.buidlContract.unSubscribe(this.courseId, {
                    from: this.$auth.accounts[0],
                });

                $nuxt.$emit("success", {
                    title: "Refund successful",
                    message: "Your refund was successful",
                });

                this.$router.push("/app/courses");
            } catch (error) {
                $nuxt.$emit("error", "You can't refund this course");
            }

            this.refunding = false;
        },

        getUnlockedSections: async function () {
            if (this.$auth.accounts.length == 0) return;

            const subscription = await this.$firestore.fetch(
                "subscriptions",
                `${this.$auth.accounts[0].toUpperCase()}-${this.courseId.toUpperCase()}`
            );

            if (subscription != null) {
                this.unlockedSections = subscription.viewed;
            }
        },

        viewSection: async function (sectionId) {
            if (this.courseContract == null || this.$auth.accounts.length == 0)
                return;

            try {
                const trx = await this.courseContract.viewSection(
                    this.courseId,
                    sectionId, {
                        from: this.$auth.accounts[0],
                    }
                );

                this.getUnlockedSections();

                $nuxt.$emit('trx', trx.tx)
                $nuxt.$emit('success', {
                    title: 'Section unlocked',
                    message: 'Section was unlocked successfully'
                })

            } catch (error) {}
        },

        mintCertificate: async function () {
            if (this.$auth.accounts.length == 0 || this.buidlContract == null) return;
            this.minting = true;

            const user = await this.$firestore.fetch(
                "users",
                this.$auth.accounts[0].toUpperCase()
            );

            if (user == null) {
                $nuxt.$emit("error", "Set up your profile name first");
                this.minting = false;
                return;
            }

            const certificate = await Certificate.generateDocument(user.name);
            const certificateUrl = await this.$ipfs.upload("certificates", certificate);

            if (certificateUrl == null) {
                $nuxt.$emit("failure", {
                    title: 'Failed to mint',
                    message: 'Try again'
                });
                return;
            }

            const metadataCertificate = {
                name: this.course.name + " Certificate",
                description: "This certificate was issued on " + Date(),
                image: 'https://buidl.netlify.app/images/certificate.jpg',
                attributes: [{
                    value: certificateUrl,
                }],
            };

            const metadataUrl = await this.$ipfs.upload(
                "certificates", metadataCertificate
            );

            if (metadataUrl == null) {
                $nuxt.$emit("failure", {
                    title: 'Failed to mint',
                    message: 'Try again'
                });
                return;
            }

            console.log(metadataUrl);

            try {
                const trx = await this.buidlContract.onCourseComplete(
                    this.courseId,
                    metadataUrl, {
                        from: this.$auth.accounts[0],
                    }
                );

                $nuxt.$emit("trx", trx.tx);
                $nuxt.$emit('success', {
                    title: 'Certificate minted',
                    message: 'Successful!'
                })
            } catch (error) {
                $nuxt.$emit("failure", {
                    title: 'Failed to mint',
                    message: 'Try again'
                });
            }

            this.minting = false;
        },
    },
};
</script>

<style scoped>
.study {
    padding-top: 120px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.swiper-section {
    width: 100%;
    max-width: 1000px;
    overflow: hidden;
}

.swiper-wrapper {
    width: 100%;
}

.swiper-slide {
    width: 100%;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.swiper-pagination-bullet {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
}

.swiper-pagination-bullet-active {
    color: #fff;
    background: #007aff;
}

.sections,
.section {
    width: 100%;
}

.section {
    display: grid;
    grid-template-columns: 20px auto 120px 120px;
    height: 80px;
    gap: 30px;
    align-items: center;
    color: #ffffff;
    padding: 0 20px;
    border-bottom: 1px solid #fff;
}

.lock {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 10px;
    background: #007aff;
    cursor: pointer;
    user-select: none;
    height: 40px;
}

.length {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.unlock {
    color: #ff6370;
    background: #ffdee1;
}

.section .number {
    font-size: 20px;
}

.active {
    background: #007bff34;
}

.section .title {
    font-size: 24px;
    font-weight: 600;
}

.refund {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 40px;
    gap: 20px;
}

.refund .action {
    width: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #ff6370;
    color: #ff6370;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
}

.mint {
    border: 1px solid #007aff;
    color: #007aff;
}

.video {
    width: 100%;
    border-radius: 30px;
    background: #2c2d3a;
    overflow: hidden;
    position: relative;
}

.screen video {
    width: 100%;
    height: 540px;
    object-fit: cover;
}

.video i {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    background: #000000bd;
    color: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

.pager {
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pager div {
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #007aff;
    background: #ffffff;
    cursor: pointer;
    font-weight: 600;
    user-select: none;
    padding: 0 20px;
    gap: 10px;
}

.screen {
    width: 60%;
    max-width: 1000px;
    margin-top: 50px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
}

.player {
    height: 600px;
    width: 100%;
}

.premium {
    width: 100%;
    padding: 40px;
    border-radius: 30px;
    border-radius: 1px #fff solid;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
}

.premium>p {
    font-size: 20px;
    text-align: center;
    color: #fff;
}

.download {
    background: #2c2d3a;
    border-radius: 20px;
}

.download p {
    width: 350px;
    max-width: 100%;
    padding: 20px 24px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    border-bottom: 1px #007aff solid;
    user-select: none;
}

.download p:nth-child(3) {
    border: none;
}

.download span {
    background: #ff6370;
    color: #fff;
    font-size: 14px;
    padding: 3px 8px;
    border-radius: 6px;
}

.screen .tag {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 8px 20px;
    border-radius: 10px;
    background: #007aff;
    color: #fff;
    z-index: 2;
}

@media screen and (max-width: 800px) {
    .study {
        padding-top: 0;
        padding-bottom: 0;
    }
}
</style>
