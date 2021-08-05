import { config as envconfig } from 'dotenv'

envconfig()

export const config = {
    auth: {
        token: process.env.TOKEN,
    },
    prefix: "+",
    owners: ["852588734104469535", "713831778636398712", "847117740951076874", "200391563346575361"]
}