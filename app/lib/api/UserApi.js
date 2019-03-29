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

    static resetRequest = async (email) => {
        return this.post('/forgot-password', {
                email
            }, 
            false
        );
    };

    static getUser = async () => {
        return await this.get(`/user`);
    }

    static updateUser = async (first_name, last_name, email, password, newPassword, repeatedNewPassword ) => {
        return this.put(`/user`, {
                first_name,
                last_name,
                email,
                password,
                newPassword,
                repeatedNewPassword
            }
        );
    };
}

export default UserApi;