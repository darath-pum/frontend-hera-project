<template>
    <div class="edit-prize">
        <div class="flex flex-row items-center gap-1 cursor-pointer" @click="isShow = true">
            <span class="material-symbols-outlined icon-edit">
                edit
            </span>
            <span>Edit</span>
        </div>
        <div v-if="isShow" class="dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-4" @submit.prevent="editPrize">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Edit prize</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="n-kh">
                    <label for="">Name(Khmer):</label>
                    <input type="text" v-model="name_kh">
                </div>
                <div class="n-eg">
                    <label for="">Name(English):</label>
                    <input type="text" v-model="name_en">

                </div>
                <div class="image">
                    <label for="">Image: <span v-if="pathName == 'image'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="file" @change="handleImage">
                    <div class="select-image flex flex-row justify-center items-center">
                        <img :src="image_url" alt="" v-if="image_url != ''">
                        <img src="/image-icon.png" alt="" v-else>
                        <span class="material-symbols-outlined bg-white rounded-full" v-if="image_url != ''">
                            close
                        </span>
                        <span class="material-symbols-outlined bg-white rounded-full" v-else>
                            add_circle
                        </span>
                    </div>
                </div>
                <div class="btn-save">
                    <button class="primary-btn" @click="getPrizeById">
                        <Loading v-if="loading" class="loader"></Loading>
                        <span v-else>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Loading from "~/components/Loading.vue"

const loading = ref(false)
const isShow = ref(false)
const props = defineProps(["id", "getAllPrizes"])
const prizeId = ref(props.id)

const pathName = ref('')
const invalidMessage = ref('')
const name_en = ref();
const name_kh = ref();
const image = ref();
const image_url = ref();


const handleImage = async (e: any) => {
    const file = e.target.files[0]
    image.value = file
    image_url.value = await getBase64(file)
    const errImage = validPrizeImage(image.value);
    if (errImage) {
        pathName.value = "image"
        invalidMessage.value = errImage
        return;
    }
}


const getPrizeById = async () => {
    const res = await callAPI(`/api/prize/getPrizebyId/${prizeId.value}`)
    name_en.value = res.data.name_en
    name_kh.value = res.data.name_kh
    image_url.value = res.data.image

}

let isEditPrizeCalled = false;

const editPrize = async () => {
    if (isEditPrizeCalled) {
        return; 
    }

    isEditPrizeCalled = true;
    const formData = new FormData();
    formData.set('name_en', name_en.value);
    formData.set('name_kh', name_kh.value);
    formData.append('image', image.value);
    loading.value = true
    const res = await callAPI(`/api/prize/updatePrize/${prizeId.value}`, 'PUT', formData);
    if (res.status == 200) {
        loading.value = false
        isShow.value = false
        await props.getAllPrizes()
        isEditPrizeCalled = false;
    }else{
        loading.value = false

    }


}
onMounted(() => {
    getPrizeById()
})
</script>

<style scoped>
form {
    width: 30rem;
    height: 34rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 5px;
}

form h1 {
    font-size: 30px;
    font-weight: 600;
}

.n-kh,
.n-eg,
.image {
    display: flex;
    flex-direction: column;

}

input,
.select-image {
    border: 1px solid var(--primary-color);
    padding: 0.6rem;
    border-radius: 5px;
    background: #ffffff8a;
    color: #666464;
}


label {
    text-align: start;
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}


.image input {
    height: 5rem;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
}

.select-image {
    height: 5rem;
    margin-top: -5rem;

}

.select-image img {
    width: 4rem;
    height: 4rem;
    position: absolute;
    object-fit: cover;
}

.select-image span {
    color: #c09898;
    position: absolute;
    font-weight: 600;
}

.btn-save {
    width: 100%;
    margin-top: 1rem;
}

.btn-save button {
    width: 100%;
}

@media (max-width: 67.5rem) {


    .icon-edit {
        font-size: 1rem;
    }
}
@media (max-width: 35.5rem) {
    form h1 {
        font-size:1.2rem;
        font-weight: 600;
    }

    form{
        width:100%;
        height: 100vh;
        border-radius: 0;
    }
    input{
        padding: 0.5rem;
        font-size: 0.7rem;
    }
    label{
        font-size: 0.7rem;
    }
}
</style>