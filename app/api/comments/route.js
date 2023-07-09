import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
import { NextResponse } from "next/server";
const hypergraphAPI = process.env.NEXT_PUBLIC_HYPER_GRAPH_API;
const hyperGraphToken = process.env.HYPERGRAPH_CMS_TOKEN;
export async function POST(request){
    const data = await request.json();
    const {name,email,comment,slug} = data;
    const graphQLClient = new GraphQLClient(hypergraphAPI,{
        headers:{
            authorization:`${hyperGraphToken}`
        }
    })
    const query = gql`
    mutation CreateComment($name:String!,$email:String!,$comment:String!,$slug:String!){
        createComment(data:{name:$name,email:$email,comment:$comment, post: {connect: {slug: $slug}}}){ id }
    }
    
    `
    const result = await graphQLClient.request(query,{name,email,comment,slug});
    return NextResponse.json(result);
}
