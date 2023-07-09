/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        NEXT_PUBLIC_HYPER_GRAPH_API:process.env.NEXT_PUBLIC_HYPER_GRAPH_API,
        HYPERGRAPH_CMS_TOKEN:process.env.HYPERGRAPH_CMS_TOKEN
    },
}

module.exports = nextConfig
