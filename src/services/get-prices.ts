import axios from 'axios';
import PricePairs from '../models/model.pricePairs';

const getPrices = async (fsyms: string, tsyms: string) => {
    try {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}`;
        const res = await axios({
            url,
            method: 'get'
        });

        let data: any = res.data;

        if (data) {
            // save data to mongo db
            await PricePairs.findOneAndReplace(
                { name: `${fsyms}${tsyms}` },
                {
                    name: `${fsyms}${tsyms}`,
                    data: JSON.stringify(data)
                },
                {
                    upsert: true
                }
            );
        } else {
            // no data from api get data from mongo db
            const doc: any = await PricePairs.findOne({ name: `${fsyms}${tsyms}` });
            data = JSON.parse(doc?.data);
        }
        return data;
    } catch (error) {
        const doc: any = await PricePairs.findOne({ name: `${fsyms}${tsyms}` });
        return JSON.parse(doc?.data);
    }
};

export default getPrices;
