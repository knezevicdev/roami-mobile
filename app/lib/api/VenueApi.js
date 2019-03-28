import Api from "./Api";

class VenueApi extends Api {
    static venueAllRequest = async () => {
        return await this.get('/venue');
    };

    static venueRequest = async () => {
        return await this.get(`/venue/3`);
    }
}

export default VenueApi;