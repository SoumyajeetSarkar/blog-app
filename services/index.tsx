import { request, gql } from "graphql-request";

const graphQlApi = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            postUrl
            title
            excerpt
            contentImage {
              url
            }
            categories {
              name
              url
            }
          }
        }
      }
    }
  `;

  const results = await request(graphQlApi, query);
  return results.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts(
      orderBy: createdAt_ASC
      last:3
    ) {
      title
      contentImage {
        url
      }
      createdAt
      postUrl
    } 
  }
  `;
  const results = await request(graphQlApi, query);

  return results.posts;
};

export const getRelatedPosts = async (categories: any, slug: any) => {
  const query = gql`
    query GetRelatedPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          postUrl_not: $slug
          AND: { categories_some: { url_in: $categories } }
        }
        last: 3
      ) {
        title
        contentImage {
          url
        }
        createdAt
        postUrl
      }
    }
  `;
  const results = await request(graphQlApi, query, { categories, slug });

  return results.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        url
      }
    }
  `;
  const result = await request(graphQlApi, query);
  return result.categories;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query getPostDetails($slug: String!) {
      post(where: { postUrl: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        postUrl
        title
        excerpt
        contentImage {
          url
        }
        categories {
          name
          url
        }
        content {
          raw
        }
      }
    }
  `;

  const results = await request(graphQlApi, query, { slug });
  return results.post;
};

export const submitComment = async (obj: any) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { postUrl: $slug } }) {
        name
        createdAt
        comment
        email
      }
    }
  `;

  const result = await request(graphQlApi, query, { slug });
  return result.comments;
};

export const getSearchedPosts = async (search: string) => {
  const query = gql`
    query getPostDetails($search: String!) {
      postsConnection(where: { title_contains: $search }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            postUrl
            title
            excerpt
            contentImage {
              url
            }
            categories {
              name
              url
            }
          }
        }
      }
    }
  `;

  const results = await request(graphQlApi, query, { search });
  return results.postsConnection.edges;
};
