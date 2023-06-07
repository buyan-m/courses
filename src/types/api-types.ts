/* AUTOGENERATED TYPES */

export enum EditorBlockType {
    'paragraph' = 'paragraph',
    'heading' = 'heading',
    'audio' = 'audio',
    'video' = 'video',
    'image' = 'image',
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
    type: EditorBlockType.radio;
    data: {
        options: Option[];
    };
}
export type TEditorBlockCheckbox = TAbstractBlock & {
    type: EditorBlockType.checkbox;
    data: {
        options: Option[];
    };
}
export type TEditorBlockInput = TAbstractBlock & {
    type: EditorBlockType.input;
    data: {
        text: string;
    };
}
export type TEditorBlockUnknown = TAbstractBlock & {
    type: EditorBlockType;
    data: Record<string, unknown>;
}
export type TEditorBlock = TEditorBlockParagraph | TEditorBlockHeading | TEditorBlockImage | TEditorBlockAudio | TEditorBlockVideo | TEditorBlockRadio | TEditorBlockCheckbox | TEditorBlockInput | TEditorBlockUnknown

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
    version: string

    blocks: EditorPageBlock[]
}
export class PageCreateDTO {
    name: string

    lessonId: TLessonId

    structure: EditorPageStructure
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
    lessons: ViewerLessonResponse[]
}
export class CourseResponse extends CourseDTO {
    _id: TCourseId

    lessons: LessonResponse[]
}
export class CourseUpdateDTO extends CourseDTO {
    _id: TCourseId
}
export class EditorBlock {
    type: string

    data: unknown
}
class PageStructure {
    version: string

    time: number

    blocks: TEditorBlock[]
}
export class Page {
    structure: PageStructure

    name: string

    isAnswersVisible: boolean

    lessonId: TLessonId

    position: number
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

    validTill: Date
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
    studentId: TUserId

    pageId: TPageId
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

export class CourseAndStudentDTO {
    userId: string

    courseId: string
}
export type TAnswerFeedback = {
    correctness: AnswerCorrectness;
    feedback?: string;
}
export type TUpdateFeedbackDTO = {
    teacherId: any;
    studentId: any;
    pageId: any;
    feedback: Record<string, TAnswerFeedback>;
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
