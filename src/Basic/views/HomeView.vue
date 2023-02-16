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
                <div :class="$style.card">
                    {{ $t('mission') }}
                </div>
                <router-link :to="{name: 'viewer-home'}">
                    <button
                        :class="$style.actionButton"
                    >
                        {{ $t('start') }}
                    </button>
                </router-link>
            </div>
        </div>
        <span :class="$style.imageNotice"><a
            href="https://www.freepik.com/free-photo/empty-classroom-due-coronavirus-pandemic_26606670.htm#query=empty%20classroom&position=0&from_view=search&track=sph"
        >Image by Drazen Zigic</a> on Freepik</span>
    </section>
    <section :class="$style.teachersroom">
        <div :class="$style.lead">
            <div :class="$style.wrapper">
                <div :class="`${$style.card} ${$style.cardReverse}`">
                    {{ $t('to-teachers') }}
                </div>
                <router-link :to="{name: 'editor-home'}">
                    <button
                        :class="`${$style.actionButton} ${$style.buttonReverse}`"
                    >
                        {{ $t('create') }}
                    </button>
                </router-link>
            </div>
        </div>
        <span :class="$style.imageNotice">
            <a href="https://www.freepik.com/free-photo/pan-shot-empty-office-with-projector-middle-conference-desk_5766977.htm#query=empty%20classsroom&position=30&from_view=search&track=ais">Image by pressfoto</a>
            on Freepik</span>
    </section>
    <section :class="$style.featureWrapper">
        <h2 :class="$style.heading">
            {{ $t('try') }}<OkulLogo :class="$style.smallLogo" />
        </h2>
    </section>

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
.teachersroom {
    background: url('@/assets/room.jpg') no-repeat center center;
    height: 420px;
    position: relative;
}

.mainLogo {
    width: 240px;
    height: auto;
    fill: #ffffff;
    vertical-align: middle;
}
.smallLogo {
    width: 100px;
    height: 43px;
    fill: var(--el-text-color-regular);
    vertical-align: text-top;
}
.lead {
    background-color: rgba(0,0,0,0.4);
    height: 420px;
    padding-top: 100px;

}

.wrapper {
    width: 1000px;
    min-height: 230px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
}

.slogan {
    display: inline-block;
    color: #ffffff;
    font-size: 56px;
    line-height: 85px;
    padding-left: 22px;
    vertical-align: bottom;
}

.opening {
    line-height: 100px;
}

.imageNotice {
    position: absolute;
    bottom: 0;
    right: 0;
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;

}
.card {
    display: inline-block;
    font-size: 32px;
    margin-top: 30px;
    color: #ffffff;
    white-space: pre-line;
    width: 780px;
}

.cardReverse {
    text-align: right;
    align-self: end;
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
    border-radius: 5px;
    font-size: 30px;
    background: var(--el-color-primary);
    color: #ffffff;
    padding: 10px 40px;
    text-transform: uppercase;
    position: absolute;
    right: 0;
    bottom: 0;
}
.actionButton:hover {
    background: var(--el-color-primary-light-3);
}
.actionButton:active {
    background: var(--el-color-primary-dark-2);
}
.buttonReverse {
    right: auto;
    left: 0;
}

</style>
<i18n>
{
    "ru": {
        "slogan": "– узнай всё!",
        "mission": "Наша миссия – сделать образование доступным для каждого",
        "to-teachers": "Для учителей и методистов есть возможность создавать уникальные, востребованные курсы, проверять гипотезы в образовании не дожидаясь печати новых учебников.",
        "try": "Почему стоит попробовать ",
        "free": "Бесплатно ",
        "free-descr": "Создание и прохождение курсов полностью бесплатные. Нужно лишь зарегистрироваться",
        "community":  "Сообщество",
        "community-descr": "Каждый может создать свой курс и вести по нему учеников. Единственное ограничение - курс не должен нарушать местное законодательство и политики платформы",
        "a11y":  "Доступность",
        "a11y-descr": "Для работы на платформе потребуется лишь доступ в интернет и устройство с относительно современным браузером."
    },
    "en": {
        "slogan": "– learn everything!",
        "mission": "Our mission is to make education affordable\nfor every person",
        "to-teachers": "We offer an opportunity to create unique, relevant courses, test educational hypotheses without waiting for new schoolbooks to get printed",
        "try": "Why you should try ",
        "free":  "Free to use",
        "free-descr": "Course creation and learning are totally free. Everything you need is to register.",
        "community":  "Driven by the people to the people",
        "community-descr": "Everyone can create their own courses and teach students with them. Only one restriction: the course should not violate local law and platform policies.",
        "a11y":  "Accessibility",
        "a11y-descr": "Everything you need  - access to the internet and device with a modern enough browser."
    }
}
</i18n>
