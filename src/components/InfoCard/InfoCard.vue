<template>
    <q-btn dense style="" class="info-card">
        <div style="display: flex; flex-direction: column;">
            <slot></slot>
        </div>
    </q-btn>
</template>

<style lang="scss" scoped>
.info-card {
    padding: 10px 10px 0px 10px;
    background-color: rgb(37, 37, 37);
    margin-right: 5px;

    @media only screen and (max-device-width: 480px) {
        padding: 5px 5px 0px 5px;
    }
}
</style>