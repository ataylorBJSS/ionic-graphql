import gql from "graphql-tag";

export const updateCandidate = gql`
  mutation updateCandidate($cId: Int!, $testResult: Boolean) {
    updateCandidate(candidateId: $cId, result: $testResult) {
      id
      pass
    }
  }
`;
