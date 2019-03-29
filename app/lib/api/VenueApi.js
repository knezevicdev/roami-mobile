import Api from "./Api";

class VenueApi extends Api {
    static venueAllRequest = async () => {
        return await this.get('/venue');
    };

    static venueRequest = async (id) => {
        return await this.get(`/venue/${id}`);
    };

    static itemCategorysRequest = async (id) => {
        return await this.get('/item_category');
    };

    static venueSearchRequest = async (itemCategoryId, priceRange, milesRange) => {
        return await this.post('venue/search', {
            itemCategoryId, 
            priceRange, 
            milesRange
        });
    };
}

export default VenueApi;