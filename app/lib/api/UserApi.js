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

    static thirdPartyAuth = async (email, facebook_id = null, first_name = null, last_name = null, google_id = null, ) => {
        let data = {
            email
        };

        if(first_name) data.first_name = first_name;
        if(last_name) data.last_name = last_name;
        if(google_id) data.google_id = google_id;
        if(facebook_id) data.facebook_id = facebook_id;

        return this.post(`/thirdPartyAuth`, data);
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

    static updateUser = async (first_name, last_name, email, password, newPassword, repeatedNewPassword ) => {
        return this.put(`user`, {
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