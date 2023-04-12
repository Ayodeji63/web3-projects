/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZkNDg5NTk1YmZkN2NhMjJBZDU5NUY0YWE1OUVEODk3MzE5NzA2YWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MTI4NTgzMDMzMCwibmFtZSI6ImF1Y3Rpb24ifQ.cwRohR3s1Pq1FEEVz7fjTLFYGRED0FlXWfYAsYKIiLo",
    },
    swcMinify: true,
    reactStrictMode: true,
}

module.exports = nextConfig
