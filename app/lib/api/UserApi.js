import Api from "./Api";

class UserApi extends Api {
    static loginRequest = async (email, password) => {
        return this.post(`/login`, {
                email,
                password
            },
            false
        );
    };

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

export default UserApi;