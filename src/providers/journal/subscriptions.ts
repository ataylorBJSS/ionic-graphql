import gql from "graphql-tag";

export const onUpdateCandidate = gql`
  subscription onUpdateCandidate {
    onUpdateCandidate {
      id
      firstName
      LastName
      licenseNum
      pass
    }
  }
`;
