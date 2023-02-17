<template>
    <section :class="$style.classroom">
        <div :class="$style.lead">
            <div :class="$style.wrapper">
                <div :class="$style.opening">
                    <OkulLogo :class="$style.mainLogo" />
                    <div :class="$style.slogan">
                        {{ $t('slogan') }}
                    </div>
                </div>
                <div :class="$style.leadText">
                    {{ $t('mission') }}
                </div>
                <router-link :to="{name: 'viewer-home'}">
                    <button
                        :class="`${$style.actionButton} ${$style.actionButtonFloating}`"
                    >
                        {{ $t('start') }}
                    </button>
                </router-link>
            </div>
        </div>
        <span :class="$style.imageNotice"><a
            target="_blank"
            rel="nofollow"
            href="https://www.freepik.com/free-photo/empty-classroom-due-coronavirus-pandemic_26606670.htm#query=empty%20classroom&position=0&from_view=search&track=sph"
        >Image by Drazen Zigic</a> on Freepik</span>
    </section>
    <section :class="$style.wrapper">
        <div :class="$style.teachersroom">
            <div :class="$style.teachersDescription">
                <p :class="$style.teachersText">
                    {{ $t('to-teachers') }}
                </p>
                <router-link :to="{name: 'editor-home'}">
                    <button :class="$style.actionButton">
                        {{ $t('create') }}
                    </button>
                </router-link>
            </div>

            <div :class="$style.teachersImage">
                <span :class="$style.imageNotice">
                    <a
                        target="_blank"
                        rel="nofollow"
                        href="https://www.freepik.com/free-photo/lateral-foreground-working-desk-with-laptop-cup-coffee-eyeglasses-stationery_6449756.htm#page=5&query=education&position=3&from_view=search&track=sph"
                    >Image by freepic.diller</a> on Freepik</span>
            </div>
        </div>
    </section>
    <section :class="$style.aimsWrapper">
        <div :class="$style.wrapper">
            <h2 :class="$style.heading">
                {{ $t('aims') }}
            </h2>
            <p>{{ $t('what\'s-it') }}</p>
        </div>
    </section>
    <div :class="$style.wrapper">
        <h2 :class="$style.heading">
            {{ $t('try') }}<OkulLogo :class="$style.smallLogo" />
        </h2>
    </div>

    <section :class="$style.featureWrapper">
        <div :class="$style.featureCard">
            <h3 :class="$style.featureHeading">
                {{ $t('free') }}
            </h3>
            <p>
                {{ $t('free-descr') }}
            </p>
        </div>
        <div :class="$style.featureCard">
            <h3 :class="$style.featureHeading">
                {{ $t('community') }}
            </h3>
            <p>
                {{ $t('community-descr') }}
            </p>
        </div>
        <div :class="$style.featureCard">
            <h3 :class="$style.featureHeading">
                {{ $t('a11y') }}
            </h3>
            <p>
                {{ $t('a11y-descr') }}
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
import OkulLogo from '@/components/OkulLogo/OkulLogo.vue'

export default defineComponent({
    name: 'HomeView',
    components: {
        OkulLogo
    }
})
</script>
<style module>
.classroom {
    background: url('@/assets/empty-classroom.jpg') no-repeat center center;
    height: 420px;
    position: relative;
}
.mainLogo {
    width: 170px;
    height: auto;
    fill: #ffffff;
    vertical-align: middle;
}
.smallLogo {
    width: 92px;
    height: 43px;
    fill: var(--el-text-color-regular);
    vertical-align: text-top;
}
.lead {
    background-color: rgba(0,0,0,0.55);
    height: 420px;
    padding-top: 100px;
}

.wrapper {
    width: 1000px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
}

.slogan {
    display: inline-block;
    color: #ffffff;
    font-size: 56px;
    line-height: 70px;
    padding-left: 20px;
    vertical-align: bottom;
}

.opening {
    line-height: 85px;
}

.imageNotice {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #ffffff;
    padding: 8px 16px;
    font-size: 13px;
}
.leadText {
    display: inline-block;
    font-size: 32px;
    margin-top: 30px;
    color: #ffffff;
    white-space: pre-line;
    width: 780px;
}
.teachersroom {
    display: flex;
    justify-content: space-between;
    padding: 80px 0 40px;
    gap: 40px;
}
.teachersDescription {
    display: inline-block;
    font-size: 28px;
    color: var(--el-text-color-primary);
    white-space: pre-line;
}

.teachersText {
    line-height: normal;
}
.teachersImage {
    background: url('@/assets/creation.jpg') no-repeat center center / cover;
    position: relative;
    flex: 0 0 400px
}
.aimsWrapper {
    padding: 40px 20px;
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
.heading {
    font-size: 40px
}

.start {
    text-align:center;
}

.actionButton {
    border: 0;
    border-radius: 0;
    font-size: 30px;
    background: #1d76ff;
    color: #ffffff;
    padding: 10px 40px;
    letter-spacing: 0.7px;
}
.actionButtonFloating {
    position: absolute;
    right: 0;
    bottom: 0;
}
.actionButton:hover {
    background: #3a80f3;
}
.actionButton:active {
    background: #185ed2;
}
</style>
<i18n>
{
    "ru": {
        "slogan": "– узнай всё!",
        "mission": "Наша миссия – сделать образование доступным для каждого",
        "start": "Начать",
        "create": "Создать",
        "to-teachers": "Для учителей и методистов есть возможность создавать уникальные, востребованные курсы, проверять гипотезы в образовании не дожидаясь печати новых учебников.",
        "try": "Почему стоит попробовать ",
        "free": "Бесплатно ",
        "free-descr": "Создание и прохождение курсов полностью бесплатные. Нужно лишь зарегистрироваться",
        "community":  "Сообщество",
        "community-descr": "Каждый может создать свой курс и вести по нему учеников. Единственное ограничение - курс не должен нарушать местное законодательство и политики платформы",
        "a11y":  "Доступность",
        "a11y-descr": "Для работы на платформе потребуется лишь доступ в интернет и устройство с относительно современным браузером.",
        "what's-it": "Okul (“школа” на турецком). Проект служит одной цели - сделать образование доступным. Образование открывает двери к реализации любых человеческих фантазий. Жажда к знаниям является одним из важнейших столпов человечества. Мы верим, что через просвещение человечество может победить любые проблемы, поэтому критически важно обеспечить людей качественным образованием. Проект не сможет существовать без энтузиастов, заводящих сюда курсы и рассказывающих о них своим ученикам.",
        "aims": "Наши цели"
    },
    "en": {
        "slogan": "– learn everything!",
        "mission": "Our mission is to make education affordable\nfor every person",
        "start": "Start",
        "create": "Create",
        "to-teachers": "We offer an opportunity to create unique, relevant courses, test educational hypotheses without waiting for new schoolbooks to get printed",
        "try": "Why you should try ",
        "free":  "Free to use",
        "free-descr": "Course creation and learning are totally free. Everything you need is to register.",
        "community":  "Driven by the people to the people",
        "community-descr": "Everyone can create their own courses and teach students with them. Only one restriction: the course should not violate local law and platform policies.",
        "a11y":  "Accessibility",
        "a11y-descr": "Everything you need  - access to the internet and device with a modern enough browser.",
        "what's-it": "Okul (“school” in Turkish). The project’s ultimate goal - make education affordable. Knowledge opens doors to implement any human’s dreams. Thirst for knowledge is one of the most crucial pillars of humanity. We believe that through enlightenment humans can beat any issue, that’s why it is critical to provide people with quality education. The project would not exist without enthusiasts, who create courses here and share them with students.",
        "aims": "Our aims"
    }
}
</i18n>
