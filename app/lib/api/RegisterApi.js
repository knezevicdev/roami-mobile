import Api from "./Api";

class RegisterApi extends Api {
    static registerRequest = async (first_name, last_name, email, password) => {
        return this.post(`/register`, {
                first_name,
                last_name,
                email,
                password
            },
            false
        );
    };
}

export default RegisterApi;