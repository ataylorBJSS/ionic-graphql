import gql from "graphql-tag";

export const Examiners = gql`
  query {
    listExaminers {
      examiners {
        firstName
        lastName
        slots {
          id
          time
          type
          candidate {
            id
            firstName
            lastName
            licenseNum
            pass
          }
        }
      }
    }
  }
`;
