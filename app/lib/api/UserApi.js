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
        return await this.post(`user`);
    }

    static updateUser = async (first_name, last_name, newPassword = null, repeatedNewPassword = null, password = null ) => {
        return this.put(`user`, {
                first_name,
                last_name,
                password,
                newPassword,
                repeatedNewPassword
            }
        );
    };
}

export default UserApi;