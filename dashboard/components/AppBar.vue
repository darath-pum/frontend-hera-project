<template>
    <div class="app-bar flex flex-row">
        <div class="side-bar-left">
            <div class="das-header flex flex-col items-center gap-2">
                <div class=" flex flex-row justify-center items-center gap-2">
                    <span class="material-symbols-outlined">
                        dashboard
                    </span>
                    <h1>DASHBOARD</h1>
                </div>
                <p>darathpum@gmail.com</p>
            </div>
            <div class="tool-list flex flex-col">
                <h1>Tools</h1>
                <NuxtLink to="/">
                    <span class="material-symbols-outlined">
                        home
                    </span>
                    <span>Home</span>
                </NuxtLink>
                <NuxtLink to="/games">
                    <span class="material-symbols-outlined">
                        sports_esports
                    </span>
                    <span>Games</span>
                </NuxtLink>
                <NuxtLink to="/users">
                    <span class="material-symbols-outlined">
                        person
                    </span>
                    <span>Users</span>
                </NuxtLink>
                <div class="lucky-draw ">
                    <div class="main-tool">
                        <span class="material-symbols-outlined">
                            draw
                        </span>
                        <span>Lucky draw</span>
                    </div>
                    <NuxtLink to="/campaigns"
                        :class="$route.path == '/campaigns/edit' || $route.path == '/campaigns/new' ? 'router-link-active' : ''">
                        <span class="material-symbols-outlined">
                            campaign
                        </span>
                        <span>Campaign</span>
                    </NuxtLink>
                    <NuxtLink to="/prizes">
                        <span class="material-symbols-outlined">
                            rewarded_ads
                        </span>
                        <span>Prizes</span>
                    </NuxtLink>
                    <!-- <NuxtLink to="/prizes-pool">
                        <span class="material-symbols-outlined">
                            rewarded_ads
                        </span>
                        <span>Prizes pool</span>
                    </NuxtLink> -->
                </div>
                <NuxtLink to="/analytics">
                    <span class="material-symbols-outlined">
                        trending_up
                    </span>
                    <span>Analytics</span>
                </NuxtLink>
            </div>

            <!-- <div class="flex flex-row items-center pl-12 mt-60 gap-2 cursor-pointer">
                <span class="material-symbols-outlined">
                    logout
                </span>
                <span>Logout</span>
            </div> -->
        </div>
        <div class="side-bar-right bg-blue">
            <div class="nav-bar flex flex-row justify-between items-center text-black">
                <div class="nav-left">
                    <h1>Welcome Hera system management</h1>
                </div>
                <div class="nav-right flex flex-row justify-center items-center gap-10">
                    <span class="material-symbols-outlined">
                        sms
                    </span>
                    <span class="material-symbols-outlined">
                        notifications
                    </span>
                    <Profile></Profile>
                    <!-- <div class="flex flex-row items-center gap-5">
                            <span>Darath</span>
                            <div>
                                <img id="profile-image" src="/profile.png" alt="">
                            </div>
                            <span class="material-symbols-outlined">
                                arrow_drop_down
                            </span>
                        </div> -->

                </div>
            </div>
            <div class="main">

                <NuxtPage></NuxtPage>


            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Profile from "~/components/dialogs/Profile.vue"
</script>

<style scoped>
.app-bar {
    width: 100%;
    background: #000;
    margin: 1rem;
}

.side-bar-left {
    position: fixed;
    width: 18rem;
    height: 96.7%;
    background: var(--primary-color);
    color: #FFFFFF;
    border-radius: 10px;
}

.nav-bar {
    /* margin: 1rem; */
    border-radius: 10px;
    z-index: 1;
    position: fixed;
    left: 20rem;
    width: calc(100% - 21.5rem);
    background: var(--primary-color);
    height: 4rem;
    padding: 0rem 3rem;
    color: #FFFFFF !important;
}

.nav-left h1 {
    font-size: 24px;
    font-weight: 600;
}

#profile-image {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    background: #838181;
    object-fit: cover;
}

.main {
    position: absolute;
    left: 20rem;
    width: calc(100% - 21.5rem);
    top: 4rem;
    /* background: #F2F6F6; */
    height: 100%;
    padding: 3rem 1rem;
}


/* ================= */
.das-header {
    padding: 1rem;
    border-bottom: #FFFFFF solid 0.1rem;
}

.das-header span:nth-child(1) {
    font-size: 1.5rem;
}

.das-header h1 {
    font-size: 1.5rem;
}

.das-header p {
    font-size: 1.2rem;
    color: #8f8b8b;
}

/* ====================== */
.tool-list {
    /* gap: 2rem; */
}

.tool-list .material-symbols-outlined {
    font-weight: 600;
}

.lucky-draw {
    display: flex;
    flex-direction: column;
}

.lucky-draw a {
    margin-left: 3rem !important;
}

.tool-list h1 {
    font-size: 1.5rem;
    color: #8f8b8b;
    font-weight: 600;
    padding: 3rem;
    margin-bottom: -2rem;
}

.tool-list a,
.tool-list .main-tool {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    margin: 0rem 1rem 0rem 1rem;
}

.tool-list a span:nth-child(1),
.main-tool span:nth-child(1) {
    font-size: 1.5rem;
}

.tool-list a span:nth-child(2),
.main-tool span:nth-child(2) {
    font-size: 1.2rem;

}

@media (max-width: 67.5rem) {
    .side-bar-left {
        width: 10rem;

    }

    .das-header h1 {
        font-size: 1rem;
    }

    .das-header p {
        font-size: 0.8rem;
    }

    .tool-list h1 {
        font-size: 1rem;
        color: #8f8b8b;
        font-weight: 600;
        padding: 1rem 1.5rem 2.5rem 1.5rem;
        margin-bottom: -2rem;
    }

    .nav-left h1 {
        font-size: 14px;
        font-weight: 600;
    }

    a span:nth-child(2),
    .main-tool span:nth-child(2) {
        font-size: 0.8rem !important;
    }

    a span:nth-child(1),
    .lucky-draw a span:nth-child(1),
    .main-tool span:nth-child(1),
    .nav-right span {
        font-size: 1rem !important;
    }

    .nav-bar {
        left: 11rem;
        width: calc(100% - 13rem);
        height: 3rem;
        padding: 1rem 1rem;
    }

    .main {
        left: 12rem;
        width: calc(100% - 13rem);
        height: 100%;
        padding: 2rem 0rem !important;
    }

    .tool-list a,
    .tool-list .main-tool {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1rem;
        margin: 0rem 0.5rem 0rem 0.5rem !important;
    }

    .lucky-draw a {
        margin-left: 1.5rem !important;
    }
}
</style>