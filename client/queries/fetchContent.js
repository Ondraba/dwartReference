import gql from 'graphql-tag';

export default gql`
{
    content{
        id
        title
        main
        header
        footer
        state
        url
        likes
    }
}
`;