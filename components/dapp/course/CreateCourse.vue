<template>
<div class="container">
    <div class="settings">
        <div class="cover">
            <img :src="course.photo" id="cover" alt="" />
            <i class="fa-solid fa-pen-to-square">
                <input type="file" accept="image/*" v-on:change="choosePhoto($event)" />
            </i>
        </div>

        <div class="form">
            <div class="edit">
                <p class="label">Course name *</p>
                <input :class="getInputClassForName()" type="text" v-model="course.name" placeholder="Music producer" maxlength="60" />
                <p v-if="errorName" class="error-text">{{ errorName }}</p>
            </div>

            <div class="edit">
                <p class="label">Course description *</p>
                <input :class="getInputClassForDescription()" v-model="course.description" type="text" placeholder="Compose a love song for an emotional movie" />
                <p class="error-text" v-if="errorDescription">
                    {{ errorDescription }}
                </p>
            </div>

            <div class="edit">
                <p class="label">Category *</p>
                <select v-on:change="onCategoryChanged($event)">
                    <option disabled hidden>Choose category</option>
                    <option v-for="(category, index) in categories" :key="index" :value="index">
                        {{ category.name }}
                    </option>
                </select>
                <p v-if="errorCategory" class="error-text">{{ errorCategory }}</p>
            </div>

            <div class="edit">
                <p class="label">Level *</p>
                <select v-on:change="onLevelChanged($event)">
                    <option selected disabled hidden>Choose level</option>
                    <option v-for="(level, index) in levels" :key="index" :value="index + 1">
                        {{ level }}
                    </option>
                </select>
            </div>

            <div class="edit">
                <p class="label">Preview video *</p>
                <div class="video">
                    <input accept="video/*" v-on:change="choosePreview($event)" type="file" />
                </div>
            </div>

            <div class="edit">
                <p class="label">Course visibility</p>
                <div class="switch-con">
                    <p>Publish this course?</p>
                    <label class="switch">
                        <input type="checkbox" v-model="course.publish" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

            <div class="edit">
                <p class="label">Course certification</p>
                <div class="switch-con">
                    <p>Want to issue certificate?</p>
                    <label class="switch">
                        <input type="checkbox" v-model="course.certificate" />
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

            <div class="edit">
                <p class="label">Course price in BDL*</p>
                <input :class="getInputClassForPrice()" v-model="course.price" type="number" min="0" placeholder="0" />
                <p class="error-text" v-if="errorPrice">{{ errorPrice }}</p>
            </div>

            <div class="sign_up" v-if="!creating" v-on:click="createCourse()">
                Save changes
            </div>
            <div class="sign_up" v-else>Please wait..</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            course: {
                name: "",
                description: "",
                photo: "/images/placeholder2.png",
                price: "",
                level: "",
                preview: "",
                certificate: false,
                publish: false,
            },
            errorName: null,
            errorDescription: null,
            errorPrice: null,
            errorCategory: null,
            levels: ["Beginner", "Intermediate", "Advanced"],
            creating: false,
            photoFile: null,
            previewFile: null,
            fetching: true,
            notFound: false,
            selectedCategory: 0,
            categories: [],
            courseContract: null
        };
    },
    created() {
        this.getCategories();
        this.$contracts.initCourseContract(this.$auth.provider);
        $nuxt.$on("course-contract", (contract) => {
            this.courseContract = contract;
        });
    },
    methods: {
        choosePreview: function (event) {
            const file = event.target.files[0];
            this.previewFile = file;
        },
        choosePhoto: function (event) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            this.photoFile = file;
            document.getElementById("cover").src = url;
        },
        createCourse: async function () {
            if (this.creating || !this.courseContract) return;
            this.creating = false;

            if (this.selectedCategory == null) {
                this.errorCategory = "Select a category";
                return;
            } else {
                this.errorCategory = null;
            }

            if (
                this.errorName != null ||
                this.errorDescription != null ||
                this.errorPrice != null
            ) {
                return;
            }

            if (
                this.course.name == "" ||
                this.course.description == "" ||
                this.course.price == ""
            ) {
                return;
            }

            if (this.photoFile == null) {
                $nuxt.$emit("failure", {
                    title: "You must attach a thumbnail",
                    message: "Required field",
                });
                return;
            }

            if (this.previewFile == null) {
                $nuxt.$emit("failure", {
                    title: "You must attach a preview video",
                    message: "Required field",
                });
                return;
            }

            this.creating = true;

            if (this.photoFile != null) {
                const base64 = await this.$ipfs.toBase64(this.photoFile);
                const url = await this.$ipfs.upload(
                    `courses/photos/${this.courseId}`,
                    base64
                );

                if (url != null) {
                    this.course.photo = url;
                }
            }

            if (this.previewFile != null) {
                const base64 = await this.$ipfs.toBase64(this.previewFile);
                const url = await this.$ipfs.upload(
                    `courses/previews/${this.courseId}`,
                    base64
                );

                if (url != null) {
                    this.course.preview = url;
                }
            }

            try {
                const id = Math.floor(Math.random() * 999999999999) + 1;
                const trx = await this.courseContract.createCourse(
                    id,
                    this.categories[this.selectedCategory].id,
                    this.$utils.toWei(this.course.price),
                    this.course.name,
                    this.course.description,
                    this.course.photo,
                    this.course.preview,
                    this.course.certificate,
                    this.course.publish, {
                        from: this.$auth.accounts[0],
                    }
                );
                this.$router.push("/app/courses");
            } catch (error) {
                console.log(error);
            }

            this.creating = false;
        },
        getCategories: async function () {
            this.categories = await this.$firestore.fetchAll("categories");
        },
        onCategoryChanged(event) {
            this.selectedCategory = event.target.value;
        },
        onLevelChanged(event) {
            this.selectedLevel = event.target.value;
        },
        getInputClassForName() {
            if (this.course.name == "") {
                this.errorName = null;
                return "";
            }
            if (this.course.name.length < 4) {
                this.errorName = "Name is too short";
                return "error filled";
            } else {
                this.errorName = null;
                return "filled";
            }
        },
        getInputClassForDescription() {
            if (this.course.description == "") {
                this.errorDescription = null;
                return "";
            }
            if (this.course.description.length < 10) {
                this.errorDescription = "Description is too short";
                return "error filled";
            } else {
                this.errorDescription = null;
                return "filled";
            }
        },
        getInputClassForPrice() {
            if (this.course.price == "") {
                this.errorPrice = "Minimum of 0 BDL";
                return "";
            } else {
                this.errorPrice = null;
                return "filled";
            }
        },
    },
};
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 100px;
    padding-bottom: 80px;
}

.settings {
    width: 600px;
    max-width: 100%;
}

.cover {
    width: 100%;
    height: 300px;
    position: relative;
}

.cover i {
    position: absolute;
    bottom: -30px;
    left: 30px;
    width: 60px;
    height: 60px;
    background: #3451f3;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 20px;
    overflow: hidden;
}

.cover input {
    position: absolute;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    width: 100%;
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form {
    margin-top: 100px;
}

.form .edit {
    width: 100%;
    margin-top: 40px;
}

.form .label {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    color: #b8c0e6;
    margin-bottom: 10px;
}

.form input,
select {
    height: 50px;
    border: 2px solid #b8c0e6;
    border-radius: 8px;
    background: transparent;
    width: 100%;
    padding: 0 20px;
    margin-top: 10px;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.02em;
    outline: none;
    color: #f9f6ed;
}

option {
    color: #3d392a;
}

.form .filled {
    border: 2px solid #007a00;
}

.form .error {
    border: 2px solid #c74f4f;
}

.form .error-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.02em;
    color: #c74f4f;
    margin-top: 10px;
}

.sign_up {
    height: 60px;
    background: linear-gradient(90deg, #4b87f6 -43.68%, #3451f3 72.76%);
    border-radius: 8px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    cursor: pointer;
    margin-top: 60px;
    font-weight: 500;
    font-size: 20px;
    color: #ffffff;
}

.switch-con {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}

.switch-con p {
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.switch :checked+.slider {
    background-color: #4b87f6;
}

.switch :focus+.slider {
    box-shadow: 0 0 1px #3451f3;
}

.switch :checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
