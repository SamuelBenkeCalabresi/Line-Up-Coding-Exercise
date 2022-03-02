import Lottie from "lottie-react";
import { Box, Text } from "grommet";
import notFoundAnimation from "../assets/animations/not-found.json";

interface NotFoundProps {
  /** Not found message to display */
  message: string;
}

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <Box>
      <Box margin="medium">
        <Lottie loop={true} autoPlay={true} animationData={notFoundAnimation} />
      </Box>
      <Text margin="medium" size="x-large" weight="bold" alignSelf="center">
        {message}
      </Text>
    </Box>
  );
};

export default NotFound;
