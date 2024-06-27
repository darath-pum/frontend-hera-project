<template>
    <div class="add-campaign container">
        <h1 class="page-title">Add Campaign</h1>
        <p class="desc page-description">Campaign management involves strategic planning, execution, and analysis of
            marketing campaigns
            to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.</p>

        <form action="" class="flex flex-col gap-7" ref="form">
            <div class="g-one">
                <div class="title">
                    <label for="">Title: <span v-if="pathName == 'title'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="text" v-model="title" :style="pathName == 'title'?'border:2px solid red':''" @click="pathName = ''">
                </div>

                <div v-if="isSelectGame" class="dialog-backdrop" @click="isSelectGame = false"
                    :class="[isSelectGame ? 'active' : '']"></div>
                <div class="item-center w-full">
                    <label for="game-category" class="col-span-1 my-auto">
                        <h1>Games:</h1>
                    </label>
                    <div @click="showSelectGame"
                        class="select-game relative cursor-pointer top-[3px] w-full col-span-2 z-50 flex flex-row item-center justify-between">
                        <p class="my-auto text-gray-400 select-none w-fit line-clamp-1">{{ gamesList }}</p>
                        <span class="material-symbols-outlined flex flex-row items-center text-gray-400 select-none"
                            :class="{ 'rotate-180': isSelectGame }">
                            arrow_drop_down
                        </span>
                        <div class="absolute left-0 top-[45px]  px-1 py-2 bg-white w-[100%] shadow-md select-cat "
                            v-if="isSelectGame" @click.stop>
                            <div class="max-h-[300px] overflow-y-auto">
                                <div class="flex gap-5 item-center px-5 hover:bg-gray-100 h-10 mr-2 rounded-md"
                                    @click="addUserGame(it.title, it.id)" v-for="(it, index) in userGames" :key="it.id">
                                    <input type="checkbox" :id="it.title" :name="it.title"
                                        :checked="user_game_id.includes(it.id)" class="border-none" />

                                    <p class=" my-auto">{{ it.title }}</p>

                                </div>
                            </div>
                        </div>
                        <!-- <p v-for="(inde, index) in userGames">{{ inde.title }}</p> -->

                    </div>

                </div>
            </div>
            <div class="g-two">
                <div class="start-date">
                    <label for="">Start Date: <span v-if="pathName == 'start_date'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="date" v-model="start_date" :style="pathName == 'start_date'?'border:2px solid red':''" @click="pathName = ''">
                </div>
                <div class="end-date">
                    <label for="">End Date: <span v-if="pathName == 'end_date'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="date" v-model="end_date" :min="minStartDate" :style="pathName == 'end_date'?'border:2px solid red':''" @click="pathName = ''">
                </div>
            </div>
            <div class="g-three">
                <div class="image" >
                    <label for="">Image: <span v-if="pathName == 'image'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="file" @change="handleImage" >
                    <div class="select-image" :style="pathName == 'image'?'border:2px solid red':''" @click="pathName = ''">
                        <span class="material-symbols-outlined">
                            add_circle </span>
                        <img src="/image-icon.png" alt="" v-if="!image_url">
                        <img :src="image_url" alt="" v-else>
                    </div>
                </div>
                <div class="campain-desc">
                    <label for="">Description: <span v-if="pathName == 'desc'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <textarea name="" id="" v-model="desc" :style="pathName == 'desc'?'border:2px solid red':''" @click="pathName = ''"></textarea>
                </div>
            </div>
        </form>

        <div class="flex flex-row justify-end gap-5 -mt-7">


            <button class="secondary-btn " @click="$router.back()">Cancel</button>
            <button class="primary-btn w-20" @click="addCampaign">
                <Loading v-if="loading"></Loading>
                <span v-else>Submit</span>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useAuthStore } from '~/store/auth'
import Loading from '~/components/Loading.vue'

const authStore = useAuthStore()
const allGamesUser = ref<string[]>([]);
const gamesList = ref('Select Game');
const isSelectGame = ref(false)
const pathName = ref('')
const invalidMessage = ref('')
const title = ref('');
const desc = ref('');
const image_url:any = ref('')
const image = ref<File|null>(null);
const start_date = ref('');
const end_date = ref('');
const user_game_id = ref<any[]>([])
const loading = ref(false)


const handleImage = async (event: any) => {
    const file = event.target.files[0];
    image.value = file
    image_url.value = await getBase64(file)
    const errCpImage = validCpImage(image.value)
    if (errCpImage) {
        pathName.value = 'image'
        invalidMessage.value = errCpImage
        return
    } else {
        pathName.value = ''
        invalidMessage.value = ''
    }


}
const userGames = ref<any[]>([])

const getAllUserGame = async () => {
    const res = await callAPI(`/dashboard/game/user/getUserGames/${authStore.id}`);
    if (res.status == 200) {
        userGames.value = res.data

    }
}
const showSelectGame = () => {
    isSelectGame.value = !isSelectGame.value
}
const addUserGame = (title: string, id: number) => {
    if (!user_game_id.value.includes(id)) {
        allGamesUser.value.push(title);
        user_game_id.value.push(id);

    } else {
        const index = user_game_id.value.indexOf(id);
        allGamesUser.value.splice(index, 1);
        user_game_id.value.splice(index, 1);
    }
    gamesList.value = allGamesUser.value.join(', ');

};
const addCampaign = async () => {

    const errTitle = validTitle(title.value)
    const errDesc = validDescription(desc.value)
    const errStartDate = validateDate(start_date.value)
    const errEndDate = validateDate(end_date.value)
    const errCpImage = validCpImage(image.value)
    if (errTitle) {
        pathName.value = 'title'
        invalidMessage.value = errTitle
        return;
    }
    if (errStartDate) {
        pathName.value = 'start_date'
        invalidMessage.value = errStartDate
        return;
    }
    if (errEndDate) {
        pathName.value = 'end_date'
        invalidMessage.value = errEndDate
        return;
    }
    if (errCpImage) {
        pathName.value = 'image'
        invalidMessage.value = errCpImage
        return
    }
    if (errDesc) {
        pathName.value = 'desc'
        invalidMessage.value = errDesc
        return;
    } else {
        pathName.value = ''
        invalidMessage.value = ''
    }

    const formData = new FormData();

    formData.set("title", title.value);
    formData.set("desc", desc.value);
    if (image.value) {
        formData.append("image", image.value);
    }
    formData.set("start_date", new Date(start_date.value).toISOString());
    formData.set("end_date", new Date(end_date.value).toISOString());
    formData.set("user_game_id", JSON.stringify(user_game_id.value))
    loading.value = true
    const res = await callAPI('/dashboard/campaign/createCampaign', 'POST', formData);
    if (res.status == 200) {
        loading.value = false
        window.location.href = '/campaigns';
    }
}
const minStartDate = computed(() => {
    if (start_date.value) {
        const startDate = new Date(start_date.value);
        return startDate.toISOString().split("T")[0];
    }
});
onMounted(() => {
    getAllUserGame()
})

</script>
<style scoped>
form {
    margin-top: 4rem !important;
}

.g-one,
.g-two,
.g-three {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 2rem;
    /* background: #000; */
}

.title,
.select,
.start-date,
.end-date,
.image,

.campain-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
}

label {
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}

input,
.select-game,
textarea,
.selelect-game,
.select-icon {
    padding: 0.6rem 0.6rem;
    border: 1px solid #000000;
    border-radius: 5px;
}


.dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #00000000;
    z-index: 9 !important;
    display: none;
}

.dialog-backdrop.active {
    display: block;
}

#checkbox {
    width: 2rem;
}

textarea,
.image input {
    height: 5rem;
    width: 100%;
}

.image input {
    z-index: 10;
    cursor: pointer;
    opacity: 0;

}

.select-image {
    height: 5rem;
    border: #000000 solid 1px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -5rem;
}

.select-image img {
    position: absolute;
    width: 5rem;
}

.select-image span {
    z-index: 1;
    color: #a5a4a4;
    position: absolute;
    font-weight: 600;
}


@media (max-width:67.5rem) {
    form {
        margin-top: 2rem;
        gap: 1rem;
    }

    input,
    .select-game,
    textarea,
    .select-game {
        padding: 0.5rem;
        font-size: 0.7rem;
    }

    .select-game {
        height: 2.1rem;
    }




    textarea,
    .image input,
    .select-image {
        height: 4rem;

    }

    .select-image {
        margin-top: -4rem;
    }

    .select-image img {
        width: 4rem;
    }

    label {
        font-size: 0.7rem;
    }

    .g-one,
    .g-two,
    .g-three {
        gap: 2rem;
    }

    .choose-select {
        margin-top: 3.4rem;
        width: 17.8rem;
        border: 1rem solid #FFFFFF;
        gap: 1rem;

    }
}
</style>