/* Next.js API route support: https://nextjs.org/docs/api-routes/introduction
Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page.*/
import { GraphQLClient, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";

export default async function sendComments(req:Request, res:Response) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });
  //mutation: add new data or update existing data
  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { postUrl: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, req.body);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}
