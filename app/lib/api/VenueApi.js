import Api from "./Api";

class VenueApi extends Api {
    static venueAllRequest = async () => {
        return await this.post('venue');
    };

    static venueRequest = async (id) => {
        return await this.post(`venue/${id}`);
    };

    static itemCategorysRequest = async () => {
        return await this.post('item_category');
    };

    static venueSearchRequest = async (milesRange, userLat, userLng, itemCategoryId = null, priceRange = null) => {
        let data = {
            milesRange,
            userLat,
            userLng
        };

        if(itemCategoryId != 0) data.itemCategoryId = itemCategoryId;
        if(priceRange) data.priceRange = priceRange;

        return await this.post('venue/search', data);
    };
}

export default VenueApi;