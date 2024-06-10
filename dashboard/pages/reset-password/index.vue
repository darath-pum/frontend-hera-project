<template>
    <div class="flex justify-center items-center w-screen h-screen">
        <form action="" class=" w-[30rem]">
            <div class="mb-20">
                <h1 class="text-3xl text-center font-bold">Reset Password</h1>
                <p class="text-center text-lg">Enter new password to reset password.</p>
            </div>
                <div>
                    <div class="flex justify-between m-2">
                        <h1 class="text-[20px] font-bold mb-3">New Password</h1>
                        <span class="material-symbols-outlined">visibility</span>
                    </div>
                    <input type="password" placeholder="Enter new password" class="w-[31rem] p-[16px] rounded-[10px]  border border-slate-300">
                </div>
                <div class="mt-12">
                    <div class="flex justify-between m-2">
                        <h1 class="text-[20px] font-bold mb-3">Comfirm Password</h1>
                        <span class="material-symbols-outlined">visibility</span>
                    </div>
                    <input type="password"  placeholder="Enter comfirm password" class="w-[31rem] p-[16px] rounded-[10px] border border-slate-300">
                </div>
                <div class="mt-12">
                    <button class="w-[31rem] p-[16px] rounded-[10px] bg-[#292929] text-[20px] text-white">Reset Password</button>
                </div>
        </form>
    </div>
</template>