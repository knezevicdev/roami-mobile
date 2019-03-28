import Api from "./Api";

class VenueApi extends Api {
    static venueAllRequest = async () => {
        return await this.get('/venue');
    };

    static venueRequest = async (id) => {
        return await this.get(`/venue/${id}`);
    }
}

export default VenueApi;