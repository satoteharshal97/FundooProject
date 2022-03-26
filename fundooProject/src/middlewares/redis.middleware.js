import { client } from '../config/redis';


export const cachingFunction = async (req, res, next) => {
    try {
        const value = await client.get('dataKey');
            if (value == null) next();
            else {
                const resultJSON = JSON.parse(value);
                return res.status(200).json(resultJSON);              
            };
    } catch (error) {
        console.log(error)
    }
}
