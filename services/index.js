import { gql, request } from "graphql-request";

const hypergraphAPI = process.env.NEXT_PUBLIC_HYPER_GRAPH_API;

export const getPosts = async ()=>{
    const query = gql`
    query MyQuery() {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
              updatedAt
            }
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
    const result = await request(hypergraphAPI,query);
    return result.postsConnection.edges;
}

export const getPostDetails = async (slug)=>{
  const query = gql`
  query GetPostDetails($slug:String!) {
    post(where: {slug: $slug}){
          author {
            bio
            id
            name
            photo {
              url
            }
            updatedAt
          }
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
          content{
            raw
          }
        }
      }
`;
  const result = await request(hypergraphAPI,query,{slug});
  return result.post;
}

export const getCategories = async ()=>{
  const query = gql`
  query getAllCategories {
    categories {
      name
      slug
    }
  }
  
    `
    const result = await request(hypergraphAPI,query);
    return result.categories;

}

export const getRecentPosts = async ()=>{
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title,
        featuredImage{
          url
        },
        createdAt,
        slug
      }
    }
  `
  const result = await request(hypergraphAPI,query);
  return result.posts;
}

export const getRelatedPosts = async (categories,slug)=>{
  const query = gql`
      query GetRelatedPosts($slug: String!,$categories:[String!]){
        posts(
          where: {slug_not: $slug, AND: {categories_some: {name_in: $categories}}}
          last: 3
        ){
          title
          featuredImage{
            url
          }
          createdAt
          slug
        }
      }
    `
    const result = await request(hypergraphAPI,query,{slug,categories});
    return result.posts;
}

export const postComment = async (obj)=>{
    const result = await fetch('/api/comments',
      {
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(obj)
      }
    )

    return result.json();
}

export const getComments = async (slug)=>{
  const query = gql`
  query getComments($slug:String!) {
    comments(where:{post:{slug:$slug}}){
      name
      createdAt
      comment
    }
  }
    `
    const result = await request(hypergraphAPI,query,{slug});
    return result.comments;

}

export const getPostsWithCategory = async (slug)=>{
  const query = gql`
    query getPostsWithCategory($slug:String!){
      posts(where: {categories_some: {slug: $slug}}) {
        author {
                  bio
                  id
                  name
                  photo {
                    url
                  }
                  updatedAt
                }
                slug
                title
                excerpt
                featuredImage {
                  url
                }
                categories {
                  name
                  slug
                }
      }
    }
  `
  const result = await request(hypergraphAPI,query,{slug});
  return result.posts;
}

export const getFeaturedPosts = async ()=>{
  const query = gql`
  query GetFeaturedPosts(){
    posts(where:{featuredPost: true})
    {
        author{
          name
          photo{
            url
          }
        }
        featuredImage{
          url
        }
        title
        slug
        createdAt
    }
  }
  
  `
  const result = await request(hypergraphAPI,query);
  // console.log(result);
  return result.posts
}

export const getPostsOfSameCategory = async (categories,slug)=>{
  const query = gql`
  query GetPostsOfSameCategory($categories:[String!]){
    posts(where: {categories_some: {name_in: $categories}}){
        author{
          name
          photo{
            url
          }
        }
        title
        featuredImage{
          url
        }
        createdAt
        slug
    }
  }
  `
  const result = await request(hypergraphAPI,query,{categories});
  let relatedPosts = result.posts;
  let n = relatedPosts.length;
  var i = 0;
  var postInd = -1;
  let prev = -1;
  let next = -1;

  while (i < n && postInd == -1)
  {
    if (relatedPosts[i].slug === slug)
    {
      postInd = i;
    }
    ++i;
  }

  prev = postInd === 0 ? n - 1 : postInd - 1;
  next = (postInd + 1) % n;

  const obj = {};

  if (n > 2) {
    obj.next = relatedPosts[next];
    obj.prev = relatedPosts[prev];
  } else if (n === 2) {
    obj.next = relatedPosts[next];
  }

  return obj;
}