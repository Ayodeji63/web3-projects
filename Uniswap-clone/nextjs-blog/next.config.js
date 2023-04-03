/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZkNDg5NTk1YmZkN2NhMjJBZDU5NUY0YWE1OUVEODk3MzE5NzA2YWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3ODI3OTM0ODEyMSwibmFtZSI6ImJsdWVBcHAifQ.wkuWW61Alhpdsu1Nm5TbYGjUeVE5LoxN3Y9grOprE2Q",
    },
    swcMinify: true,
    reactStrictMode: true,
}

module.exports = nextConfig
