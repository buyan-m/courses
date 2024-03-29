/* AUTOGENERATED TYPES */

export enum EditorBlockType {
    'paragraph' = 'paragraph',
    'heading' = 'heading',
    'audio' = 'audio',
    'video' = 'video',
    'image' = 'image'
}
export enum EditorBlockExerciseType {
    'radio' = 'radio',
    'checkbox' = 'checkbox',
    'input' = 'input'
}
export class Option {
    value: string

    isCorrect: boolean
}
    type TAbstractBlock = {
        id: string;
    }
export type TEditorBlockParagraph = TAbstractBlock & {
    type: EditorBlockType.paragraph;
    data: {
        text: string;
    };
}
export type TEditorBlockHeading = TAbstractBlock & {
    type: EditorBlockType.heading;
    data: {
        text: string;
    };
}
export type TEditorBlockImage = TAbstractBlock & {
    type: EditorBlockType.image;
    data: {
        url: string;
    };
}
export type TEditorBlockAudio = TAbstractBlock & {
    type: EditorBlockType.audio;
    data: {
        url: string;
    };
}
export type TEditorBlockVideo = TAbstractBlock & {
    type: EditorBlockType.video;
    data: {
        videoId: string;
    };
}
export type TEditorBlockRadio = TAbstractBlock & {
    type: EditorBlockExerciseType.radio;
    data: {
        options: Option[];
    };
}
export type TEditorBlockCheckbox = TAbstractBlock & {
    type: EditorBlockExerciseType.checkbox;
    data: {
        options: Option[];
    };
}
export type TEditorBlockInput = TAbstractBlock & {
    type: EditorBlockExerciseType.input;
    data: {
        answers: string[];
    };
}
export type TEditorBlock = TEditorBlockParagraph | TEditorBlockHeading | TEditorBlockImage | TEditorBlockAudio | TEditorBlockVideo | TEditorBlockRadio | TEditorBlockCheckbox | TEditorBlockInput

export enum Roles {
    'guest' = 'guest',
    'user' = 'user',
    'admin' = 'admin',
    'moderator' = 'moderator'
}

export enum StudentTypes {
    active = 'active',
    archive = 'archive'
}

export class CourseDTO {
    name: string

    description: string
}
export class EditorPageBlock {
    id: string

    type: EditorBlockType

    data: TEditorBlock['data']
}
class EditorPageStructure {
    time: number

    version: string

    blocks: EditorPageBlock[]
}
export class PageCreateDTO {
    name: string

    lessonId: TLessonId

    structure: EditorPageStructure

    isAnswersVisible: boolean
}
export class PageUpdateDTO extends PageCreateDTO {
    position: number
}

export enum TeacherTypes {
    active = 'active',
    archive = 'archive'
}

export enum CourseRoles {
    teacher = 'teacher',
    student = 'student',
    visitor = 'visitor',
    owner = 'owner'
}
export type TCourseStudentsResponse = TCourseStudentsResponseItem[]
export type TCourseStudentsResponseItem = {
    name: string;
    userId: TUserId;
    courseId: TCourseId;
    courseTitle: string;
}
export class CourseAndStudentDTO {
    userId: string

    courseId: string
}
export class CourseAndShareCodeDTO {
    shareCode: string

    courseId: string
}
export type TAnswerFeedback = {
    correctness: AnswerCorrectness;
    feedback?: string;
}
export type TUpdateFeedbackDTO = {
    teacherId: string;
    studentId: string;
    pageId: string;
    feedback: Record<string, TAnswerFeedback>;
}
export class LearningPageDTO {
    teacherId: string

    studentId: string

    pageId: string
}
export class LearningCourseDTO {
    teacherId: string

    studentId: string

    courseId: string
}
export type TGetTeacherStudentsInput = {
    teacherId: TUserId;
    courseId?: string;
}
export type TGetStudentDetailsInput = {
    teacherId: TUserId;
    courseId: string;
    studentId: string;
    onlyUnchecked?: boolean;
}
export class DetailedStudentCourseInfo {
    answerPages: Pick<PageAnswers, '_id' | 'checked'>[]

    student: User

    progress: {
        lessons: {
            _id: TLessonId;
            pages: {
                _id: TPageId;
                name: string;
            }[];
            name: string;
        }[];
        progress: Progress[];
    }
}

export type TCourseId = string
export type TLessonId = string
export type TPageId = string
export type TUserId = string
export enum GrantObjectType {
    'course' = 'course',
    'lesson' = 'lesson',
    'page' = 'page'
}
export class Grant {
    userId: TUserId

    objectId: TCourseId | TLessonId | TPageId

    objectType: GrantObjectType
}
export class User {
    _id: TUserId

    name: string
}
class OmittedPage {
    name: string

    lessonId: TLessonId

    position: number
}
export class Lesson {
    name: string

    courseId: TCourseId
}
export class LessonUpdateDTO extends Lesson {
    _id: TLessonId
}
export class LessonResponse extends LessonUpdateDTO {
    pages: OmittedPage[]
}
export class ViewerLessonResponse extends LessonResponse {
    completed: boolean
}
export class ViewerCourseResponse extends CourseDTO {
    _id: TCourseId

    lessons: ViewerLessonResponse[]

    role: CourseRoles
}
export class EditorCourseResponse extends CourseDTO {
    _id: TCourseId

    lessons: LessonResponse[]
}
export class CourseUpdateDTO extends CourseDTO {
    _id: TCourseId
}
export class EditorBlock {
    id: string

    type: string

    data: unknown
}
export class PageStructure {
    version: string

    time: number

    blocks: TEditorBlock[]
}
export class Page {
    _id: TPageId

    structure: PageStructure

    name: string

    isAnswersVisible: boolean

    lessonId: TLessonId

    position: number

    requireManualChecking: boolean
}
export class PageViewerDTO extends Page {
    nextPageAvailable: boolean

    progress: {
        checked: boolean;
    }
}
export class NextPage {
    pageId: TPageId
}
export class Auth {
    userId: TUserId

    email: string

    password: string
}
export class Token {
    token: string

    userId: TUserId

    validTill: string
}
export class Progress {
    userId: TUserId

    objectId: TCourseId | TLessonId | TPageId

    objectType: GrantObjectType

    checked: boolean
}
export class Role {
    userId: TUserId

    role: Roles
}
export class Teacher {
    userId: TUserId

    courseId: TCourseId

    type: TeacherTypes
}
export class Student {
    userId: TUserId

    teacherId: TUserId

    courseId: TCourseId

    type: StudentTypes
}
export enum AnswerTypes {
    radio = 'radio',
    checkbox = 'checkbox',
    input = 'input'
}
export enum AnswerCorrectness {
    'correct' = 'correct',
    'incorrect' = 'incorrect',
    'not-verified' = 'not-verified'
}
export class AnswerFeedback {
    correctness: AnswerCorrectness

    feedback: string | undefined
}
abstract class AbstractAnswerWithFeedback extends AnswerFeedback {
    type: string

    value: unknown
}
export class RadioAnswer extends AnswerFeedback implements AbstractAnswerWithFeedback {
    type: AnswerTypes.radio

    value: string
}
export class CheckAnswer extends AnswerFeedback implements AbstractAnswerWithFeedback {
    type: AnswerTypes.checkbox

    value: string[]
}
export class TextAnswer extends AnswerFeedback implements AbstractAnswerWithFeedback {
    type: AnswerTypes.input

    value: string
}
export type TAnswer = RadioAnswer | CheckAnswer | TextAnswer
export class AnswerWithId {
    id: string

    answer: TAnswer
}
export class AnswersDTO {
    answers: AnswerWithId[]
}
export class PageAnswers extends AnswersDTO {
    _id: string

    studentId: string

    pageId: string

    checked: boolean
}
export class PaginationInfo {
    totalCount: number
}
export class EmailConfirmation {
    email: string

    code: string

    validTill: string
}
export type TPaginated<T> = {
    items: T[];
    count: number;
}

            type TSimplifiedCourse = Pick<ViewerCourseResponse, 'name' | '_id'>
export enum NotificationStates {
    new = 'new',
    viewed = 'viewed'
}
export enum NotificationTypes {
    courseInvitation = 'courseInvitation',
    pagePass = 'pagePass',
    feedbackReceived = 'feedbackReceived'
}
export type TNotificationId = string
export class AbstractProductNotification {
    _id: TNotificationId

    status: NotificationStates

    user: User

    cdate: string
}
export class CourseInvitationNotification extends AbstractProductNotification {
    type: NotificationTypes.courseInvitation

    details: {
        course: TSimplifiedCourse;
        inviter: User;
    }
}
export class PagePassNotification extends AbstractProductNotification {
    type: NotificationTypes.pagePass

    details: {
        course: TSimplifiedCourse;
        lesson: LessonUpdateDTO;
        student: User;
        page: Pick<Page, 'name' | '_id'>;
    }
}
export class FeedbackReceivedNotification extends AbstractProductNotification {
    type: NotificationTypes.feedbackReceived

    details: {
        course: TSimplifiedCourse;
        lesson: LessonUpdateDTO;
        teacher: User;
        page: Pick<Page, 'name' | '_id'>;
    }
}
export type TGetNotificationsFilter = {
    userId: TUserId;
    offset: number;
}
class AbstractCreateNotificationDTO {
    userId: string
}
export class CourseInvitationNotificationCreateDTO extends AbstractCreateNotificationDTO {
    type: NotificationTypes

    details: {
        courseId: string;
        inviterId: string;
    }
}
export class PagePassNotificationCreateDTO extends AbstractCreateNotificationDTO {
    type: NotificationTypes

    details: {
        courseId: string;
        lessonId: string;
        studentId: string;
        pageId: string;
    }
}
export class FeedbackReceivedNotificationCreateDTO extends AbstractCreateNotificationDTO {
    type: NotificationTypes

    details: {
        courseId: string;
        lessonId: string;
        teacherId: string;
        pageId: string;
    }
}
export type TCreateNotificationDTO = CourseInvitationNotificationCreateDTO | PagePassNotificationCreateDTO | FeedbackReceivedNotificationCreateDTO
export type TNotification = CourseInvitationNotification | PagePassNotification | FeedbackReceivedNotification
export class NotificationsResponse {
    notifications: TNotification[]

    pageInfo: PaginationInfo & {
        unreadCount: number;
    }
}

export class AuthDto {
    email: string

    password: string
}
export class RegisterDto {
    email: string

    password: string

    name: string
}
export class AuthCheckResponse {
    userId: TUserId

    roles: Roles[]
}
export class ConfirmEmailDTO {
    email: string

    code: string
}
export class RequestConfirmEmailDTO {
    email: string
}
export class UserInfo {
    email: string

    name: string

    roles: Roles[]
}

export class IssueModelClass {
    _id: string

    user: TUserId

    writtenEmail: string

    gotEmail: string

    issueText: string

    url: string

    cdate: string

    checked: boolean

    emailIsCorrect: boolean
}
export class IssueReport {
    email: string

    actualEmail: string

    report: string

    url: string
}
export class IssueReportDTO extends IssueReport {
    userId: string
}

export type TGetIssuesParams = {
    offset?: number;
}
export type AdminIssuesResponse = TPaginated<IssueModelClass & {
    user: {
        name: string;
        _id: string;
    };
}>

export class ShareCodeDTO {
    userId: TUserId

    _id: string
}
export class ShareCode extends ShareCodeDTO {
    validTill: number

    status: ShareCodeStatus
}
export enum ShareCodeStatus {
    'actual' = 'actual',
    'outdated' = 'outdated'
}

export class CourseCreateResponse {
    courseId: TCourseId
}
export class EditorLessonCreateResponse {
    lessonId: TLessonId
}
export class EditorPageCreateResponse {
    pageId: TPageId
}

export class EmailApproveDto {
    email: string
}
