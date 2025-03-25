import { questionApi } from "./questionApi";
import { answerApi } from "./answerApi";
import { authApi } from "./authApi";
import { tagApi } from "./tagApi";
import { userApi } from "./userApi";

export default {
    questions: questionApi,
    answers: answerApi,
    auths: authApi,
    tags: tagApi,
    users: userApi
};