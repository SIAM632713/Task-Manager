
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /^(?:\+88|0088)?(01)[13456789]{1}(\d){8}$/;

class FormHelper {
    IsEmpty(value) {
        return value.length === 0;
    }

    IsMobile(value) {
        return MobileRegx.test(value);
    }

    IsEmail(value) {
        return EmailRegx.test(value);
    }

}

export const {
    IsEmpty,IsMobile,IsEmail
}=new FormHelper();
