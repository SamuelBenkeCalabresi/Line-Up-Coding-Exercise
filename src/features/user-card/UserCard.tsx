import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Avatar, Card, CardHeader, CardBody } from "grommet";
import styled from "styled-components";
import { NotFound, LoadingPage } from "../../components";
import { getUserById, UserResponse } from "./usersCardApi";
import { colors } from "../../constants";

const TextRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 10px;
`;

type UserIdParams = {
  userId: string;
};

const UserCard = () => {
  const { userId } = useParams<UserIdParams>();
  const [user, setUser] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [pageNonexistent, setPageNonexistent] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!userId) {
        setPageNonexistent(true);
      } else {
        const userResponse = await getUserById({ userId });
        if (!userResponse) {
          setPageNonexistent(true);
          setIsLoading(false);
        } else {
          const { data } = userResponse;
          setUser(data);
          setIsLoading(false);
        }
      }
    };
    fetch();
  }, [userId]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!user || pageNonexistent) {
    return <NotFound message="Sorry your page was not found!" />;
  }

  return (
    <Card align="center" margin="small" elevation="large" animation="fadeIn">
      <CardHeader fill background={colors.primary} pad="medium">
        <Avatar src={user.data.avatar} size="large" margin="small" />
        <Text textAlign="center" margin="small" size="xxx-large" weight="bold">
          {user.data.first_name + " " + user.data.last_name}
        </Text>
      </CardHeader>
      <CardBody fill pad="medium" margin="medium">
        <TextRow>
          <Text color={colors.primary3} weight="bold">
            Email
          </Text>
          <Text>{user.data.email}</Text>
        </TextRow>
        <TextRow>
          <Text color={colors.primary3} weight="bold">
            First name
          </Text>
          <Text>{user.data.first_name}</Text>
        </TextRow>
        <TextRow>
          <Text color={colors.primary3} weight="bold">
            Last name
          </Text>
          <Text>{user.data.last_name}</Text>
        </TextRow>
      </CardBody>
    </Card>
  );
};

export default UserCard;
