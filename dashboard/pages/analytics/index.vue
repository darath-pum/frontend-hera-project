<template>
    <div>
        <label for="pet-select" class="text-black">Choose a game:</label><br>
        <select name="pets" id="pet-select">
            <option value="">--Please choose an game--</option>
            <option value="dog">Portal Outbreak</option>
            <option value="cat">Racing Car</option>
            <option value="hamster">Oxygen War</option>
            <option value="hamster">Heart</option>
            <option value="hamster">Fish</option>
        </select>
    </div>
    <div class="charts flex flex-row justify-between ">
        <CustomerDAP />
        <CustomerMAP />
    </div>
    <div class="charts flex flex-row justify-between ">
        <SessionDAP />
        <SessionMAP />
    </div>
    <!-- <div>
        <div class="charts flex flex-row justify-between">
            <AdminDAC />
            <AdminMAC />
        </div>
    </div> -->

</template>

<script setup lang="ts">
    import CustomerDAP from '~/components/charts/CustomerDAP.vue';
    import CustomerMAP from '~/components/charts/CustomerMAP.vue';
    import SessionDAP from '~/components/charts/SessionDAP.vue';
    import SessionMAP from '~/components/charts/SessionMAP.vue';
    import AdminDAC from '~/components/charts/AdminDAC.vue';
    import AdminMAC from '~/components/charts/AdminMAC.vue';
</script>

<style scoped>
    .charts{
        margin-top: 2.4rem;
        /* gap: 3rem; */
    }
    label {
        font-family: sans-serif;
        font-size: 1.5rem;
        padding-right: 16px;
}

    select {
        font-size: 1rem;
        padding: 8px;
        color:black;
        width:16rem;
        display:flex;
        background: #ffffff;
        border-radius: var(--radius);
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}
</style>
