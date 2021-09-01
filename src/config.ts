import { config as envconfig } from 'dotenv'

envconfig()

export const config = {
    auth: {
        token: process.env.TOKEN,
    },
    prefix: "+"
}