import gql from "graphql-tag";

export const ResultMutation = gql`
  mutation setResult($cId: Int!, $testResult: Boolean) {
    setResult(candidateId: $cId, result: $testResult) {
      id
      pass
    }
  }
`;
