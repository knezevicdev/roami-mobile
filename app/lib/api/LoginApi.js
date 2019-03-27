import Api from "./Api";

class LoginApi extends Api {
    static loginRequest = async (email, password) => {
        return this.post(`/login`, {
                email,
                password
            },
            false
        );
    };
}

export default LoginApi;