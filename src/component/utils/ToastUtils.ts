import {toast} from "react-toastify";

export class ToastUtils {

    public static displayWarningToast(message: string) {
        return toast.warning(message);
    }

    public static displaySuccessToast(message: string) {
        return toast.success(message);
    }

    public static displayErrorToast(message: string) {
        return toast.error(message);
    }
}