import styled from "styled-components";
import { MEDIA_QUERY_MD } from "../../constants";

const SectionWrapper = styled.section`
  padding: 40px 60px;
  width: 100%;
  ${MEDIA_QUERY_MD} {
    padding: 40px 30px;
  }
`;

export default SectionWrapper;
