<template>
    <div class="add-campaign container">
        <h1 class="page-title">Edit Campaign</h1>
        <p class="desc page-description">Campaign management involves strategic planning, execution, and analysis of
            marketing campaigns
            to achieve
            specific objectives, targeting the right audience, and optimizing performance for desired results.</p>

        <form action="" class="flex flex-col gap-7">
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
                        <h1>Categories:</h1>
                    </label>
                    <div @click="showSelectGame"
                        class="select-game relative cursor-pointer select-cat w-full top-[3px] col-span-2 z-50 flex item-center justify-between">
                        <p class="my-auto text-gray-400 select-none w-fit line-clamp-1">{{ allGamesUser.join(', ') }}
                        </p>
                        <span
                            class="material-symbols-outlined w-fit flex flex-row items-center h-full my-auto text-gray-400 select-none"
                            :class="{ 'rotate-180': isSelectGame }">
                            arrow_drop_down
                        </span>
                        <div class="absolute left-0 top-[45px]  px-2 py-2 bg-white w-[100%] shadow-md select-cat "
                            v-if="isSelectGame" @click.stop>
                            <div class="max-h-[300px] overflow-y-auto">
                                <div class="flex gap-5 item-center px-5 hover:bg-gray-100 h-10 mr-2 rounded-md"
                                    @click="addUserGame(it.title, it.id)" v-for="(it, index) in userGames" :key="it.id">
                                    <input type="checkbox" :id="it.title" :name="it.title"
                                        :checked="user_game_id.includes(it.id)" class="border-none" />

                                    <p class="h-fit my-auto">{{ it.title }}</p>

                                </div>
                            </div>
                        </div>

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
                <div class="image">
                    <label for="">Image: <span v-if="pathName == 'image'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="file" @change="handleImage">
                    <div class="select-image" :style="pathName == 'image'?'border:2px solid red':''" @click="pathName = ''">
                        <span class="material-symbols-outlined">
                            add_circle </span>
                        <img src="/image-icon.png" alt="" v-if="!img_url">
                        <img :src="img_url" alt="" v-else>
                    </div>
                </div>
                <div class="campain-desc">
                    <label for="">Description: <span v-if="pathName == 'desc'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <textarea name="" id="" v-model="desc" :style="pathName == 'desc'?'border:2px solid red':''" @click="pathName = ''"></textarea>
                </div>
            </div>
        </form>
        <div class="flex flex-row justify-end gap-2 -mt-7">

            <button class="secondary-btn" @click="$router.back()">Cancel</button>

            <button class="primary-btn" @click="editCampaign">
                <Loading v-if="loading"></Loading>
                <span v-else>Save</span>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useAuthStore } from "~/store/auth"
import Loading from "~/components/Loading.vue"

const loading = ref(false)
const authStore = useAuthStore()
const campaign = ref()
const campaignId = useRoute().query.campaign
const gamesList = ref('Select Game');
const isSelectGame = ref(false);
const pathName = ref('')
const invalidMessage = ref('')
const title = ref('')
const start_date = ref('')
const end_date = ref('')
const img_url:any = ref('')
const image = ref<File|null>(null)
const desc = ref()
const user_game_id = ref<any>([])
const userGames:any = ref<any>()
const allGamesUser = ref<any>([])
const gameUserGameId = ref()


async function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const getCampaignById = async () => {
    const res = await callAPI(`/dashboard/campaign/getCampaignByID/${campaignId}`);
    console.log(res);

    campaign.value = res.data
    title.value = res.data.title
    desc.value = res.data.desc
    start_date.value = res.data.start_date.substring(0, 10)
    end_date.value = res.data.end_date.substring(0, 10)
    img_url.value = res.data.img_url
    gameUserGameId.value = res.data.user_game_id
    console.log("user game id", gameUserGameId.value);



}
const getAllUserGame = async () => {
    const res = await callAPI(`/dashboard/game/user/getUserGames/${authStore.id}`);
    if (res.status == 200) {
        userGames.value = res.data
        console.log("usersGame", userGames.value);
        for (let index:number = 0; index < (userGames.value).length; index++) {
            const guid:number = userGames.value[index].id;
            for (let i = 0; i < (gameUserGameId.value).length; i++) {
                const id = gameUserGameId.value[i];
                if (guid == id) {
                    allGamesUser.value.push(userGames.value[index].title)
                    user_game_id.value.push(guid);
                }

            }

        }

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
    console.log(user_game_id.value);

};

const handleImage = async (event: any) => {
    const file = event.target.files[0];
    image.value = file

    img_url.value = await getBase64(file)
    console.log(img_url.value);
    const errCpImage = validCpImageEdit(image.value)
    if (errCpImage) {
        pathName.value = 'image'
        invalidMessage.value = errCpImage
        image.value = null
        return
    } else {
        pathName.value = ''
        invalidMessage.value = ''
    }

}
const editCampaign = async () => {
    const errDesc = validDescription(desc.value)
    const errCpImage = validCpImageEdit(image.value)

  
    if (errCpImage) {
        pathName.value = 'image'
        invalidMessage.value = errCpImage
        return;
    }
    if (errDesc) {
        pathName.value = 'desc'
        invalidMessage.value = errDesc
        return;
    }
    else {
        pathName.value = ''
        invalidMessage.value = ''
    }
    const formData = new FormData();

    formData.set("title", title.value);
    formData.set("desc", desc.value);
    if (image.value) {
        formData.append("image", image.value);
    }
    if(start_date.value && end_date.value){
        formData.set("start_date", new Date(start_date.value).toISOString());
        formData.set("end_date", new Date(end_date.value).toISOString());
    }
    
    
    formData.set("user_game_id", JSON.stringify(user_game_id.value))
    loading.value = true
    const res = await callAPI(`/dashboard/campaign/updateCampaign/${campaignId}`, 'PUT', formData);
    console.log(res);
    
    if (res.status == 200) {
        loading.value = false
        window.location.href = '/campaigns'
    }
}
const minStartDate = computed(() => {
    if (start_date.value) {
        const startDate = new Date(start_date.value);
        return startDate.toISOString().split("T")[0];
    }
});
onMounted(async () => {
    await getCampaignById()
    await getAllUserGame()
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