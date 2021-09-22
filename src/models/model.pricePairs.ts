import { model, Schema } from 'mongoose';

export const pricePairsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

const PricePairs = model('PricePairs', pricePairsSchema);

export default PricePairs;
