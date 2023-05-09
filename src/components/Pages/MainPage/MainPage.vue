<template>
    <div>
        <header>
            <Header @click="sidebarStatus = false"></Header>
        </header>
        <main>
            <Section1 />
        </main>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import Section1 from "./components/Section1.vue";

export default {
    components: {
        Header,
        Section1,
    },

    mounted() {
        window.scrollTo(0, 0);
    },
};
</script>

<style></style>
