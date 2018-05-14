import gql from "graphql-tag";

export const updateCandidate = gql`
  mutation updateCandidate($id: Int!, $pass: Boolean) {
    updateCandidate(input: { id: $id, pass: $pass }) {
      id
      pass
    }
  }
`;
