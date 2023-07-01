<template>
    <div
        :class="$style.container"
        data-test="notificationsBlock"
    >
        <ul :class="$style.list">
            <li
                v-for="notification in notifications"
                :key="notification._id"
                data-test="notification"
                :class="{
                    [$style.newNotification]: notification.status === NotificationStates.new,
                    [$style.notification]: true
                }"
            >
                <router-link
                    :to="prepareLink(notification)"
                    @click="readNotification(notification)"
                >
                    <span
                        :class="$style.text"
                        v-html="prepareDetails(notification)"
                    />
                </router-link>
                <time
                    :class="$style.time"
                    :datetime="notification.cdate"
                >
                    {{ prepareTime(notification.cdate) }}
                </time>
            </li>
        </ul>
        <el-button
            type="primary"
            :class="$style.button"
            @click="readAllNotifications"
        >
            {{ $t('read-all') }}
        </el-button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import {
    NotificationsResponse,
    NotificationStates,
    NotificationTypes,
    TNotification
} from '@/types/api-types'
import request from '@/utils/request'

function prepareTime(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleString()
}

export default defineComponent({
    data() {
        return {
            notifications: [] as TNotification[],
            unreadCount: 0,
            NotificationStates
        }
    },

    mounted() {
        this.getNotifications()
    },

    methods: {
        getNotifications() {
            request<NotificationsResponse>('/api/notifications')
                .then(({ data, errors }) => {
                    if (!errors.length && data?.pageInfo) {
                        this.notifications = data.notifications
                        this.unreadCount = data.pageInfo.unreadCount
                        this.$emit('notification-count-updated', this.unreadCount)
                    }
                })
        },

        prepareDetails(notification: TNotification): string {
            if (notification.type === NotificationTypes.courseInvitation) {
                return this.$t(NotificationTypes.courseInvitation, {
                    username: notification.details.inviter.name,
                    courseTitle: notification.details.course.name
                })
            }
            if (notification.type === NotificationTypes.pagePass) {
                return this.$t(NotificationTypes.pagePass, {
                    username: notification.details.student.name,
                    courseTitle: notification.details.course.name,
                    lesson: notification.details.lesson.name
                })
            }

            if (notification.type === NotificationTypes.feedbackReceived) {
                return this.$t(NotificationTypes.feedbackReceived, {
                    username: notification.details.teacher.name,
                    courseTitle: notification.details.course.name,
                    lesson: notification.details.lesson.name
                })
            }
            return ''
        },

        prepareLink(notification: TNotification) {
            if (notification.type === NotificationTypes.courseInvitation) {
                return {
                    name: 'viewer-course',
                    params: {
                        courseId: notification.details.course._id
                    }
                }
            }

            if (notification.type === NotificationTypes.pagePass) {
                return {
                    name: 'viewer-lesson-teacher-page',
                    params: {
                        courseId: notification.details.course._id,
                        lessonId: notification.details.lesson._id,
                        studentId: notification.details.student._id,
                        pageId: notification.details.page._id
                    }
                }
            }

            if (notification.type === NotificationTypes.feedbackReceived) {
                return {
                    name: 'viewer-lesson-page',
                    params: {
                        courseId: notification.details.course._id,
                        lessonId: notification.details.lesson._id,
                        pageId: notification.details.page._id
                    }
                }
            }

            return {}
        },

        readAllNotifications() {
            request('/api/notifications/read-all', { method: 'put' })
                .then(({ errors }) => {
                    if (!errors.length) {
                        this.notifications.forEach((el) => {
                            // eslint-disable-next-line no-param-reassign
                            el.status = NotificationStates.viewed
                        })
                        this.unreadCount = 0
                        this.$emit('notification-count-updated', 0)
                    }
                })
        },

        readNotification(notification: TNotification) {
            return request(`/api/notifications/read/${notification._id}`, { method: 'put' })
                .then(({ errors }) => {
                    if (!errors.length) {
                        // eslint-disable-next-line no-param-reassign
                        notification.status = NotificationStates.viewed
                        this.unreadCount -= 1
                        this.$emit('notification-count-updated', this.unreadCount)
                    }
                })
        },

        prepareTime
    }
})
</script>
<i18n>
{
    "en": {
        "courseInvitation": "<b>{username}</b> invited you to join the course <b>{courseTitle}</b>",
        "pagePass": "<b>{username}</b> has passed the test in lesson <b>{lesson}</b> from <b>{courseTitle}</b>",
        "feedbackReceived": "<b>{username}</b> has checked your test in lesson <b>{lesson}</b> from <b>{courseTitle}</b>",
        "read-all": "Read all"
    }
}
</i18n>
<style module>
.newNotification {
    background-color: var(--el-fill-color-darker);
}
.list {
    width: 350px;
    list-style: none;
    padding: 0;
}
.notification {
    padding: 10px 20px 20px 20px;
    position: relative;
    border-bottom: var(--el-border);
}
.time {
    font-size: var(--el-font-size-small);
    position: absolute;
    bottom: 5px;
    right: 20px;
}
.text {
    font-size: var(--el-font-size-base);
    white-space: pre-wrap;
}
.button {
    margin: 10px 20px 5px 20px;
    align-self: end;
}
.container {
    display: flex;
    flex-direction: column;
}
</style>
