<template>
    <section :class="$style.classroom">
        <div :class="$style.card">
            Our mission is to make education affordable for every person on this planet
        </div>
        <span :class="$style.imageNotice"><a
            href="https://www.freepik.com/free-photo/empty-classroom-due-coronavirus-pandemic_26606670.htm#query=empty%20classroom&position=0&from_view=search&track=sph"
        >Image by Drazen Zigic</a> on Freepik</span>
    </section>
    <section :class="$style.featureWrapper">
        <h2>
            Why you should try Dewey
        </h2>
    </section>

    <section :class="$style.featureWrapper">
        <div :class="$style.featureCard">
            <h3 :class="$style.featureHeading">
                Free to use
            </h3>
            <p>
                Course creation and learning are totally free. Everything you need is to register.
            </p>
        </div>
        <div :class="$style.featureCard">
            <h3 :class="$style.featureHeading">
                Driven by the people to the people
            </h3>
            <p>
                Everyone can create their own courses and teach students with them. Only one restriction:
                the course should not violate local law and platform policies
            </p>
        </div>
    </section>
    <section :class="$style.featureWrapper">
        <p :class="$style.start">
            Let's look what we have
            <br>
            <router-link :to="{name: 'viewer-home'}">
                Created courses
            </router-link> or
            <router-link :to="{name: 'editor-home'}">
                Create your own
            </router-link>
        </p>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HomeView'
})
</script>
<style module>
.classroom {
    background: url('@/assets/empty-classroom.jpg') no-repeat center center;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.imageNotice {
    position: absolute;
    bottom: 0;
    right: 0;
    background: rgba(255,255,255,0.8);
    padding-left: 10px;
    padding-right: 10px;

}
.card {
    background: rgba(255,255,255, 0.8);
    display: inline-block;
    padding: 20px;
    font-size: var(--el-font-size-extra-large)
}
.featureWrapper {
    padding: 20px;
    display: flex;
    justify-content: center;
}
.featureCard {
    width: 450px;
    height: 300px;
    padding: 40px;
    border: var(--el-border);
    font-size: var(--el-font-size-large);
    margin-left: 20px;
    margin-right: 20px
}
.featureHeading {
    font-size: var(--el-font-size-extra-large);
    padding-bottom: 20px;
}
.start {
    text-align:center;
}
</style>
