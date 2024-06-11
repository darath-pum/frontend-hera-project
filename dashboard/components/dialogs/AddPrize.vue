<template>
    <div class="add-prize">
        <button class="primary-btn" @click="isShow = true">Add prize</button>
        <div v-if="isShow" class="prize-dialog" @click="isShow = false">
            <form action="" @click.stop class="flex flex-col gap-5" @submit.prevent="addPrize">
                <div class="form-header flex flex-row justify-between ">
                    <span></span>
                    <h1>Add prize</h1>
                    <span class="material-symbols-outlined cursor-pointer" @click="isShow = false">
                        cancel
                    </span>
                </div>
                <div class="n-kh">
                    <label for="">Name(Khmer): <span v-if="pathName == 'name_kh'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="text" v-model="name_kh">
                </div>
                <div class="n-eg">
                    <label for="">Name(English): <span v-if="pathName == 'name_en'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="text" v-model="name_en">

                </div>
                <div class="image">
                    <label for="">Image: <span v-if="pathName == 'image'" class="text-red">{{ invalidMessage
                            }}</span></label>
                    <input type="file" @change="handleImage">
                    <div class="select-image flex flex-row justify-center items-center">
                        <img :src="image_url" alt="" v-if="image_url">
                        <img src="/image-icon.png" alt="" v-else>
                        <span class="close bg-black rounded-full material-symbols-outlined" v-if="image_url"
                            @click="closeImage">
                            close
                        </span>
                        <span class="material-symbols-outlined" v-else>
                            add_circle
                        </span>
                    </div>
                </div>
                <div class="btn-save">
                    <button class="primary-btn" @click="addPrize">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const isShow = ref(false)
const pathName = ref('')
const invalidMessage = ref('')
const editPrize = ref()
const props = defineProps(["editPrize", "getAllPrizes"])
const name_en = ref('');
const name_kh = ref('');
const image = ref<File>();
const image_url = ref('');

const resetInput = ()=>{
    name_en.value = ''
    name_kh.value = ''
    image_url.value = ''
}
async function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
const handleImage = async (e: any) => {
    const file = e.target.files[0]
    image.value = file
    image_url.value = await getBase64(file)
    const errImage = validPrizeImage(image.value);
    if (errImage) {
        pathName.value="image"
        invalidMessage.value = errImage
        return;
    }
}

const closeImage = () => {
    image_url.value = ''
}

let isAddPrizeCalled = false;

const addPrize = async () => {

    const errKhName = validPrizeKhN(name_kh.value);
    const errEnName = validPrizeEnN(name_en.value);
    if (errKhName) {
        console.log('fdsafdsad');

        pathName.value = "name_kh"
        invalidMessage.value = errKhName
        return;
    }
    if (errEnName) {
        pathName.value = "name_en"
        invalidMessage.value = errEnName
        return;
    }

    if (isAddPrizeCalled) {
        return; // Exit the function if it has already been called
    }

    isAddPrizeCalled = true;
    const formData = new FormData();
    formData.set('name_en', name_en.value);
    formData.set('name_kh', name_kh.value);
    formData.append('image', image.value);
    const res = await callAPI('/dashboard/prize/createPrize', 'POST', formData);
    console.log(res);
    await props.getAllPrizes()
    isShow.value = false
    resetInput()
    isAddPrizeCalled = false;

}
</script>

<style scoped>
.prize-dialog {
    position: fixed;
    background: #0000005e;
    width: 100%;
    height: 100%;
    z-index: 10 !important;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

form {
    width: 30rem;
    height: 34rem;
    background: #D9D9D9;
    padding: 2rem 2rem;
    border-radius: 10px;
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
    font-weight: 600;
    color: #666464;
    padding-bottom: 0.2rem;
}

.close {
    z-index: 100;
    cursor: pointer;
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
</style>